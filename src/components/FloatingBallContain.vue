<template>
  <div class="floating-ball-contain">
    <floating-ball></floating-ball>
    <floating-ball-popover :popover-events="popoverEvents"></floating-ball-popover>
  </div>
</template>

<script>
import FloatBallEvent from '@/libs/floating-ball-event'
import FloatingBall from './FloatingBall'
import FloatingBallPopover from './FloatingBallPopover'

export default {
  name: 'FloatingBallContain',
  components: {
    'floating-ball-popover': FloatingBallPopover,
    'floating-ball': FloatingBall
  },
  props: {
    themeColor: {
      type: String,
      default: '#adadad'
    },
    initPosition: {
      type: String,
      default: 'bottom right'
    },
    popoverEvents: {
      type: Array,
      validator (val) {
        return val instanceof Array
      }
    }
  },
  data () {
    return {
      isShow: false,
      popoverEventsNum: null
    }
  },
  watch: {
    popoverEvents: function () {
      this.popoverEventsNum = this.popoverEvents.length
    }
  },
  created () {
    this.popoverEventsNum = this.popoverEvents.length
  },
  mounted () {
    this.$nextTick(() => {
      FloatBallEvent.init(this, this.themeColor, this.initPosition)
    })
  }
}
</script>

<style lang="scss" scoped>
.floating-ball-contain {
  position: fixed;
  width: 3.5rem;
  height: 3.5rem;
}
</style>
