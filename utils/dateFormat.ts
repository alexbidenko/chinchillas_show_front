const dateFormat = (date: string | Date, format?: 'yyyy.MM.dd' | 'yyyy.MM.dd hh:mm'): string => {
  const d = new Date(date)

  switch (format) {
    case 'yyyy.MM.dd':
      return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear().toString().padStart(2, '0')}`
    case 'yyyy.MM.dd hh:mm':
      return `${dateFormat(date, 'yyyy.MM.dd')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    default:
      return date.toString()
  }
}

export default dateFormat
