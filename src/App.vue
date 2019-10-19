<template>
  <div id="app">
    <!--router-view/ -->
    <home/>
  </div>
</template>

<script>
import  home from '@/components/Home'
export default {
  name: "App",
  components: {
    home
  }
};
</script>

<style>
@import "../static/css/common.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
}
</style>
