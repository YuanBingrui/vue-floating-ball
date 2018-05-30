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
        {parentName: 'App', eventName: 'show-data-add', iconName: 'ion ion-ios-add', showName: 'add'},
        {parentName: 'App', eventName: 'show-data-heart', iconName: 'icon ion-ios-heart', showName: 'heart'},
        {parentName: 'App', eventName: 'show-data-airplane', iconName: 'ion ion-ios-airplane', showName: 'airplane'},
        {parentName: 'App', eventName: 'show-data-football', iconName: 'ion ion-ios-american-football', showName: 'football'},
        {parentName: 'App', eventName: 'show-data-appstore', iconName: 'ion ion-ios-appstore', showName: 'appstore'}]
    }
  },
  created () {
    this.$on('show-data-add', this.ShowDataAdd)
    this.$on('show-data-heart', this.ShowDataHeart)
    this.$on('show-data-airplane', this.ShowDataAirplane)
    this.$on('show-data-football', this.ShowDataFootball)
    this.$on('show-data-appstore', this.ShowDataAppstore)
  },
  methods: {
    ShowDataAdd () {
      alert('点击了Add图标')
    },
    ShowDataHeart () {
      alert('点击了heart图标')
    },
    ShowDataAirplane () {
      alert('点击了Airplane图标')
    },
    ShowDataFootball () {
      alert('点击了Football图标')
    },
    ShowDataAppstore () {
      alert('点击了Appstore图标')
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
