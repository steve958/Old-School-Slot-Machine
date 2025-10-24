import React, { useEffect, useState, useCallback } from 'react'
import './BetScreen.css'
import { lowerHigherRandomizer } from '../logic/GameLogic'

interface BetScreenProps {
  superMeter: any
  setBetScreenActive: Function
  setSuperMeter: Function
  setNextGame: Function
  nextGame: boolean
  setCredit: Function
  fallBackMeter: number
  stake: number
}

const BetScreen: React.FC<BetScreenProps> = (props) => {
  const [userClickedHigher, setUserClickedHigher] = useState<boolean>(false)
  const [userClickedLower, setUserClickedLower] = useState<boolean>(false)
  const [nextMove, setNextMove] = useState<boolean>(false)
  const [clickEvent, setClickEvent] = useState<boolean>(false)
  const [currentScore, setCurrentScore] = useState<any>(
    props.superMeter !== null ? props.superMeter : props.fallBackMeter,
  )
  const [currentNumber, setCurrentNumber] = useState<number>(
    Math.trunc(Math.random() * 13 + 1),
  )

  const [nextNumber, setNextNumber] = useState<number>(
    lowerHigherRandomizer(currentNumber),
  )

  useEffect(() => {
    if (currentNumber !== nextNumber) {
      setNextNumber(lowerHigherRandomizer(nextNumber))
    } else {
      setNextNumber(lowerHigherRandomizer(currentNumber))
    }

    if (props.superMeter === null) {
      props.setSuperMeter(props.fallBackMeter)
    }
  }, [])

  useEffect(() => {
    setNextNumber(lowerHigherRandomizer(currentNumber))
  }, [nextMove])

  useEffect(() => {
    if (userClickedHigher) {
      if (nextNumber > currentNumber) {
        setCurrentNumber(nextNumber)
        setNextMove(!nextMove)
        setCurrentScore(currentScore * 2)
      } else {
        setCurrentNumber(nextNumber)
        setCurrentScore(0)
        props.setSuperMeter(0)
      }
    } else if (userClickedLower) {
      if (nextNumber < currentNumber) {
        setCurrentNumber(nextNumber)
        setNextMove(!nextMove)
        setCurrentScore(currentScore * 2)
      } else {
        setCurrentNumber(nextNumber)
        setCurrentScore(0)
        props.setSuperMeter(0)
      }
    }
  }, [clickEvent])

  useEffect(() => {
    if (currentScore === 0) {
      setTimeout(() => {
        props.setBetScreenActive(false)
        props.setNextGame(!props.nextGame)
      }, 3000)
    } else if (currentScore >= 200 * props.stake) {
      setCurrentScore(200 * props.stake)
    }
  }, [currentScore])

  const handleHigherBet = useCallback(() => {
    if (currentScore > 0 && currentScore < 200 * props.stake) {
      setUserClickedLower(false)
      setUserClickedHigher(true)
      setClickEvent((prev) => !prev)
    }
  }, [currentScore, props.stake])

  const handleLowerBet = useCallback(() => {
    if (currentScore > 0 && currentScore < 200 * props.stake) {
      setUserClickedLower(true)
      setUserClickedHigher(false)
      setClickEvent((prev) => !prev)
    }
  }, [currentScore, props.stake])

  const handleWithdraw = useCallback(() => {
    if (currentScore > 0) {
      props.setCredit((oldState: number) => {
        return oldState + currentScore
      })
      setCurrentScore(0)
      props.setSuperMeter(0)
    }
  }, [currentScore, props])

  // Keyboard event handler for BetScreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          // Up arrow - bet Higher
          event.preventDefault()
          handleHigherBet()
          break

        case 'ArrowDown':
          // Down arrow - bet Lower
          event.preventDefault()
          handleLowerBet()
          break

        case 'Enter':
          // Enter - Withdraw
          event.preventDefault()
          handleWithdraw()
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleHigherBet, handleLowerBet, handleWithdraw])

  return (
    <div id="bet-screen-container">
      <div id="bet-screen-left-wrapper">
        <p
          className={
            currentScore >= 200 * props.stake ? 'active-number' : undefined
          }
        >
          {200 * props.stake}
        </p>
        <p
          className={
            currentScore >= 100 * props.stake &&
            currentScore < 200 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {100 * props.stake}
        </p>
        <p
          className={
            currentScore >= 60 * props.stake && currentScore < 100 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {60 * props.stake}
        </p>
        <p
          className={
            currentScore >= 40 * props.stake && currentScore < 60 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {40 * props.stake}
        </p>
        <p
          className={
            currentScore >= 30 * props.stake && currentScore < 40 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {30 * props.stake}
        </p>
        <p
          className={
            currentScore >= 20 * props.stake && currentScore < 30 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {20 * props.stake}
        </p>
        <p
          className={
            currentScore >= 15 * props.stake && currentScore < 20 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {15 * props.stake}
        </p>
        <p
          className={
            currentScore >= 10 * props.stake && currentScore < 15 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {10 * props.stake}
        </p>
        <p
          className={
            currentScore >= 6 * props.stake && currentScore < 10 * props.stake
              ? 'active-number'
              : undefined
          }
        >
          {6 * props.stake}
        </p>
        <p
          className={
            currentScore === 4 * props.stake ? 'active-number' : undefined
          }
        >
          {4 * props.stake}
        </p>
        <p
          className={
            currentScore === 3 * props.stake ? 'active-number' : undefined
          }
        >
          {3 * props.stake}
        </p>
        <p
          className={
            currentScore === 2 * props.stake ? 'active-number' : undefined
          }
        >
          {2 * props.stake}
        </p>
        <p className={currentScore === 0 ? 'active-number' : undefined}>0</p>
      </div>
      <div id="bet-screen-middle-wrapper">
        <h1>WIN</h1>
        <div id="bet-score">
          {currentScore === null ? props.fallBackMeter : currentScore}
        </div>
        <div id="bet-score-middle-container">
          {currentScore < 200 * props.stake && (
            <div
              id="middle-lower"
              onClick={handleLowerBet}
              className={currentScore > 0 ? 'blinker-low' : undefined}
            >
              LOWER
            </div>
          )}
          <div id="middle-current">{currentNumber}</div>
          {currentScore < 200 * props.stake && (
            <div
              id="middle-higher"
              onClick={handleHigherBet}
              className={currentScore > 0 ? 'blinker-high' : undefined}
            >
              HIGHER
            </div>
          )}
        </div>
        {currentScore > 0 ? (
          <button id="withdraw-button" onClick={handleWithdraw}>
            withdraw
          </button>
        ) : null}
      </div>
      <div id="bet-screen-right-wrapper">
        <p className={currentNumber === 13 ? 'active-number' : undefined}>13</p>
        <p className={currentNumber === 12 ? 'active-number' : undefined}>12</p>
        <p className={currentNumber === 11 ? 'active-number' : undefined}>11</p>
        <p className={currentNumber === 10 ? 'active-number' : undefined}>10</p>
        <p className={currentNumber === 9 ? 'active-number' : undefined}>9</p>
        <p className={currentNumber === 8 ? 'active-number' : undefined}>8</p>
        <p className={currentNumber === 7 ? 'active-number' : undefined}>7</p>
        <p className={currentNumber === 6 ? 'active-number' : undefined}>6</p>
        <p className={currentNumber === 5 ? 'active-number' : undefined}>5</p>
        <p className={currentNumber === 4 ? 'active-number' : undefined}>4</p>
        <p className={currentNumber === 3 ? 'active-number' : undefined}>3</p>
        <p className={currentNumber === 2 ? 'active-number' : undefined}>2</p>
        <p className={currentNumber === 1 ? 'active-number' : undefined}>1</p>
      </div>
    </div>
  )
}

export default BetScreen
