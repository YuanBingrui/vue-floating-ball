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
import FloatBallEvent from '@/libs/floating-ball-event'

export default {
  name: 'FloatingBall',
  props: {
    themeColor: {
      type: String,
      default: '#adadad'
    },
    initPosition: {
      type: String,
      default: 'bottom right'
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      FloatBallEvent.init(this, this.themeColor, this.initPosition)
    })
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
  position: fixed;
  width: 4.5rem;
  height: 4.5rem;
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
    width: 80%;
    height: 80%;
    background-color: rgba(0, 128, 128, 0.1);
  }
  .floating-ball-in {
    @include ball-position;
    width: 65%;
    height: 65%;
    background-color: rgba(0, 128, 128, 0.2);
  }
  .floating-ball-center {
    @include ball-position;
    width: 50%;
    height: 50%;
    background-color: rgba(0, 128, 128, 0.3);
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
