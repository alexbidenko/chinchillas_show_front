import moment from 'moment'
import wordFormat from './wordFormat'

export default (dateStart, dateEnd = new Date(), size = 'md') => {
  moment.locale('ru')
  const start = dateStart instanceof Date ? dateStart : new Date(dateStart)

  const difference = moment.duration(moment(dateEnd).diff(moment(start)))

  const years = Math.floor(difference.asYears())
  const months = Math.floor(difference.add(-years, 'years').asMonths())
  const days = Math.floor(difference.add(-months, 'months').asDays())
  const result = []
  if (years)
    result.push(
      `${years} ${
        size === 'md'
          ? wordFormat(years, ['год', 'года', 'лет'])
          : years >= 5
          ? 'л.'
          : 'г.'
      }`
    )
  if (months)
    result.push(
      `${months} ${
        size === 'md'
          ? wordFormat(months, ['месяц', 'месяца', 'месяцев'])
          : 'м.'
      }`
    )
  if (days)
    result.push(
      `${days} ${
        size === 'md' ? wordFormat(days, ['день', 'дня', 'дней']) : 'д.'
      }`
    )
  return result.join(' ')
}
