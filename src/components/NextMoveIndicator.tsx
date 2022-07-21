import React, { useEffect } from 'react'
import './NextMoveIndicator.css'
import { possibleResults, findTheRightIcon } from '../logic/GameLogic'

interface NextMoveIndicatorProps {
  keyStroke: any
  currentMove: any
  setCurrentMove: Function
  leftBoxScore: any
  middleBoxScore: any
  rightBoxScore: any
  superMeter: any
  startButtonClicked: boolean
  credit: number
}

const NextMoveIndicator: React.FC<NextMoveIndicatorProps> = (props) => {
  useEffect(() => {
    if (props.startButtonClicked) {
      if (
        props.leftBoxScore === null ||
        props.middleBoxScore === null ||
        props.rightBoxScore === null
      ) {
        props.setCurrentMove(possibleResults())
      }
    } else {
      props.setCurrentMove([])
    }
  }, [props.keyStroke, props.startButtonClicked])

  return (
    <div id="next-move-container">
      {(props.currentMove[0] && props.leftBoxScore === null) ||
      props.middleBoxScore === null ||
      props.rightBoxScore === null ? (
        <>
          <div
            id={
              props.currentMove[0] &&
              findTheRightIcon(props.currentMove[0].iconID)
            }
          ></div>
          <div
            id={
              props.currentMove[0] &&
              findTheRightIcon(props.currentMove[1].iconID)
            }
          ></div>
          <div
            id={
              props.currentMove[0] &&
              findTheRightIcon(props.currentMove[2].iconID)
            }
          ></div>
        </>
      ) : props.superMeter > 100 ? (
        <p id="game-over-text">Good Luck...</p>
      ) : (
        <p id="game-over-text">Game Over</p>
      )}
    </div>
  )
}

export default NextMoveIndicator
