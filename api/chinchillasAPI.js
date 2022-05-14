const express = require('express')
const colorToString = require('../assets/scripts/colorToString').default

const app = express()
app.use(express.json())

app.get('/chinchillas/:chinchillaId', async (req, res) => {
  const response = await fetch(
    `${
      process.env.BASE_API || 'https://api.chinchillas-show.com/api/'
    }chinchilla/documents/${req.params.chinchillaId}`
  )
  const data = await response.json()

  data.color_name = colorToString(data.color)
  data.color_name_short = colorToString(data.color, true)

  const createParentColor = (chinchilla) => {
    if (chinchilla.father) {
      chinchilla.father.color_name = colorToString(chinchilla.mother.color)
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

  await res.json(data)
})

module.exports = app
