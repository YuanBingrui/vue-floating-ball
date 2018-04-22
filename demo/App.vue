<template>
  <div id="app">
    <div class="top-box">
      toptoptotptotptototototp
    </div>
    <div class="floating-box">
      <floating-ball :theme-color="themeColor" :init-position="initPosition"></floating-ball>
    </div>
    <div class="bottom-box">
      bottom
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      themeColor: '#316745',
      initPosition: 'top right'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {}
.top-box {
  width: 100%;
  height: 200px;
  border: 1px #ccc solid;
  background-color: red;
}
.floating-box {
  margin: 1rem;
  width: 700px;
  height: 900px;
  border: 1px #ccc solid;
}
.bottom-box {
  width: 100%;
  height: 200px;
  border: 1px #ccc solid;
  background-color: green;
}
</style>
