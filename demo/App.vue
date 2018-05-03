<template>
  <div id="app">
    <div class="floating-box-left">
      <floating-ball></floating-ball>
    </div>
    <div class="floating-box-right">
      <floating-ball :theme-color="themeColor" :init-position="initPosition" :popover-events="popoverEvents"></floating-ball>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      themeColor: '#316745',
      initPosition: 'bottom left',
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
  display: flex;
  width: 100%;
  height: 900px;
}
.floating-box-left {
  margin: 1%;
  width: 38%;
  height: 100%;
  border: 1px #ccc solid;
}
.floating-box-right {
  margin: 1%;
  width: 58%;
  height: 100%;
  border: 1px #ccc solid;
}
</style>
