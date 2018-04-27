<template>
  <div id="app">
    <div class="floating-box">
      <floating-ball :theme-color="themeColor" :init-position="initPosition" :popover-events="popoverEvents"></floating-ball>
    </div>
    <div class="floating-box">
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
      initPosition: 'top left',
      popoverEvents: [
        {parentName: 'App', eventName: 'show-data-ionic', iconName: 'fal fa-camera-retro', showName: 'ionic'},
        {parentName: 'App', eventName: 'show-data-heart', iconName: 'fal fa-camera-retro', showName: 'heart'},
        {parentName: 'App', eventName: 'show-data-happy', iconName: 'fal fa-camera-retro', showName: 'happy-outline'},
        {parentName: 'App', eventName: 'show-data-earth', iconName: 'fal fa-camera-retro', showName: 'earth'}]
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
}
.floating-box {
  margin: 1%;
  width: 48%;
  height: 1000px;
  border: 1px #ccc solid;
}
</style>
