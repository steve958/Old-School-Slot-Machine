import React, { useEffect, useState } from 'react'
import PointsPerLine from './components/PointsPerLine'
import NextMoveIndicator from './components/NextMoveIndicator'
import PointsPrizes from './components/PointsPrizes'

import './App.css'
import Score from './components/Score'
import LeftGameBox from './components/LeftGameBox'
import MiddleGameBox from './components/MiddleGameBox'
import RightGameBox from './components/RightGameBox'

function App() {
  const [keyStroke, setKeyStroke] = useState<any>(false)
  const [currentMove, setCurrentMove] = useState<any>([])
  const [leftBoxMoves, setLeftBoxMoves] = useState<any>(null)
  const [middleBoxMoves, setMiddleBoxMoves] = useState<any>(null)
  const [rightBoxMoves, setRightBoxMoves] = useState<any>(null)
  const [leftBoxScore, setLeftBoxScore] = useState<any>(null)
  const [middleBoxScore, setMiddleBoxScore] = useState<any>(null)
  const [rightBoxScore, setRightBoxScore] = useState<any>(null)
  const [superMeter, setSuperMeter] = useState<number>(0)
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
          />
        </div>
        <div id="upper-wrapper-right-section">
          <h2 id="heading">Points - Prizes</h2>
          <PointsPrizes />
        </div>
        <div id="score-section">
          <Score superMeter={superMeter} setSuperMeter={setSuperMeter} />
        </div>
      </div>
      <div id="bottom-wrapper">
        <span
          onClick={() => {
            setLeftBoxMoves(currentMove)
            handleKeyStrokeLeft()
          }}
        >
          <LeftGameBox
            leftBoxMoves={leftBoxMoves}
            setLeftBoxScore={setLeftBoxScore}
            leftBoxScore={leftBoxScore}
            currentMove={currentMove}
          />
        </span>
        <span
          onClick={() => {
            setMiddleBoxMoves(currentMove)
            handleKeyStrokeMiddle()
          }}
        >
          <MiddleGameBox
            middleBoxMoves={middleBoxMoves}
            setMiddleBoxScore={setMiddleBoxScore}
            middleBoxScore={middleBoxScore}
            currentMove={currentMove}
          />
        </span>
        <span
          onClick={() => {
            setRightBoxMoves(currentMove)
            handleKeyStrokeRight()
          }}
        >
          <RightGameBox
            rightBoxMoves={rightBoxMoves}
            setRightBoxScore={setRightBoxScore}
            rightBoxScore={rightBoxScore}
            currentMove={currentMove}
          />
        </span>
      </div>
    </div>
  )
}

export default App
