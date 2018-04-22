<template>
  <div class="floating-ball-popover"></div>
</template>

<script>
export default {
  name: 'FloatingBallPopover',
  data () {
    return {

    }
  },
  render: function (createElement) {
    return createElement(
      'h1',
      {
        style: {
          color: 'red',
          fontSize: '14px'
        }
      },
      '一则头条dd'
    )
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.floating-ball-popover {
  position: absolute;
  border-radius: 2rem;
  // transition: width 2s, height 2s;
}
</style>
