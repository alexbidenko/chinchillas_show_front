import pad from './pad.js'

const dateFormat = (date, format) => {
  const d = new Date(date)
  switch (format) {
    case 'yyyy.MM.dd':
      return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${pad(
        d.getFullYear()
      )}`
    case 'yyyy.MM.dd hh:mm':
      return `${dateFormat(date, 'yyyy.MM.dd')} ${pad(d.getHours())}:${pad(
        d.getMinutes()
      )}`
    default:
      return date.toString()
  }
}

export default dateFormat
