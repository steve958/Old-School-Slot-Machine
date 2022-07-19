import React, { useState, useEffect } from 'react'
import './GameBox.css'
import {
  findTheRightIcon,
  calcScore,
  blinkOrNotUpper,
  blinkOrNotMiddle,
  blinkOrNotLower,
  blinkOrNotUpperSecondMove,
  blinkOrNotMiddleSecondMove,
  blinkOrNotLowerSecondMove,
} from '../logic/GameLogic'

interface RightBoxProps {
  rightBoxMoves: any
  setRightBoxScore: Function
  rightBoxScore: any
  currentMove: any
  nextGame: boolean
}

const RightGameBox: React.FC<RightBoxProps> = (props) => {
  const [firstMove, setFirstMove] = useState<any>(null)
  const [secondMove, setSecondMove] = useState<any>(null)
  const [thirdMove, setThirdMove] = useState<any>(null)

  useEffect(() => {
    if (firstMove === null) {
      setFirstMove(props.rightBoxMoves)
    } else if (secondMove === null) {
      setSecondMove(props.rightBoxMoves)
    } else if (thirdMove === null) {
      setThirdMove(props.rightBoxMoves)
    }
  }, [props.rightBoxMoves])

  useEffect(() => {
    if (thirdMove) {
      props.setRightBoxScore(calcScore(firstMove, secondMove, thirdMove))
    }
  }, [thirdMove])

  useEffect(() => {
    setFirstMove(null)
    setSecondMove(null)
    setThirdMove(null)
  }, [props.nextGame])

  return (
    <div id="game-box-container">
      <div id="content">
        <hr />
        <hr />
        <hr />
      </div>
      {calcScore(firstMove, secondMove, thirdMove) ? (
        <div id="local-score">
          {calcScore(firstMove, secondMove, thirdMove)}
        </div>
      ) : null}
      <div id="content-icons-first-move">
        {firstMove && firstMove[0] && (
          <>
            <div
              id={
                findTheRightIcon(firstMove[0].iconID)
                  ? findTheRightIcon(firstMove[0].iconID)
                  : 'empty-div'
              }
              className={blinkOrNotUpper(
                props.currentMove,
                firstMove,
                secondMove,
                thirdMove,
              )}
            ></div>
            <div
              id={
                findTheRightIcon(firstMove[1].iconID)
                  ? findTheRightIcon(firstMove[1].iconID)
                  : 'empty-div'
              }
              className={blinkOrNotMiddle(
                props.currentMove,
                firstMove,
                secondMove,
                thirdMove,
              )}
            ></div>
            <div
              id={
                findTheRightIcon(firstMove[2].iconID)
                  ? findTheRightIcon(firstMove[2].iconID)
                  : 'empty-div'
              }
              className={blinkOrNotLower(
                props.currentMove,
                firstMove,
                secondMove,
                thirdMove,
              )}
            ></div>
          </>
        )}
      </div>
      <div id="content-icons-second-move">
        {secondMove && secondMove[0] && (
          <>
            <div
              id={
                findTheRightIcon(secondMove[0].iconID)
                  ? findTheRightIcon(secondMove[0].iconID)
                  : 'empty-div'
              }
              className={blinkOrNotUpperSecondMove(
                props.currentMove,
                firstMove,
                secondMove,
                thirdMove,
              )}
            ></div>
            <div
              id={
                findTheRightIcon(secondMove[1].iconID)
                  ? findTheRightIcon(secondMove[1].iconID)
                  : 'empty-div'
              }
              className={blinkOrNotMiddleSecondMove(
                props.currentMove,
                firstMove,
                secondMove,
                thirdMove,
              )}
            ></div>
            <div
              id={
                findTheRightIcon(secondMove[2].iconID)
                  ? findTheRightIcon(secondMove[2].iconID)
                  : 'empty-div'
              }
              className={blinkOrNotLowerSecondMove(
                props.currentMove,
                firstMove,
                secondMove,
                thirdMove,
              )}
            ></div>
          </>
        )}
      </div>
      <div id="content-icons-third-move">
        {thirdMove && thirdMove[0] && (
          <>
            <div
              id={
                findTheRightIcon(thirdMove[0].iconID)
                  ? findTheRightIcon(thirdMove[0].iconID)
                  : 'empty-div'
              }
            ></div>
            <div
              id={
                findTheRightIcon(thirdMove[1].iconID)
                  ? findTheRightIcon(thirdMove[1].iconID)
                  : 'empty-div'
              }
            ></div>
            <div
              id={
                findTheRightIcon(thirdMove[2].iconID)
                  ? findTheRightIcon(thirdMove[2].iconID)
                  : 'empty-div'
              }
            ></div>
          </>
        )}
      </div>
    </div>
  )
}

export default RightGameBox
