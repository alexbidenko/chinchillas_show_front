const colorToString = (color, short = false) => {
  if (!color) return ''
  const {
    standard,
    white,
    mosaic,
    beige,
    violet,
    sapphire,
    angora,
    ebony,
    velvet,
    pearl,
    california,
    rex,
    lova,
    german,
    blue,
    fur,
  } = color

  const WhoIsLeader = () => {
    if (
      white === 'no' &&
      beige !== 'no' &&
      ebony !== 'homoebony' &&
      ebony !== 'no'
    )
      return 'pastel'
    else if (ebony !== 'no' && ebony !== 'carrier') return 'ebony'
    else if (
      (violet === 'yes' && sapphire === 'yes') ||
      (german === 'yes' && sapphire === 'yes') ||
      (violet === 'yes' && german === 'yes')
    )
      return 'diamond'
    else if (violet === 'yes' || sapphire === 'yes' || german === 'yes')
      return 'notDiamond'
    else if (velvet === 'yes') return 'velvet'
    else return 'other'
  }

  const LEADER = WhoIsLeader()

  const MorFEnd = (point = 3) => {
    if (point === 1) {
      if (LEADER === 'pastel') return 'ая'
      else return 'ой'
    } else if (point === 2) {
      if (LEADER === 'pastel') return 'ая'
      else return 'ий'
    } else if (LEADER === 'pastel') return 'ая'
    else return 'ый'
  }

  const ebonyName = (ebony) => {
    let ebonyName = ''
    switch (ebony) {
      case 'carrier':
        ebonyName = short ? '' : 'носитель эбони'
        break
      case 'light':
        ebonyName = 'эбони светлый'
        break
      case 'middle':
        ebonyName = 'эбони средний'
        break
      case 'dark':
        ebonyName = 'эбони темный'
        break
      case 'exdark':
        ebonyName = 'эбони экстра темный'
        break
      case 'homoebony':
        ebonyName = 'гомоэбони'
        break
    }
    return ebonyName
  }

  const isEbony = () => {
    if (ebony !== 'no') {
      if (beige === 'no' || ebony === 'carrier') return ebonyName(ebony) + ' '
      else return ''
    } else return ''
  }

  const isBeige = () => {
    if (beige !== 'no') {
      if (ebony === 'no' && white === 'no') {
        if (
          beige === 'yes' &&
          !(
            velvet === 'yes' &&
            white !== 'yes' &&
            violet !== 'yes' &&
            sapphire !== 'yes' &&
            (ebony === 'no' || ebony === 'carrier') &&
            pearl !== 'yes' &&
            california !== 'yes' &&
            lova !== 'yes' &&
            german !== 'yes' &&
            blue !== 'yes'
          )
        )
          return 'гетеробежевый '
        else if (beige === 'double') return 'гомобежевый '
        else return ''
      } else return ''
    } else return ''
  }

  const isWHITEPINK = () => {
    if (white === 'yes' && beige === 'no' && ebony !== 'homoebony') {
      return 'белый '
    } else if (white === 'yes' && beige !== 'no' && ebony !== 'homoebony') {
      switch (beige) {
        case 'yes':
          return 'бело-розовый '
        case 'double':
          return 'бело-розовый гомобежевый '
      }
    } else if (white === 'yes' && beige !== 'no' && ebony === 'homoebony') {
      switch (beige) {
        case 'yes':
          return 'белый шоколад '
        case 'double':
          return 'белый гомобежевый шоколад '
      }
    } else return ''
  }

  const isPASTEL = () => {
    if (white === 'no' && beige === 'yes' && ebony !== 'homoebony') {
      switch (ebony) {
        case 'homoebony':
          return 'шоколад '
        case 'exdark':
          return 'пастель экстра темная '
        case 'dark':
          return 'пастель темная '
        case 'middle':
          return 'пастель средняя '
        case 'light':
          return 'пастель светлая '
        default:
          return ''
      }
    } else if (white === 'no' && beige === 'double' && ebony !== 'homoebony') {
      switch (ebony) {
        case 'homoebony':
          return 'гомобежевый шоколад '
        case 'exdark':
          return 'гомобежевая пастель экстра темная '
        case 'dark':
          return 'гомобежевая пастель темная '
        case 'middle':
          return 'гомобежевая пастель средняя '
        case 'light':
          return 'гомобежевая пастель светлая '
        default:
          return ''
      }
    } else return ''
  }

  const isStandart = () => {
    if (standard === 'yes') return 'стандарт '
    else return ''
  }

  const isMosaic = () => {
    if (mosaic === 'yes') return short ? '' : 'мозаика '
    else return ''
  }

  const isViolet = (POSITION) => {
    if (violet !== 'no' && sapphire !== 'yes' && german !== 'yes') {
      if (LEADER !== 'notDiamond') {
        if (POSITION === 1) {
          switch (violet) {
            case 'yes':
              return `фиолетов${MorFEnd()} `
            default:
              return ''
          }
        } else {
          switch (violet) {
            case 'carrier':
              return short ? 'нФ ' : 'носитель фиолета '
            case '67%':
              return short ? 'нФ ' : '67% носитель фиолета '
            case '50%':
              return short ? 'нФ ' : '50% носитель фиолета '
            default:
              return ''
          }
        }
      } else if (POSITION === 1) return 'фиолет '
      else return ''
    } else if (POSITION === 2) {
      switch (violet) {
        case 'carrier':
          return short ? 'нФ ' : 'носитель фиолета '
        case '67%':
          return short ? 'нФ ' : '67% носитель фиолета '
        case '50%':
          return short ? 'нФ ' : '50% носитель фиолета '
        default:
          return ''
      }
    } else return ''
  }

  const isSapphire = (POSITION) => {
    if (sapphire !== 'no' && violet !== 'yes' && german !== 'yes') {
      if (LEADER !== 'notDiamond') {
        if (POSITION === 1) {
          switch (sapphire) {
            case 'yes':
              return `сапфиров${MorFEnd()} `
            default:
              return ''
          }
        } else {
          switch (sapphire) {
            case 'carrier':
              return short ? 'нС ' : 'носитель сапфира '
            case '67%':
              return short ? 'нС ' : '67% носитель сапфира '
            case '50%':
              return short ? 'нС ' : '50% носитель сапфира '
            default:
              return ''
          }
        }
      } else if (POSITION === 1) return 'сапфир '
      else return ''
    } else if (POSITION === 2) {
      switch (sapphire) {
        case 'carrier':
          return short ? 'нС ' : 'носитель сапфира '
        case '67%':
          return short ? 'нС ' : '67% носитель сапфира '
        case '50%':
          return short ? 'нС ' : '50% носитель сапфира '
        default:
          return ''
      }
    } else return ''
  }

  const isDIAMOND = () => {
    if (sapphire === 'yes' && violet === 'yes' && german === 'yes') {
      if (LEADER === 'diamond') {
        return 'триплбриллиант '
      } else return `триплбриллиантов${MorFEnd()} `
    } else if (sapphire === 'yes' && violet === 'yes' && german !== 'yes') {
      if (LEADER === 'diamond') {
        return 'бриллиант '
      } else return `бриллиантов${MorFEnd()} `
    } else if (sapphire === 'yes' && violet !== 'yes' && german === 'yes') {
      if (LEADER === 'diamond') {
        return 'немецкий бриллиант '
      } else return `немецк${MorFEnd(2)} бриллиантов${MorFEnd()} `
    } else if (sapphire !== 'yes' && violet === 'yes' && german === 'yes') {
      if (LEADER === 'diamond') {
        return 'double фиолет '
      } else return `двойн${MorFEnd(2)} фиолетов${MorFEnd()} `
    } else return ''
  }

  const isAngora = (POSITION) => {
    if (angora !== 'no') {
      if (POSITION === 1) {
        switch (angora) {
          case 'yes':
            return short ? 'КПА' : 'ангора '
          default:
            return ''
        }
      } else {
        switch (angora) {
          case 'carrier':
            return short ? 'нКПА ' : 'носитель ангоры '
          case '67%':
            return short ? 'нКПА ' : '67% носитель ангоры '
          case '50%':
            return short ? 'нКПА ' : '50% носитель ангоры '
          default:
            return ''
        }
      }
    } else return ''
  }

  const isVelvet = () => {
    if (velvet === 'yes') {
      if (
        beige === 'yes' &&
        white !== 'yes' &&
        violet !== 'yes' &&
        sapphire !== 'yes' &&
        (ebony === 'no' || ebony === 'carrier') &&
        pearl !== 'yes' &&
        california !== 'yes' &&
        lova !== 'yes' &&
        german !== 'yes' &&
        blue !== 'yes'
      ) {
        return 'коричневый бархат '
      } else if (LEADER === 'velvet') return 'бархат '
      else return `бархатн${MorFEnd()} `
    } else return ''
  }

  const isPearl = (POSITION) => {
    if (pearl !== 'no') {
      if (POSITION === 1) {
        switch (pearl) {
          case 'yes':
            return 'жемчуг '
          default:
            return ''
        }
      } else {
        switch (pearl) {
          case 'carrier':
            return short ? 'нЧЖ ' : 'носитель жемчуга '
          case '67%':
            return short ? 'нЧЖ ' : '67% носитель жемчуга '
          case '50%':
            return short ? 'нЧЖ ' : '50% носитель жемчуга '
          default:
            return ''
        }
      }
    } else return ''
  }

  const isCalifornia = (POSITION) => {
    if (california !== 'no') {
      if (POSITION === 1) {
        switch (california) {
          case 'yes':
            return `калифорнийск${MorFEnd(2)} бел${MorFEnd()} `
          default:
            return ''
        }
      } else {
        switch (california) {
          case 'carrier':
            return short ? 'нКБ ' : 'носитель калифорнийского белого '
          case '67%':
            return short ? 'нКБ ' : '67% носитель калифорнийского белого '
          case '50%':
            return short ? 'нКБ ' : '50% носитель калифорнийского белого '
          default:
            return ''
        }
      }
    } else return ''
  }

  const isRex = (POSITION) => {
    if (rex !== 'no') {
      if (POSITION === 1) {
        switch (rex) {
          case 'yes':
            return 'рекс '
          default:
            return ''
        }
      } else {
        switch (rex) {
          case 'carrier':
            return short ? 'нР ' : 'носитель рекса '
          case '67%':
            return short ? 'нР ' : '67% носитель рекса '
          case '50%':
            return short ? 'нР ' : '50% носитель рекса '
          default:
            return ''
        }
      }
    } else return ''
  }

  const isLova = (POSITION) => {
    if (lova !== 'no') {
      if (POSITION === 1) {
        switch (lova) {
          case 'yes':
            return 'белый Лова '
          default:
            return ''
        }
      } else {
        switch (lova) {
          case 'carrier':
            return short ? 'нЛ ' : 'носитель Лова '
          case '67%':
            return short ? 'нЛ ' : '67% носитель Лова '
          case '50%':
            return short ? 'нЛ ' : '50% носитель Лова '
          default:
            return ''
        }
      }
    } else return ''
  }

  const isGerman = (POSITION) => {
    if (german !== 'no' && violet !== 'yes' && sapphire !== 'yes') {
      if (LEADER !== 'notDiamond') {
        if (POSITION === 1) {
          switch (german) {
            case 'yes':
              return `немецк${MorFEnd(2)} фиолетов${MorFEnd()} `
            default:
              return ''
          }
        } else {
          switch (german) {
            case 'carrier':
              return short ? 'нДФ ' : 'носитель немецкого фиолета '
            case '67%':
              return short ? 'нДФ ' : '67% носитель немецкого фиолета '
            case '50%':
              return short ? 'нДФ ' : '50% носитель немецкого фиолета '
            default:
              return ''
          }
        }
      } else if (POSITION === 1) return 'немецкий фиолет '
      else return ''
    } else return ''
  }

  const isBlue = () => {
    if (blue === 'yes') return 'блю слейт '
    else return ''
  }

  const isFur = () => {
    if (fur === 'yes' && angora !== 'yes')
      return short ? '' : `(мехов${MorFEnd(1)}) `
    else return ''
  }

  let fullChinColorName =
    isStandart() +
    isWHITEPINK() +
    isBeige() +
    isVelvet() +
    isViolet(1) +
    isSapphire(1) +
    isGerman(1) +
    isCalifornia(1) +
    isLova(1) +
    isRex(1) +
    isDIAMOND() +
    isPearl(1) +
    isPASTEL() +
    isEbony() +
    isAngora(1) +
    isBlue() +
    isMosaic() +
    isViolet(2) +
    isSapphire(2) +
    isGerman(2) +
    isPearl(2) +
    isAngora(2) +
    isCalifornia(2) +
    isRex(2) +
    isLova(2) +
    isFur()

  if (fullChinColorName.substring(0, 10) === 'бриллиант ') {
    fullChinColorName = 'голубой ' + fullChinColorName
  } else if (fullChinColorName.substring(0, 7) === 'жемчуг ') {
    fullChinColorName = 'черный ' + fullChinColorName
  } else if (fullChinColorName.substring(0, 7) === 'бархат ') {
    fullChinColorName = 'черный ' + fullChinColorName
  }

  if (!fullChinColorName) fullChinColorName = 'Стандарт'

  fullChinColorName =
    fullChinColorName[0].toUpperCase() + fullChinColorName.slice(1)
  return fullChinColorName.trim()
};

export { colorToString };
