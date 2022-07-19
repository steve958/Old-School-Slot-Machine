import React, { useEffect, useState } from 'react'
import PointsPerLine from './components/PointsPerLine'
import NextMoveIndicator from './components/NextMoveIndicator'
import PointsPrizes from './components/PointsPrizes'
import './App.css'
import Score from './components/Score'
import LeftGameBox from './components/LeftGameBox'
import MiddleGameBox from './components/MiddleGameBox'
import RightGameBox from './components/RightGameBox'
import BetScreen from './components/BetScreen'
import { calcSuperMeter } from './logic/GameLogic'

function App() {
  const [keyStroke, setKeyStroke] = useState<any>(false)
  const [credit, setCredit] = useState<number>(0)
  const [currentMove, setCurrentMove] = useState<any>([])
  const [leftBoxMoves, setLeftBoxMoves] = useState<any>(null)
  const [middleBoxMoves, setMiddleBoxMoves] = useState<any>(null)
  const [rightBoxMoves, setRightBoxMoves] = useState<any>(null)
  const [leftBoxScore, setLeftBoxScore] = useState<any>(null)
  const [middleBoxScore, setMiddleBoxScore] = useState<any>(null)
  const [rightBoxScore, setRightBoxScore] = useState<any>(null)
  const [superMeter, setSuperMeter] = useState<number>(0)
  const [nextGame, setNextGame] = useState<boolean>(false)
  const [startButtonClicked, setStartButtonClicked] = useState<boolean>(false)
  const [betScreenActive, setBetScreenActive] = useState<boolean>(false)
  useEffect(() => {
    if (leftBoxScore || middleBoxScore || rightBoxScore) {
      if (leftBoxScore && middleBoxScore && rightBoxScore) {
        setSuperMeter((leftBoxScore + middleBoxScore + rightBoxScore) * 2)
      } else if (
        (leftBoxScore && middleBoxScore) ||
        (leftBoxScore && rightBoxScore) ||
        (middleBoxScore && rightBoxScore)
      ) {
        setSuperMeter((leftBoxScore + rightBoxScore + middleBoxScore) * 1.5)
      } else {
        setSuperMeter(leftBoxScore + rightBoxScore + middleBoxScore)
      }
    }
  }, [leftBoxScore, rightBoxScore, middleBoxScore])

  useEffect(() => {
    if (
      typeof leftBoxScore === 'number' &&
      typeof rightBoxScore === 'number' &&
      typeof middleBoxScore === 'number' &&
      superMeter > 100
    ) {
      setTimeout(() => {
        setBetScreenActive(true)
      }, 2000)
    } else if (
      typeof leftBoxScore === 'number' &&
      typeof rightBoxScore === 'number' &&
      typeof middleBoxScore === 'number' &&
      superMeter < 100
    ) {
      setTimeout(() => {
        setNextGame(!nextGame)
        setCredit((oldState) => {
          return oldState - 1
        })
      }, 2000)
    }
  }, [superMeter, leftBoxScore, middleBoxScore, rightBoxScore])

  useEffect(() => {
    setLeftBoxMoves(null)
    setRightBoxMoves(null)
    setMiddleBoxMoves(null)
    setRightBoxScore(null)
    setLeftBoxScore(null)
    setMiddleBoxScore(null)
    setSuperMeter(0)
    setKeyStroke(false)
    console.log('restart')

    if (credit === 0) {
      setStartButtonClicked(false)
    }
  }, [nextGame])

  function handleKeyStrokeLeft() {
    if (leftBoxScore === null) {
      setKeyStroke(!keyStroke)
    }
  }

  function handleKeyStrokeMiddle() {
    if (middleBoxScore === null) {
      setKeyStroke(!keyStroke)
    }
  }

  function handleKeyStrokeRight() {
    if (rightBoxScore === null) {
      setKeyStroke(!keyStroke)
    }
  }

  return (
    <div className="App">
      {betScreenActive && (
        <BetScreen
          superMeter={
            typeof leftBoxScore === 'number' &&
            typeof rightBoxScore === 'number' &&
            typeof middleBoxScore === 'number' &&
            superMeter > 100
              ? calcSuperMeter(superMeter)
              : null
          }
          setBetScreenActive={setBetScreenActive}
          setSuperMeter={setSuperMeter}
          setNextGame={setNextGame}
          nextGame={nextGame}
          setCredit={setCredit}
        ></BetScreen>
      )}
      <div id="upper-wrapper">
        <div id="upper-wrapper-left-section">
          <h2 id="heading">Points per Line</h2>
          <PointsPerLine />
        </div>
        <div id="upper-wrapper-middle-selection">
          <NextMoveIndicator
            keyStroke={keyStroke}
            currentMove={currentMove}
            setCurrentMove={setCurrentMove}
            leftBoxScore={leftBoxScore}
            middleBoxScore={middleBoxScore}
            rightBoxScore={rightBoxScore}
            superMeter={superMeter}
            startButtonClicked={startButtonClicked}
            credit={credit}
          />
        </div>
        <div id="upper-wrapper-right-section">
          <h2 id="heading">Points - Prizes</h2>
          <PointsPrizes />
        </div>
        <div id="score-section">
          <Score
            superMeter={superMeter}
            setCredit={setCredit}
            credit={credit}
          />
        </div>
      </div>
      {credit === 0 ||
        (!startButtonClicked && (
          <button
            id="start-button"
            onClick={() => {
              setStartButtonClicked(true)
              setKeyStroke(false)
            }}
          >
            START
          </button>
        ))}
      <div id="bottom-wrapper">
        <span
          onClick={() => {
            if (startButtonClicked) {
              setLeftBoxMoves(currentMove)
              handleKeyStrokeLeft()
            }
          }}
        >
          <LeftGameBox
            leftBoxMoves={leftBoxMoves}
            setLeftBoxScore={setLeftBoxScore}
            leftBoxScore={leftBoxScore}
            currentMove={currentMove}
            nextGame={nextGame}
          />
        </span>
        <span
          onClick={() => {
            if (startButtonClicked) {
              setMiddleBoxMoves(currentMove)
              handleKeyStrokeMiddle()
            }
          }}
        >
          <MiddleGameBox
            middleBoxMoves={middleBoxMoves}
            setMiddleBoxScore={setMiddleBoxScore}
            middleBoxScore={middleBoxScore}
            currentMove={currentMove}
            nextGame={nextGame}
          />
        </span>
        <span
          onClick={() => {
            if (startButtonClicked) {
              setRightBoxMoves(currentMove)
              handleKeyStrokeRight()
            }
          }}
        >
          <RightGameBox
            rightBoxMoves={rightBoxMoves}
            setRightBoxScore={setRightBoxScore}
            rightBoxScore={rightBoxScore}
            currentMove={currentMove}
            nextGame={nextGame}
          />
        </span>
      </div>
    </div>
  )
}

export default App
