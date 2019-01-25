(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.animate = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* istanbul ignore file */
  var Animate = function (global) {
    /* istanbul ignore next */
    var time = Date.now || function () {
      return +new Date();
    };
    var desiredFrames = 60;
    var millisecondsPerSecond = 1000;

    var running = {};
    var counter = 1;

    return {
      /**
       * A requestAnimationFrame wrapper / polyfill.
       *
       * @param callback {Function} The callback to be invoked before the next repaint.
       * @param root {HTMLElement} The root element for the repaint
       */
      requestAnimationFrame: function () {
        // Check for request animation Frame support
        var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
        var isNative = !!requestFrame;

        if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
          isNative = false;
        }

        if (isNative) {
          return function (callback, root) {
            requestFrame(callback, root);
          };
        }

        var TARGET_FPS = 60;
        var requests = {};
        var requestCount = 0;
        var rafHandle = 1;
        var intervalHandle = null;
        var lastActive = +new Date();

        return function (callback) {
          var callbackHandle = rafHandle++;

          // Store callback
          requests[callbackHandle] = callback;
          requestCount++;

          // Create timeout at first request
          if (intervalHandle === null) {
            intervalHandle = setInterval(function () {
              var time = +new Date();
              var currentRequests = requests;

              // Reset data structure before executing callbacks
              requests = {};
              requestCount = 0;

              for (var key in currentRequests) {
                if (currentRequests.hasOwnProperty(key)) {
                  currentRequests[key](time);
                  lastActive = time;
                }
              }

              // Disable the timeout when nothing happens for a certain
              // period of time
              if (time - lastActive > 2500) {
                clearInterval(intervalHandle);
                intervalHandle = null;
              }
            }, 1000 / TARGET_FPS);
          }

          return callbackHandle;
        };
      }(),

      stop: function stop(id) {
        var cleared = running[id] != null;
        cleared && (running[id] = null);
        return cleared;
      },
      isRunning: function isRunning(id) {
        return running[id] != null;
      },
      start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
        var _this = this;

        var start = time();
        var lastFrame = start;
        var percent = 0;
        var dropCounter = 0;
        var id = counter++;

        if (!root) {
          root = document.body;
        }

        // Compacting running db automatically every few new animations
        if (id % 20 === 0) {
          var newRunning = {};
          for (var usedId in running) {
            newRunning[usedId] = true;
          }
          running = newRunning;
        }

        // This is the internal step method which is called every few milliseconds
        var step = function step(virtual) {
          // Normalize virtual value
          var render = virtual !== true;

          // Get current time
          var now = time();

          // Verification is executed before next animation step
          if (!running[id] || verifyCallback && !verifyCallback(id)) {
            running[id] = null;
            completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
            return;
          }

          // For the current rendering to apply let's update omitted steps in memory.
          // This is important to bring internal state variables up-to-date with progress in time.
          if (render) {
            var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
            for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
              step(true);
              dropCounter++;
            }
          }

          // Compute percent value
          if (duration) {
            percent = (now - start) / duration;
            if (percent > 1) {
              percent = 1;
            }
          }

          // Execute step callback, then...
          var value = easingMethod ? easingMethod(percent) : percent;
          value = isNaN(value) ? 0 : value;
          if ((stepCallback(value, now, render) === false || percent === 1) && render) {
            running[id] = null;
            completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
          } else if (render) {
            lastFrame = now;
            _this.requestAnimationFrame(step, root);
          }
        };

        // Mark as running
        running[id] = true;

        // Init first step
        this.requestAnimationFrame(step, root);

        // Return unique animation ID
        return id;
      }
    };
  }(window);

  var easeOutCubic = exports.easeOutCubic = function easeOutCubic(pos) {
    return Math.pow(pos - 1, 3) + 1;
  };

  var easeInOutCubic = exports.easeInOutCubic = function easeInOutCubic(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    }

    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  };

  exports.default = Animate;
});