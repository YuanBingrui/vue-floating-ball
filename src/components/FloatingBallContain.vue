<template>
  <div class="floating-ball-contain">
    <floating-ball></floating-ball>
    <floating-ball-popover>sss</floating-ball-popover>
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
    }
  },
  data () {
    return {

    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      FloatBallEvent.init(this, this.themeColor, this.initPosition)
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.floating-ball-contain {
  position: fixed;
  width: 3.5rem;
  height: 3.5rem;
}
</style>
