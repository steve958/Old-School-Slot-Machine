import React, { useEffect, useState } from 'react'
import './BetScreen.css'
import { lowerHigherRandomizer } from '../logic/GameLogic'

interface BetScreenProps {
  superMeter: any
  setBetScreenActive: Function
  setSuperMeter: Function
  setNextGame: Function
  nextGame: boolean
  setCredit: Function
}

const BetScreen: React.FC<BetScreenProps> = (props) => {
  const [userClickedHigher, setUserClickedHigher] = useState<boolean>(false)
  const [userClickedLower, setUserClickedLower] = useState<boolean>(false)
  const [nextMove, setNextMove] = useState<boolean>(false)
  const [clickEvent, setClickEvent] = useState<boolean>(false)
  const [currentScore, setCurrentScore] = useState<any>(props.superMeter)
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
        props.setNextGame(!props.nextGame)
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
        props.setNextGame(!props.nextGame)
      }
    }
  }, [clickEvent])

  useEffect(() => {
    if (currentScore === 0) {
      setTimeout(() => {
        props.setBetScreenActive(false)
      }, 3000)
    } else if (currentScore >= 200) {
      setCurrentScore(200)
    }
  }, [currentScore])

  return (
    <div id="bet-screen-container">
      <div id="bet-screen-left-wrapper">
        <p className={currentScore >= 200 ? 'active-number' : undefined}>200</p>
        <p
          className={
            currentScore >= 100 && currentScore < 200
              ? 'active-number'
              : undefined
          }
        >
          100
        </p>
        <p
          className={
            currentScore >= 60 && currentScore < 100
              ? 'active-number'
              : undefined
          }
        >
          60
        </p>
        <p
          className={
            currentScore >= 40 && currentScore < 60
              ? 'active-number'
              : undefined
          }
        >
          40
        </p>
        <p
          className={
            currentScore >= 30 && currentScore < 40
              ? 'active-number'
              : undefined
          }
        >
          30
        </p>
        <p
          className={
            currentScore >= 20 && currentScore < 30
              ? 'active-number'
              : undefined
          }
        >
          20
        </p>
        <p
          className={
            currentScore >= 15 && currentScore < 20
              ? 'active-number'
              : undefined
          }
        >
          15
        </p>
        <p
          className={
            currentScore >= 10 && currentScore < 15
              ? 'active-number'
              : undefined
          }
        >
          10
        </p>
        <p
          className={
            currentScore >= 6 && currentScore < 10 ? 'active-number' : undefined
          }
        >
          6
        </p>
        <p className={currentScore === 4 ? 'active-number' : undefined}>4</p>
        <p className={currentScore === 3 ? 'active-number' : undefined}>3</p>
        <p className={currentScore === 2 ? 'active-number' : undefined}>2</p>
        <p className={currentScore === 0 ? 'active-number' : undefined}>0</p>
      </div>
      <div id="bet-screen-middle-wrapper">
        <h1>WIN</h1>
        <div id="bet-score">{currentScore}</div>
        <div id="bet-score-middle-container">
          {currentScore < 200 && (
            <div
              id="middle-lower"
              onClick={() => {
                setUserClickedLower(true)
                setUserClickedHigher(false)
                setClickEvent(!clickEvent)
              }}
              className={currentScore > 0 ? 'blinker-low' : undefined}
            >
              LOWER
            </div>
          )}
          <div id="middle-current">{currentNumber}</div>
          {currentScore < 200 && (
            <div
              id="middle-higher"
              onClick={() => {
                setUserClickedLower(false)
                setUserClickedHigher(true)
                setClickEvent(!clickEvent)
              }}
              className={currentScore > 0 ? 'blinker-high' : undefined}
            >
              HIGHER
            </div>
          )}
        </div>
        {currentScore > 0 ? (
          <button
            id="withdraw-button"
            onClick={() => {
              props.setCredit((oldState: number) => {
                return oldState + currentScore
              })
              setCurrentScore(0)
              props.setSuperMeter(0)
              props.setNextGame(!props.nextGame)
            }}
          >
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
