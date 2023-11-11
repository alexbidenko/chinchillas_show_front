import { defineEventHandler, getRouterParams } from 'h3'
import colorToString from '~/assets/scripts/colorToString'

export default defineEventHandler(async (event) => {
  const response = await fetch(
    `${
      process.env.BASE_API || 'https://api.chinchillas-show.com/api/'
    }chinchilla/documents/${getRouterParams(event).chinchillaId}`
  )
  const data = await response.json()

  data.color_name = colorToString(data.color)
  data.color_name_short = colorToString(data.color, true)

  const createParentColor = (chinchilla) => {
    if (chinchilla.father) {
      chinchilla.father.color_name = colorToString(chinchilla.father.color)
      chinchilla.father.color_name_short = colorToString(
        chinchilla.father.color,
        true
      )
      createParentColor(chinchilla.father)
    }
    if (chinchilla.mother) {
      chinchilla.mother.color_name = colorToString(chinchilla.mother.color)
      chinchilla.mother.color_name_short = colorToString(
        chinchilla.mother.color,
        true
      )
      createParentColor(chinchilla.mother)
    }
  }
  createParentColor(data)

  return data
})
