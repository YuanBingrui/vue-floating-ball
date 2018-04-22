<template>
  <div id="app">
    <div class="floating-box">
      <floating-ball :theme-color="themeColor" :init-position="initPosition"></floating-ball>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      themeColor: '#316745',
      initPosition: '1 1'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {}
.floating-box {
  margin: 3rem;
  width: 800px;
  height: 900px;
  border: 1px #ccc solid;
}
</style>
