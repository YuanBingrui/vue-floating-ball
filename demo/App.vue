<template>
  <div id="app">
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
        {parentName: 'App', eventName: 'show-data-ionic', iconName: 'ion-ionic', showName: 'ionic'},
        {parentName: 'App', eventName: 'show-data-heart', iconName: 'ion-heart', showName: 'heart'},
        {parentName: 'App', eventName: 'show-data-happy', iconName: 'ion-happy-outline', showName: 'happy-outline'},
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
      alert('ionic')
      console.log('ionic')
    },
    ShowDataHeart () {
      alert('heart')
      console.log('heart')
    },
    ShowDataHappy () {
      alert('happy')
      console.log('happy')
    },
    ShowDataEarth () {
      alert('earth')
      console.log('earth')
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
