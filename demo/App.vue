<template>
  <div id="app">
    <floating-ball :theme-color="themeColor" :init-position="initPosition"></floating-ball>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      themeColor: '#316745',
      initPosition: 'top left'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  margin: 1rem;
  width: 700px;
  height: 600px;
  border: 1px #ccc solid;
}
</style>
