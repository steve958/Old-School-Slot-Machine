export function possibleResults() {
  const allIcons = [
    { value: 300, iconID: 10 },
    { value: 120, iconID: 9 },
    { value: 60, iconID: 8 },
    { value: 60, iconID: 7 },
    { value: 60, iconID: 6 },
    { value: 40, iconID: 5 },
    { value: 40, iconID: 4 },
    { value: 20, iconID: 3 },
    { value: 20, iconID: 3 },
    { value: 20, iconID: 3 },
    { value: 20, iconID: 2 },
    { value: 20, iconID: 2 },
    { value: 20, iconID: 2 },
    { value: 20, iconID: 1 },
    { value: 20, iconID: 1 },
    { value: 20, iconID: 1 },
  ]

  return [
    allIcons[Math.trunc(Math.random() * 16)],
    allIcons[Math.trunc(Math.random() * 16)],
    allIcons[Math.trunc(Math.random() * 16)],
  ]
}

export function findTheRightIcon(iconID) {
  if (iconID === 1) return 'cherry-icon'
  if (iconID === 2) return 'orange-icon'
  if (iconID === 3) return 'lemon-icon'
  if (iconID === 4) return 'plum-icon'
  if (iconID === 5) return 'strawberry-icon'
  if (iconID === 6) return 'watermelon-icon'
  if (iconID === 7) return 'seven-icon'
  if (iconID === 8) return 'star-icon'
  if (iconID === 9) return 'bell-icon'
  if (iconID === 10) return 'bar-icon'
}

export function calcScore(first, second, third) {
  let score = 0
  if (first && second && third) {
    if (
      first[0].iconID === second[0].iconID &&
      first[0].iconID === third[0].iconID
    ) {
      score += first[0].value
    }

    if (
      first[1].iconID === second[1].iconID &&
      first[1].iconID === third[1].iconID
    ) {
      score += first[1].value
    }

    if (
      first[2].iconID === second[2].iconID &&
      first[2].iconID === third[2].iconID
    ) {
      score += first[2].value
    }

    if (
      first[0].iconID === second[1].iconID &&
      first[0].iconID === third[2].iconID
    ) {
      score += first[0].value
    }

    if (
      first[2].iconID === second[1].iconID &&
      first[2].iconID === third[0].iconID
    ) {
      score += first[2].value
    }
  }
  return score
}

export function blinkOrNotUpper(current, first, second, third) {
  if (third === null && second === null) {
    if (
      current[0].iconID === first[0].iconID ||
      current[1].iconID === first[0].iconID
    )
      return 'blinker'
  } else if (third === null && second !== null) {
    if (
      (current[0].iconID === first[0].iconID &&
        first[0].iconID === second[0].iconID) ||
      (current[2].iconID === first[0].iconID &&
        second[1].iconID === first[0].iconID)
    )
      return 'blinker'
  }

  return undefined
}

export function blinkOrNotLower(current, first, second, third) {
  if (third === null && second === null) {
    if (
      current[2].iconID === first[2].iconID ||
      current[1].iconID === first[2].iconID
    )
      return 'blinker'
  } else if (third === null && second !== null) {
    if (
      (current[2].iconID === first[2].iconID &&
        first[2].iconID === second[2].iconID) ||
      (current[0].iconID === first[2].iconID &&
        second[1].iconID === first[2].iconID)
    )
      return 'blinker'
  }

  return undefined
}

export function blinkOrNotMiddle(current, first, second, third) {
  if (third === null && second === null) {
    if (current[1].iconID === first[1].iconID) return 'blinker'
  } else if (third === null && second !== null) {
    if (
      current[1].iconID === first[1].iconID &&
      second[1].iconID === first[1].iconID
    )
      return 'blinker'
  }

  return undefined
}

export function blinkOrNotUpperSecondMove(current, first, second, third) {
  if (third === null) {
    if (
      first[0].iconID === second[0].iconID &&
      current[0].iconID === second[0].iconID
    )
      return 'blinker'
  }

  return undefined
}

export function blinkOrNotLowerSecondMove(current, first, second, third) {
  if (third === null) {
    if (
      first[2].iconID === second[2].iconID &&
      current[2].iconID === second[2].iconID
    )
      return 'blinker'
  }

  return undefined
}

export function blinkOrNotMiddleSecondMove(current, first, second, third) {
  if (third === null) {
    if (
      (second[1].iconID === current[1].iconID &&
        second[1].iconID === first[1].iconID) ||
      (second[1].iconID === current[0].iconID &&
        second[1].iconID === first[2].iconID) ||
      (second[1].iconID === current[2].iconID &&
        second[1].iconID === first[0].iconID)
    )
      return 'blinker'
  }

  return undefined
}

export function lowerHigherRandomizer(previousInt) {
  let random = Math.trunc(Math.random() * 13 + 1)

  while (previousInt === random) {
    random = Math.trunc(Math.random() * 13 + 1)
  }

  return random
}

export function calcSuperMeter(supermeter) {
  if (supermeter >= 750) {
    return 200
  } else if (supermeter > 500) {
    return 100
  } else if (supermeter > 400) {
    return 40
  } else if (supermeter > 300) {
    return 10
  } else if (supermeter > 250) {
    return 6
  } else if (supermeter > 200) {
    return 4
  } else if (supermeter > 150) {
    return 3
  } else if (supermeter > 100) {
    return 2
  }
}
