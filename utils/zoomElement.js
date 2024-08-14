import Hammer from 'hammerjs'

const zoomElement = (elm, callback) => {
  const hammertime = new Hammer(elm, {})
  hammertime.get('pinch').set({
    enable: true,
  })
  let posX = 0
  let posY = 0
  let scale = 1
  let lastScale = 1
  let lastPosX = 0
  let lastPosY = 0
  let maxPosX = 0
  let maxPosY = 0
  let transform = ''
  const el = elm

  hammertime.on('doubletap pan pinch panend pinchend', (ev) => {
    if (ev.type === 'doubletap' && typeof window !== 'undefined') {
      transform = 'translate3d(0, 0, 0) scale3d(2, 2, 1) '
      scale = 2
      lastScale = 2
      try {
        if (
          window
            .getComputedStyle(el, null)
            .getPropertyValue('-webkit-transform')
            .toString() !== 'matrix(1, 0, 0, 1, 0, 0)'
        ) {
          transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) '
          scale = 1
          lastScale = 1
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}
      el.style.transform = transform
      transform = ''
    }

    // pan
    if (scale !== 1) {
      posX =
        lastPosX + ev.deltaX * Math.max(1100 / document.body.scrollWidth, 1)
      posY =
        lastPosY + ev.deltaY * Math.max(1100 / document.body.scrollWidth, 1)
      maxPosX = Math.ceil(((scale - 1) * el.clientWidth) / 2)
      maxPosY = Math.ceil(((scale - 1) * el.clientHeight) / 2)
      if (posX > maxPosX) {
        posX = maxPosX
      }
      if (posX < -maxPosX) {
        posX = -maxPosX
      }
      if (posY > maxPosY) {
        posY = maxPosY
      }
      if (posY < -maxPosY) {
        posY = -maxPosY
      }
    }

    // pinch
    if (ev.type === 'pinch') {
      scale = Math.max(0.999, Math.min(lastScale * ev.scale, 4))
    }
    if (ev.type === 'pinchend') {
      lastScale = scale
    }

    // panend
    if (ev.type === 'panend') {
      lastPosX = posX < maxPosX ? posX : maxPosX
      lastPosY = posY < maxPosY ? posY : maxPosY
    }

    if (scale !== 1) {
      transform =
        `translate3d(${posX}px,${posY}px, 0) ` +
        `scale3d(${scale}, ${scale}, 1)`
    }

    if (scale < 1.03) {
      scale = 1
      el.style.transform = ''
    } else if (transform) {
      el.style.transform = transform
    }
    if (callback) callback(scale)
  })
}

export default zoomElement
