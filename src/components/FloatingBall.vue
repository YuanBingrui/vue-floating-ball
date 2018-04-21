<template>
  <div
    class="floating-ball-box"
    @mousedown.prevent="mouseDown"
    @mouseup.prevent="mouseUp"
    @mouseenter.prevent="mouseEnter"
    @mouseleave.prevent="mouseLeave"
    @touchstart.prevent="touchStart"
    @touchmove.prevent="touchMove"
    @touchend.prevent="touchEnd">
    <div class="floating-ball-out"></div>
    <div class="floating-ball-in"></div>
    <div class="floating-ball-center"></div>
  </div>
</template>

<script>

export default {
  name: 'FloatingBall',
  data () {
    return {}
  },
  methods: {
    mouseDown (event) {
      this.$emit('mousedown', event)
    },
    mouseUp (event) {
      this.$emit('mouseup', event)
    },
    mouseEnter (event) {
      this.$emit('mouseenter', event)
    },
    mouseLeave (event) {
      this.$emit('mouseleave', event)
    },
    touchStart (event) {
      this.$emit('touchstart', event)
    },
    touchMove (event) {
      this.$emit('touchmove', event)
    },
    touchEnd (event) {
      this.$emit('touchend', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.floating-ball-box {
  position: absolute;
  width: 3.5rem;
  height: 3.5rem;
  z-index: 30000;
  $zoom-scale: scale(1.2, 1.2);
  @mixin ball-position {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .floating-ball-out {
    @include ball-position;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 128, 128, 0.1);
  }
  .floating-ball-in {
    @include ball-position;
    width: 85%;
    height: 85%;
    background-color: rgba(0, 128, 128, 0.2);
  }
  .floating-ball-center {
    @include ball-position;
    width: 70%;
    height: 70%;
    background-color: rgba(0, 128, 128, 0.3);
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
