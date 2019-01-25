(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'vue', './tip'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('vue'), require('./tip'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.tip);
    global.index = mod.exports;
  }
})(this, function (exports, _vue, _tip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vue2 = _interopRequireDefault(_vue);

  var _tip2 = _interopRequireDefault(_tip);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Tip = _vue2.default.extend(_tip2.default);

  exports.default = {
    name: 'md-tip',

    props: {
      placement: {
        type: String,
        default: 'top'
      },
      content: {
        type: [String, Number],
        default: ''
      }
    },

    mounted: function mounted() {
      this.wrapperEl = this.$_getFirstScrollWrapper(this.$el);
    },
    beforeDestroy: function beforeDestroy() {
      if (this.$_tipVM) {
        var el = this.$_tipVM.$el;
        var parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
        this.$_tipVM.$destroy();
      }
    },


    /**
     * Only render the first node of slots
     * and add tip tirgger handler on it
     */
    render: function render() {
      // eslint-disable-line no-unused-vars
      if (!this.$slots.default || !this.$slots.default.length) {
        return this.$slots.default;
      }

      var firstNode = this.$slots.default[0];

      var on = firstNode.data.on = firstNode.data.on || {};
      var nativeOn = firstNode.data.nativeOn = firstNode.data.nativeOn || {};

      on.click = this.$_addEventHandle(on.click, this.show);
      nativeOn.click = this.$_addEventHandle(nativeOn.click, this.show);

      return firstNode;
    },


    methods: {
      /**
       * Add extra tip trigger handler
       * without overwriting the old ones
       */
      $_addEventHandle: function $_addEventHandle(old, fn) {
        if (!old) {
          return fn;
        } else if (Array.isArray(old)) {
          return old.indexOf(fn) > -1 ? old : old.concat(fn);
        } else {
          return old === fn ? old : [old, fn];
        }
      },


      /**
       * Get the first scrollable parent,
       * so we can append the tip element to
       * the right parent container
       */
      $_getFirstScrollWrapper: function $_getFirstScrollWrapper(node) {
        if (node === null || node === document.body) {
          return node;
        }

        var overflowY = window.getComputedStyle(node).overflowY;
        var isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

        if (isScrollable && node.scrollHeight > node.clientHeight) {
          return node;
        } else {
          return this.$_getFirstScrollWrapper(node.parentNode);
        }
      },


      /**
       * Get the relative position of an element
       * inside a wrapper
       */
      $_getPosition: function $_getPosition(node, wrapper) {
        var x = 0;
        var y = 0;
        var el = node;

        while (el) {
          x += el.offsetLeft;
          y += el.offsetTop;

          if (el === wrapper || el === document.body || el === null) {
            break;
          }

          el = el.offsetParent;
        }

        return { x: x, y: y };
      },


      /**
       * Lazy create tip element
       */
      $_getOrNewTip: function $_getOrNewTip() {
        if (this.$_tipVM) {
          return this.$_tipVM;
        }

        var tipVM = this.$_tipVM = new Tip({
          propsData: {
            placement: this.placement,
            content: this.content
          }
        }).$mount();

        tipVM.$on('close', this.hide);

        return tipVM;
      },


      /**
       * Calculate the position of tip,
       * and relayout it's position
       */
      layout: function layout() {
        if (!this.$_tipVM) {
          return;
        }

        var tipElRect = this.$_tipVM.$el.getBoundingClientRect();
        var referenceElRect = this.$el.getBoundingClientRect();
        var delta = this.$_getPosition(this.$el, this.wrapperEl);

        switch (this.placement) {
          case 'left':
            delta.y += (referenceElRect.height - tipElRect.height) / 2;
            delta.x -= tipElRect.width + 10;
            break;

          case 'right':
            delta.y += (referenceElRect.height - tipElRect.height) / 2;
            delta.x += referenceElRect.width + 10;
            break;

          case 'bottom':
            delta.y += referenceElRect.height + 10;
            delta.x += (referenceElRect.width - tipElRect.width) / 2;
            break;

          default:
            delta.y -= tipElRect.height + 10;
            delta.x += (referenceElRect.width - tipElRect.width) / 2;
            break;
        }

        this.$_tipVM.$el.style.cssText = 'position: absolute; top: ' + delta.y + 'px; left: ' + delta.x + 'px;';
      },


      /**
       * Do the magic, show me your tip
       */
      show: function show() {
        var tipVM = this.$_getOrNewTip();

        if (tipVM.$el.parentNode !== this.wrapperEl) {
          this.wrapperEl.appendChild(tipVM.$el);
        }

        this.layout();
        this.$emit('show');
      },


      /**
       * Hide tip
       */
      hide: function hide() {
        if (this.$_tipVM && this.$_tipVM.$el.parentNode !== null) {
          this.$_tipVM.$el.parentNode.removeChild(this.$_tipVM.$el);
          this.$emit('hide');
        }
      }
    }
  };
});