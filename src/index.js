import FloatingBallContain from './components/FloatingBallContain'

const VueFloatingBall = {
  'floating-ball': FloatingBallContain
}

const install = function (Vue) {
  Object.keys(VueFloatingBall).forEach((key) => {
    Vue.component(key, VueFloatingBall[key])
  })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(VueFloatingBall, {install})
