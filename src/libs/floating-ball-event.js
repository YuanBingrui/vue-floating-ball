const FloatBallEvent = {}

FloatBallEvent.init = function (floatballContainObj, themeColor, positionValue) {
  let floatballContainObjParent = floatballContainObj.$el.parentNode
  let elData = floatballContainObj._data
  let floatingballParent = floatballContainObj.$el
  let floatballObj = floatballContainObj.$children[0]
  let floatingballBox = floatballObj.$el
  let popoverNode = floatballContainObj.$children[1].$el
  let offsetDistanceObj = offset(floatballContainObjParent)

  let viewContentW = (offsetDistanceObj.left + floatballContainObjParent.offsetWidth) <= window.screen.width ? floatballContainObjParent.offsetWidth : window.screen.width
  let viewContentH = (offsetDistanceObj.top + floatballContainObjParent.offsetHeight) <= window.screen.height ? floatballContainObjParent.offsetHeight : window.screen.height
  let range

  let fmtThemeColor = colorRgb(themeColor)

  floatingballBox.appendChild(nodeToFragment(floatingballBox, 'init', fmtThemeColor))

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
    range = {
      minX: offsetDistanceObj.left,
      maxX: (offsetDistanceObj.left + floatballContainObjParent.offsetWidth) <= window.screen.width ? (offsetDistanceObj.left + viewContentW - floatingballParent.offsetWidth) : (window.screen.width - floatingballParent.offsetWidth),
      minY: offsetDistanceObj.top,
      maxY: (offsetDistanceObj.top + floatballContainObjParent.offsetHeight) <= window.screen.height ? (offsetDistanceObj.top + viewContentH - floatingballParent.offsetHeight) : (window.screen.height - floatingballParent.offsetHeight - 97)
    }
    let positionArr = positionValue.split(' ')
    let defaultOffsetMinX = (range.minX + 7) + 'px'
    let defaultOffsetMaxX = (range.maxX - 7) + 'px'
    let defaultOffsetMinY = (range.minY + 7) + 'px'
    let defaultOffsetMaxY = (range.maxY - 7) + 'px'

    for (let i = 0; i < positionArr.length; i++) {
      switch (positionArr[i]) {
        case 'top':
          floatingballParent.style.top = defaultOffsetMinY
          break
        case 'bottom':
          floatingballParent.style.top = defaultOffsetMaxY
          break
        case 'left':
          floatingballParent.style.left = defaultOffsetMinX
          break
        case 'right':
          floatingballParent.style.left = defaultOffsetMaxX
          break
        default:
          handleNumber(i, positionArr[i])
      }
    }

    currentBallPopover()

    // function handleNumber (index, positionNum) {
    //   let halfBoxWidth = floatingballParent.offsetWidth / 2
    //   let halfBoxHeight = floatingballParent.offsetHeight / 2

    //   positionNum = Number(positionNum)
    //   if (index === 0) {
    //     if (positionNum > 0 && positionNum < 100) {
    //       floatingballParent.style.top = offsetDistanceObj.top + (positionNum / 100) * (range.maxY + floatingballParent.offsetHeight) - halfBoxHeight + 'px'
    //     } else if (positionNum <= 0) {
    //       floatingballParent.style.top = defaultOffsetMinY
    //     } else {
    //       floatingballParent.style.top = defaultOffsetMaxY
    //     }
    //   } else {
    //     if (positionNum > 0 && positionNum < 100) {
    //       floatingballParent.style.left = offsetDistanceObj.left + (positionNum / 100) * (range.maxX + floatingballParent.offsetWidth) - halfBoxWidth + 'px'
    //     } else if (positionNum <= 0) {
    //       floatingballParent.style.left = defaultOffsetMinX
    //     } else {
    //       floatingballParent.style.left = defaultOffsetMaxX
    //     }
    //   }
    // }
  }

  // ballPopover current position
  function currentBallPopover () {
    let popoverStatus = elData.isShow ? 10 : 0
    popoverNode.style.width = popoverStatus + 'rem'
    popoverNode.style.height = popoverStatus + 'rem'
    popoverNode.style.background = 'rgba(' + fmtThemeColor + ',' + 0.65 + ')'

    updateRange()

    let floatingballParentTop = Number(floatingballParent.style.top.replace(/px/, ''))
    let floatingballParentLeft = Number(floatingballParent.style.left.replace(/px/, ''))

    if (floatingballParentTop < range.minY + 100) {
      if (floatingballParentLeft > range.minX + 100 && floatingballParentLeft < range.maxX - 100) {
        popoverNode.style.top = 3.5 + 'rem'
        popoverNode.style.left = -3.25 + 'rem'
      } else if (floatingballParentLeft < range.minX + 100) {
        popoverNode.style.top = 2.5 + 'rem'
        popoverNode.style.left = 2.5 + 'rem'
      } else {
        popoverNode.style.top = 2.5 + 'rem'
        popoverNode.style.left = -9 + 'rem'
      }
    }
    if (floatingballParentTop > range.maxY - 100) {
      if (floatingballParentLeft > range.minX + 100 && floatingballParentLeft < range.maxX - 100) {
        popoverNode.style.top = -10 + 'rem'
        popoverNode.style.left = -3.25 + 'rem'
      } else if (floatingballParentLeft < range.minX + 100) {
        popoverNode.style.top = -9 + 'rem'
        popoverNode.style.left = 2.5 + 'rem'
      } else {
        popoverNode.style.top = -9 + 'rem'
        popoverNode.style.left = -9 + 'rem'
      }
    }
    if (floatingballParentTop > range.minY + 100 && floatingballParentTop < range.maxY - 100) {
      if (floatingballParentLeft < range.minX + 200) {
        popoverNode.style.top = -3.25 + 'rem'
        popoverNode.style.left = 3.5 + 'rem'
      } else if (floatingballParentLeft > range.maxX - 200) {
        popoverNode.style.top = -3.25 + 'rem'
        popoverNode.style.left = -10 + 'rem'
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

    updateRange()

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

  function updateRange () {
    range = {
      minX: offsetDistanceObj.left,
      maxX: (offsetDistanceObj.left + floatballContainObjParent.offsetWidth) <= window.screen.width ? (offsetDistanceObj.left + viewContentW - floatingballParent.offsetWidth) : (window.screen.width - floatingballParent.offsetWidth),
      minY: (offsetDistanceObj.top - document.documentElement.scrollTop) > 0 ? (offsetDistanceObj.top - document.documentElement.scrollTop) : 0,
      maxY: (offsetDistanceObj.top + floatballContainObjParent.offsetHeight) <= window.screen.height ? (offsetDistanceObj.top + viewContentH - floatingballParent.offsetHeight) : ((offsetDistanceObj.top + floatballContainObjParent.offsetHeight - window.screen.height) > document.documentElement.scrollTop ? (window.screen.height - floatingballParent.offsetHeight - 97) : (offsetDistanceObj.top + floatballContainObjParent.offsetHeight - document.documentElement.scrollTop - floatingballParent.offsetHeight))
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
    if (elData.isShow) {
      elData.isShow = false
    } else {
      elData.isShow = true
    }
    currentBallPopover()

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))

    let touch = event.touches[0]
    let presentPosition = getPresentPosition(touch, 'touch')

    floatingballParent.style.left = presentPosition.presentX + 'px'
    floatingballParent.style.top = presentPosition.presentY + 'px'
  }

  function onDocumentTouchMove (event) {
    event.preventDefault()
    if (elData.isShow) {
      elData.isShow = false
      popoverNode.style.width = 0
      popoverNode.style.height = 0
    }
    let touch = event.touches[0]
    let presentPosition = getPresentPosition(touch, 'touch')

    floatingballParent.style.left = presentPosition.presentX + 'px'
    floatingballParent.style.top = presentPosition.presentY + 'px'
  }

  function onDocumentTouchEnd (event) {
    event.preventDefault()

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
  }
}

export default FloatBallEvent
