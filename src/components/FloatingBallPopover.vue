<template>
  <div class="floating-ball-popover">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FloatingBallPopover',
  data () {
    return {

    }
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
