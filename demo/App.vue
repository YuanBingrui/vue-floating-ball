<template>
  <div id="app">
    <img src="./logo.png">
    <h2>悬浮球(floating ball)功能键组（网页版）</h2>
    <floating-ball :theme-color="themeColor" :init-position="initPosition" :popover-events="popoverEvents"></floating-ball>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      themeColor: '#316745',
      initPosition: '55 50',
      popoverEvents: [
        {parentName: 'App', eventName: 'show-data-ionic', iconName: 'ion-ionic', showName: 'ionic'},
        {parentName: 'App', eventName: 'show-data-heart', iconName: 'ion-heart', showName: 'heart'},
        {parentName: 'App', eventName: 'show-data-happy', iconName: 'ion-happy-outline', showName: 'happy-outline'},
        {parentName: 'App', eventName: 'show-data-earth', iconName: 'ion-earth', showName: 'earth'},
        {parentName: 'App', eventName: 'show-data-earth', iconName: 'ion-earth', showName: 'earth'}]
    }
  },
  created () {
    this.$on('show-data-ionic', this.ShowDataIonic)
    this.$on('show-data-heart', this.ShowDataHeart)
    this.$on('show-data-happy', this.ShowDataHappy)
    this.$on('show-data-earth', this.ShowDataEarth)
  },
  methods: {
    ShowDataIonic () {
      alert('点击了ionic图标')
    },
    ShowDataHeart () {
      alert('点击了heart图标')
    },
    ShowDataHappy () {
      alert('点击了happy图标')
    },
    ShowDataEarth () {
      alert('点击了earth图标')
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
