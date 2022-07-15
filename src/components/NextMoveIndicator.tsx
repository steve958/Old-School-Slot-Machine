import React, { useEffect, useState } from 'react'
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
}

const NextMoveIndicator: React.FC<NextMoveIndicatorProps> = (props) => {
  useEffect(() => {
    if (
      props.leftBoxScore === null ||
      props.middleBoxScore === null ||
      props.rightBoxScore === null
    ) {
      props.setCurrentMove(possibleResults())
    }
  }, [props.keyStroke])

  return (
    <div id="next-move-container">
      {props.leftBoxScore === null ||
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
        <p id="game-over-text">Nojs</p>
      ) : (
        <p id="game-over-text">Game Over</p>
      )}
    </div>
  )
}

export default NextMoveIndicator
