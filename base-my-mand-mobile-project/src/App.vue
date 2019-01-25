<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 10px;
  background-color: #F9FAFB;
 
  /* 斜纹背景 */
  -webkit-background-size: 50px 50px;
  -moz-background-size: 50px 50px;
  background-size: 50px 50px; /* 控制条纹的大小 */
  
  -moz-box-shadow: 1px 1px 8px #F9FAFB;
  -webkit-box-shadow: 1px 1px 8px #F9FAFB;
  box-shadow: 1px 1px 8px #F9FAFB;

  background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #F2F2F2), color-stop(.25, transparent), to(transparent)),
                    -webkit-gradient(linear, 0 100%, 100% 0, color-stop(.25, #F2F2F2), color-stop(.25, transparent), to(transparent)),
                    -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.75, transparent), color-stop(.75, #F2F2F2)),
                    -webkit-gradient(linear, 0 100%, 100% 0, color-stop(.75, transparent), color-stop(.75, #F2F2F2));
  background-image: -moz-linear-gradient(45deg, #F2F2F2 25%, transparent 25%, transparent),
                    -moz-linear-gradient(-45deg, #F2F2F2 25%, transparent 25%, transparent),
                    -moz-linear-gradient(45deg, transparent 75%, #F2F2F2 75%),
                    -moz-linear-gradient(-45deg, transparent 75%, #F2F2F2 75%);
  background-image: -o-linear-gradient(45deg, #F2F2F2 25%, transparent 25%, transparent),
                    -o-linear-gradient(-45deg, #F2F2F2 25%, transparent 25%, transparent),
                    -o-linear-gradient(45deg, transparent 75%, #F2F2F2 75%),
                    -o-linear-gradient(-45deg, transparent 75%, #F2F2F2 75%);
  background-image: linear-gradient(45deg, #F2F2F2 25%, transparent 25%, transparent),
                    linear-gradient(-45deg, #F2F2F2 25%, transparent 25%, transparent),
                    linear-gradient(45deg, transparent 75%, #F2F2F2 75%),
                    linear-gradient(-45deg, transparent 75%, #F2F2F2 75%);

}
</style>
