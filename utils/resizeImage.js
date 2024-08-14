export const dataURLtoFile = (dataUrl, filename, type) =>
  new Promise((resolve, reject) => {
    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => resolve(new File([blob], filename, { type })))
      .catch((e) => reject(e))
  })

export default (file) =>
  new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')

      const MAX_WIDTH = 2048
      const MAX_HEIGHT = 2048
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const dataURL = canvas.toDataURL(file.type)
      dataURLtoFile(dataURL, file.name, file.type).then(resolve).catch(reject)
    }
  })
