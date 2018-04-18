<template>
  <div id="app">
    <floating-ball :theme-color="themeColor" :init-position="initPosition"></floating-ball>
  </div>
</template>

<script>
import FloatingBall from './components/FloatingBall'

export default {
  name: 'App',
  components: {
    'floating-ball': FloatingBall
  },
  data () {
    return {
      themeColor: '#316745',
      initPosition: 'bottom 100'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {}
</style>
