const FloatBallEvent = {}

FloatBallEvent.init = function (floatballObj, themeColor, positionValue) {
  let floatingballBox = floatballObj.$el
  floatingballBox.appendChild(nodeToFragment(floatingballBox, 'init', colorRgb(themeColor)))
  initPosition(positionValue)
  floatballObj.$on('mousedown', onDocumentMouseDown, false)
  floatballObj.$on('mouseenter', onDocumentMouseEnter, false)
  floatballObj.$on('mouseleave', onDocumentMouseLeave, false)
  floatballObj.$on('touchstart', onDocumentTouchStart, false)
  floatballObj.$on('touchmove', onDocumentTouchMove, false)
  floatballObj.$on('touchend', onDocumentTouchEnd, false)

  // 创建虚拟DOM
  function nodeToFragment (node, eventType, themeColor) {
    let scaleValue = eventType === 'down' ? 'scale(1.2, 1.2)' : 'scale(1, 1)'
    let opacity = eventType === 'down' ? 0.3 : 0.1
    let flag = document.createDocumentFragment()
    let child = node.firstChild

    while (child) {
      addStyle(child)
      flag.appendChild(child)
      child = node.firstChild
    }

    function addStyle (node) {
      // 判断节点类型
      if (node.nodeType === 1) {
        opacity += 0.1
        node.style.transform = scaleValue
        node.style.background = 'rgba(' + themeColor + ',' + opacity + ')'
      }
    }
    return flag
  }

  // 初始化位置
  function initPosition (positionValue) {
    let positionArr = positionValue.split(' ')
    for (let i = 0; i < positionArr.length; i++) {
      switch (positionArr[i]) {
        case 'top':
          floatingballBox.style.top = 10 + 'px'
          break
        case 'bottom':
          floatingballBox.style.bottom = 10 + 'px'
          break
        case 'left':
          floatingballBox.style.left = 10 + 'px'
          break
        case 'right':
          floatingballBox.style.right = 10 + 'px'
          break
        default:
          handleNumber(i, positionArr[i])
      }
    }

    function handleNumber (index, positionNum) {
      let halfBoxWidth = floatingballBox.offsetWidth / 2
      let halfBoxHeight = floatingballBox.offsetHeight / 2
      let windowX = (halfBoxWidth * 100) / window.screen.width
      let windowY = (halfBoxHeight * 100) / window.screen.height
      if (index === 0) {
        let tempPositionH
        if (positionNum <= 50) {
          tempPositionH = positionNum - windowY
          floatingballBox.style.top = tempPositionH >= 0 ? tempPositionH + '%' : 10 + 'px'
        } else {
          tempPositionH = 100 - positionNum + windowY
          floatingballBox.style.bottom = tempPositionH >= 0 ? tempPositionH + '%' : 10 + 'px'
        }
      } else {
        let tempPositionW
        if (positionNum <= 50) {
          tempPositionW = positionNum - windowX
          floatingballBox.style.left = tempPositionW >= 0 ? tempPositionW + '%' : 10 + 'px'
        } else {
          tempPositionW = 100 - positionNum + windowX
          floatingballBox.style.right = tempPositionW >= 0 ? tempPositionW + '%' : 10 + 'px'
        }
      }
    }
  }

  // 颜色转换
  function colorRgb (presentColor) {
    // rgb
    let rgbReg = /rgb\((.+)\)/
    // 十六进制
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    let sColor = presentColor.toLowerCase()
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#'
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      // 处理六位的颜色值
      let sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return sColorChange.join(',')
    } else if (rgbReg.test(sColor)) {
      return RegExp.$1
    }
  }

  // 更新坐标
  function getPresentPosition (event, eventType) {
    let presentX = event.clientX - floatingballBox.offsetWidth / 2
    let presentY = event.clientY - floatingballBox.offsetHeight / 2

    let range = {
      minX: 0,
      maxX: window.screen.width - floatingballBox.offsetWidth,
      minY: 0,
      maxY: eventType === 'mouse' ? window.screen.height - floatingballBox.offsetHeight - 90 : window.screen.height - floatingballBox.offsetHeight
    }

    if (event.clientX <= range.minX) {
      presentX = range.minX
    }
    if (event.clientX >= range.maxX) {
      presentX = range.maxX
    }
    if (event.clientY <= range.minY) {
      presentY = range.minY
    }
    if (event.clientY >= range.maxY) {
      presentY = range.maxY
    }

    return {
      presentX: presentX,
      presentY: presentY
    }
  }

  // PC端
  function onDocumentMouseDown (event) {
    event.preventDefault()

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', colorRgb(themeColor)))

    document.addEventListener('mousemove', onDocumentMouseMove, false)
    floatballObj.$on('mouseup', onDocumentMouseUp, false)
  }

  function onDocumentMouseMove (event) {
    event.preventDefault()
    let presentPosition = getPresentPosition(event, 'mouse')

    floatingballBox.style.left = presentPosition.presentX + 'px'
    floatingballBox.style.top = presentPosition.presentY + 'px'
  }

  function onDocumentMouseEnter (event) {
    event.preventDefault()
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', colorRgb(themeColor)))
  }

  function onDocumentMouseLeave (event) {
    event.preventDefault()
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', colorRgb(themeColor)))
  }

  function onDocumentMouseUp (event) {
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', colorRgb(themeColor)))
    document.removeEventListener('mousemove', onDocumentMouseMove)
    floatballObj.$off('mouseup', onDocumentMouseUp)
  }

  // 移动端
  function onDocumentTouchStart (event) {
    event.preventDefault()

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', colorRgb(themeColor)))

    let touch = event.touches[0]
    let presentPosition = getPresentPosition(touch, 'touch')

    floatingballBox.style.left = presentPosition.presentX + 'px'
    floatingballBox.style.top = presentPosition.presentY + 'px'
  }

  function onDocumentTouchMove (event) {
    event.preventDefault()

    let touch = event.touches[0]
    let presentPosition = getPresentPosition(touch, 'touch')

    floatingballBox.style.left = presentPosition.presentX + 'px'
    floatingballBox.style.top = presentPosition.presentY + 'px'
  }

  function onDocumentTouchEnd (event) {
    event.preventDefault()

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', colorRgb(themeColor)))
  }
}

export default FloatBallEvent
