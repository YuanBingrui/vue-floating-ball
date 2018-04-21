const FloatBallEvent = {}

FloatBallEvent.init = function (floatballContainObj, themeColor, positionValue) {
  let floatballContainObjParent = floatballContainObj.$parent.$el
  let elData = floatballContainObj._data
  let floatingballParent = floatballContainObj.$el
  let floatballObj = floatballContainObj.$children[0]
  let floatingballBox = floatballObj.$el
  let popoverNode = floatballContainObj.$children[1].$el
  let viewContentW = floatballContainObjParent.offsetWidth <= window.screen.width ? floatballContainObjParent.offsetWidth : window.screen.width
  let viewContentH = floatballContainObjParent.offsetHeight <= window.screen.height ? floatballContainObjParent.offsetHeight : window.screen.height
  let popoverPosX
  let popoverPosY

  let fmtThemeColor = colorRgb(themeColor)

  floatingballBox.appendChild(nodeToFragment(floatingballBox, 'init', fmtThemeColor))

  let offsetDistanceObj = offset(floatballContainObjParent)

  initBallPosition(positionValue)

  floatballObj.$on('mousedown', onDocumentMouseDown, false)
  floatballObj.$on('mouseenter', onDocumentMouseEnter, false)
  floatballObj.$on('mouseleave', onDocumentMouseLeave, false)
  floatballObj.$on('touchstart', onDocumentTouchStart, false)
  floatballObj.$on('touchmove', onDocumentTouchMove, false)
  floatballObj.$on('touchend', onDocumentTouchEnd, false)

  // 创建DocumentFragment
  function nodeToFragment (node, eventType, fmtThemeColor) {
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
        node.style.background = 'rgba(' + fmtThemeColor + ',' + opacity + ')'
      }
    }
    return flag
  }

  // 初始化位置
  function initBallPosition (positionValue) {
    let positionArr = positionValue.split(' ')
    let defaultOffsetX = (offsetDistanceObj.left + 7) + 'px'
    let defaultOffsetY = (offsetDistanceObj.top + 7) + 'px'

    for (let i = 0; i < positionArr.length; i++) {
      switch (positionArr[i]) {
        case 'top':
          floatingballParent.style.top = defaultOffsetY
          break
        case 'bottom':
          floatingballParent.style.bottom = defaultOffsetY
          break
        case 'left':
          floatingballParent.style.left = defaultOffsetX
          break
        case 'right':
          floatingballParent.style.right = defaultOffsetX
          break
        default:
          handleNumber(i, positionArr[i])
      }
    }

    initBallPopover()

    function handleNumber (index, positionNum) {
      let halfBoxWidth = floatingballParent.offsetWidth / 2
      let halfBoxHeight = floatingballParent.offsetHeight / 2

      if (index === 0) {
        let tempPositionH
        if (positionNum <= 50) {
          tempPositionH = (positionNum / 100) * viewContentH - halfBoxHeight
          floatingballParent.style.top = tempPositionH >= 0 ? tempPositionH + '%' : defaultOffsetY
        } else {
          tempPositionH = (1 - positionNum / 100) * viewContentH + halfBoxHeight
          floatingballParent.style.bottom = tempPositionH >= 0 ? tempPositionH + '%' : defaultOffsetY
        }
      } else {
        let tempPositionW
        if (positionNum <= 50) {
          tempPositionW = (positionNum / 100) * viewContentW - halfBoxWidth
          floatingballParent.style.left = tempPositionW >= 0 ? tempPositionW + '%' : defaultOffsetX
        } else {
          tempPositionW = (1 - positionNum / 100) + halfBoxWidth
          floatingballParent.style.right = tempPositionW >= 0 ? tempPositionW + '%' : defaultOffsetX
        }
      }
    }
  }

  // ballPopover init position
  function initBallPopover () {
    let popoverStatus = elData.isShow ? 10 : 0
    popoverNode.style.width = popoverStatus + 'rem'
    popoverNode.style.height = popoverStatus + 'rem'
    popoverNode.style.background = 'rgba(' + fmtThemeColor + ',' + 0.65 + ')'

    if (floatingballParent.style.top) {
      popoverPosY = 'top'
    }
    if (floatingballParent.style.bottom) {
      popoverPosY = 'bottom'
    }
    if (floatingballParent.style.left) {
      popoverPosX = 'left'
    }
    if (floatingballParent.style.right) {
      popoverPosX = 'right'
    }
  }

  // ballPopover current position
  function currentBallPopover () {
    let popoverStatus = elData.isShow ? 10 : 0
    popoverNode.style.width = popoverStatus + 'rem'
    popoverNode.style.height = popoverStatus + 'rem'
    let positionValue = 2.5 + 'rem'

    if (popoverPosY === 'top') {
      if (Number(floatingballParent.style.top) >= 150 || Number(viewContentH - floatingballParent.style.top) <= 150) {
        popoverNode.style.top = 3.5 + 'rem'
      } else {
        popoverNode.style.top = positionValue
      }
    } else {
      if (Number(floatingballParent.style.bottom) >= 150 || Number(viewContentH - floatingballParent.style.bottom) <= 150) {
        popoverNode.style.bottom = -3.5 + 'rem'
      } else {
        popoverNode.style.bottom = positionValue
      }
    }
    if (popoverPosX === 'left') {
      if (Number(floatingballParent.style.left) >= 150 || Number(viewContentW - floatingballParent.style.left) <= 150) {
        popoverNode.style.left = -3.25 + 'rem'
      } else {
        popoverNode.style.left = positionValue
      }
    } else {
      if (Number(floatingballParent.style.right) >= 150 || Number(viewContentW - floatingballParent.style.right) <= 150) {
        popoverNode.style.left = -3.25 + 'rem'
      } else {
        popoverNode.style.right = positionValue
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
    let presentX = event.clientX - floatingballParent.offsetWidth / 2
    let presentY = event.clientY - floatingballParent.offsetHeight / 2

    let range = {
      minX: offsetDistanceObj.left,
      maxX: offsetDistanceObj.left + viewContentW - floatingballParent.offsetWidth,
      minY: offsetDistanceObj.top,
      maxY: offsetDistanceObj.top + viewContentH - floatingballParent.offsetHeight
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

  // 获取实际的offset
  function offset (curEle) {
    let totalLeft = null
    let totalTop = null
    let par = curEle.offsetParent

    // 首先加自己本身的左偏移和上偏移
    totalLeft += curEle.offsetLeft
    totalTop += curEle.offsetTop

    // 只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while (par) {
      if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
        // 累加父级参照物的边框
        totalLeft += par.clientLeft
        totalTop += par.clientTop
      }

      // 累加父级参照物本身的偏移
      totalLeft += par.offsetLeft
      totalTop += par.offsetTop
      par = par.offsetParent
    }

    return {
      left: totalLeft,
      top: totalTop
    }
  }

  // PC端
  function onDocumentMouseDown (event) {
    event.preventDefault()
    if (elData.isShow) {
      elData.isShow = false
    } else {
      elData.isShow = true
    }
    currentBallPopover()

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))

    document.addEventListener('mousemove', onDocumentMouseMove, false)
    floatballObj.$on('mouseup', onDocumentMouseUp, false)
  }

  function onDocumentMouseMove (event) {
    event.preventDefault()
    if (elData.isShow) {
      elData.isShow = false
      popoverNode.style.width = 0
      popoverNode.style.height = 0
    }

    let presentPosition = getPresentPosition(event, 'mouse')

    floatingballParent.style.left = presentPosition.presentX + 'px'
    floatingballParent.style.top = presentPosition.presentY + 'px'
  }

  function onDocumentMouseEnter (event) {
    event.preventDefault()
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))
  }

  function onDocumentMouseLeave (event) {
    event.preventDefault()
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
  }

  function onDocumentMouseUp (event) {
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
    document.removeEventListener('mousemove', onDocumentMouseMove)
    floatballObj.$off('mouseup', onDocumentMouseUp)
  }

  // 移动端
  function onDocumentTouchStart (event) {
    event.preventDefault()

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))

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

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
  }
}

export default FloatBallEvent
