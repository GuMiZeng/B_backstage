<template>
  <div id="app" class="app-main">
    <router-view/>
  </div>

</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./assets/scss/iview.scss";
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: auto;
}
.app-main {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
