import React, { useEffect, useState, useCallback } from 'react'
import PointsPerLine from './components/PointsPerLine'
import NextMoveIndicator from './components/NextMoveIndicator'
import PointsPrizes from './components/PointsPrizes'
import './App.css'
import Score from './components/Score'
import LeftGameBox from './components/LeftGameBox'
import MiddleGameBox from './components/MiddleGameBox'
import RightGameBox from './components/RightGameBox'
import BetScreen from './components/BetScreen'
import KeyboardHelp from './components/KeyboardHelp'
import { calcSuperMeter } from './logic/GameLogic'

function App() {
  const [keyStroke, setKeyStroke] = useState<any>(false)
  const [credit, setCredit] = useState<number>(0)
  const [stake, setStake] = useState<number>(1)
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
  const [changeClicked, setChangeClicked] = useState<boolean>(false)
  const [buyClicked, setBuyClicked] = useState<boolean>(false)
  const [fallBackMeter, setFallBackMeter] = useState<number>(0)
  const [fallBackCredit, setFallBackCredit] = useState<number>(credit - 1)
  const [showHelp, setShowHelp] = useState<boolean>(false)

  useEffect(() => {
    if (credit < 0) {
      setCredit(0)
      setStartButtonClicked(false)
    }
  }, [credit])

  useEffect(() => {
    if (
      typeof leftBoxScore === 'number' &&
      typeof rightBoxScore === 'number' &&
      typeof middleBoxScore === 'number' &&
      typeof superMeter !== undefined
    ) {
      setFallBackMeter(calcSuperMeter(superMeter, stake))
    }
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
  }, [leftBoxScore, middleBoxScore, rightBoxScore])

  useEffect(() => {
    if (
      typeof leftBoxScore === 'number' &&
      typeof rightBoxScore === 'number' &&
      typeof middleBoxScore === 'number' &&
      superMeter >= 100
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
        setFallBackCredit(credit - 1)
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
    setKeyStroke(!keyStroke)
    setChangeClicked(false)
    setBuyClicked(false)
    setStartButtonClicked(false)
  }, [nextGame])

  useEffect(() => {
    if (startButtonClicked) {
      if (credit !== fallBackCredit) {
        setCredit((oldState) => {
          return oldState - stake
        })
      }
      setKeyStroke(!keyStroke)
    }
  }, [startButtonClicked])

  const handleChangeClicked = useCallback(() => {
    setKeyStroke((prev: any) => !prev)
    setChangeClicked(true)
  }, [])

  const handleBuyClicked = useCallback(() => {
    setKeyStroke((prev: any) => !prev)
    setBuyClicked(true)
    setCredit((oldState) => {
      return oldState - stake
    })
  }, [stake])

  const handleKeyStrokeLeft = useCallback(() => {
    if (leftBoxScore === null) {
      setKeyStroke((prev: any) => !prev)
    }
  }, [leftBoxScore])

  const handleKeyStrokeMiddle = useCallback(() => {
    if (middleBoxScore === null) {
      setKeyStroke((prev: any) => !prev)
    }
  }, [middleBoxScore])

  const handleKeyStrokeRight = useCallback(() => {
    if (rightBoxScore === null) {
      setKeyStroke((prev: any) => !prev)
    }
  }, [rightBoxScore])

  const handleStartButton = useCallback(() => {
    if (credit >= stake) {
      setStartButtonClicked(true)
      setKeyStroke(false)
    } else {
      setStake(credit)
      setStartButtonClicked(true)
      setKeyStroke(false)
    }
  }, [credit, stake])

  const handleStakeIncrease = useCallback(() => {
    if (!startButtonClicked && credit > stake) {
      setStake((prevStake) => prevStake + 1)
    }
  }, [startButtonClicked, credit, stake])

  const handleStakeDecrease = useCallback(() => {
    if (!startButtonClicked && stake > 1) {
      setStake((prevStake) => prevStake - 1)
    }
  }, [startButtonClicked, stake])

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle help modal shortcuts (works everywhere)
      if (event.key === '?' || event.key === '/') {
        event.preventDefault()
        setShowHelp(true)
        return
      }

      if (event.key === 'Escape') {
        if (showHelp) {
          event.preventDefault()
          setShowHelp(false)
          return
        }
      }

      // Prevent keyboard actions when bet screen or help modal is active
      if (betScreenActive || showHelp) return

      switch (event.key) {
        case 'ArrowLeft':
          // Left arrow - stop left game box
          if (startButtonClicked && leftBoxScore === null) {
            setLeftBoxMoves(currentMove)
            handleKeyStrokeLeft()
          }
          break

        case 'ArrowDown':
          // Down arrow - stop middle game box
          if (startButtonClicked && middleBoxScore === null) {
            setMiddleBoxMoves(currentMove)
            handleKeyStrokeMiddle()
          }
          break

        case 'ArrowRight':
          // Right arrow - stop right game box
          if (startButtonClicked && rightBoxScore === null) {
            setRightBoxMoves(currentMove)
            handleKeyStrokeRight()
          }
          break

        case ' ':
          // Space - Change button
          event.preventDefault() // Prevent page scroll
          if (!changeClicked && startButtonClicked) {
            handleChangeClicked()
          }
          break

        case '+':
        case '=':
          // Plus key - Buy button
          if (changeClicked && !buyClicked && credit > 0) {
            handleBuyClicked()
          }
          break

        case 'PageUp':
          // PageUp - Increase stake
          event.preventDefault()
          handleStakeIncrease()
          break

        case 'PageDown':
          // PageDown - Decrease stake
          event.preventDefault()
          handleStakeDecrease()
          break

        case 'Enter':
          // Enter - Start button
          if (credit > 0 && !startButtonClicked) {
            handleStartButton()
          }
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    betScreenActive,
    showHelp,
    startButtonClicked,
    leftBoxScore,
    middleBoxScore,
    rightBoxScore,
    changeClicked,
    buyClicked,
    credit,
    currentMove,
    handleKeyStrokeLeft,
    handleKeyStrokeMiddle,
    handleKeyStrokeRight,
    handleChangeClicked,
    handleBuyClicked,
    handleStakeIncrease,
    handleStakeDecrease,
    handleStartButton,
  ])

  return (
    <div className="App">
      <KeyboardHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />
      {betScreenActive && (
        <BetScreen
          superMeter={
            typeof leftBoxScore === 'number' &&
            typeof rightBoxScore === 'number' &&
            typeof middleBoxScore === 'number' &&
            superMeter > 100
              ? calcSuperMeter(superMeter, stake)
              : null
          }
          setBetScreenActive={setBetScreenActive}
          setSuperMeter={setSuperMeter}
          setNextGame={setNextGame}
          nextGame={nextGame}
          setCredit={setCredit}
          fallBackMeter={fallBackMeter}
          stake={stake}
        ></BetScreen>
      )}
      <button
        id="help-button"
        onClick={() => setShowHelp(true)}
        title="Keyboard Shortcuts (Press ? or /)"
      >
        ?
      </button>
      <div id="upper-wrapper">
        <div id="upper-wrapper-left-section">
          {credit === 0 ? (
            <p id="helper-text">Click credit field to add credit</p>
          ) : null}
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
          <PointsPrizes stake={stake} />
        </div>
        <div id="score-section">
          <Score
            superMeter={superMeter}
            setCredit={setCredit}
            credit={credit}
            stake={stake}
            setStake={setStake}
            startButtonClicked={startButtonClicked}
          />
        </div>
      </div>
      {credit === 0 ||
        (!startButtonClicked && (
          <button id="start-button" onClick={handleStartButton}>
            START
          </button>
        ))}
      {!changeClicked && startButtonClicked && (
        <button id="change-buy-button" onClick={handleChangeClicked}>
          change
        </button>
      )}
      {changeClicked && !buyClicked && credit > 0 && (
        <button id="change-buy-button" onClick={handleBuyClicked}>
          buy
        </button>
      )}
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
