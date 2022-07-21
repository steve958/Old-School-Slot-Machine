import React from 'react'
import './Score.css'

interface SuperMeterProps {
  superMeter: any
  setCredit: Function
  credit: number
  stake: number
  setStake: Function
  startButtonClicked: boolean
}

const Score: React.FC<SuperMeterProps> = (props) => {
  return (
    <div id="score-container">
      <span id="super-meter-wrapper">
        <p>SUPER METER</p>
        <div id="super-meter">{props.superMeter}</div>
      </span>
      <span id="credit-wrapper">
        <p>CREDIT</p>
        <div
          id="credit"
          onClick={() =>
            props.setCredit((oldState: number) => {
              return oldState + 1
            })
          }
        >
          {props.credit}
        </div>
      </span>
      <span id="stake-wrapper">
        <p>STAKE</p>
        <div
          id={!props.startButtonClicked ? 'stake' : 'stake-disabled'}
          onClick={() => {
            if (!props.startButtonClicked) {
              props.setStake((oldState: number) => {
                return props.credit >= oldState + 1 ? oldState + 1 : oldState
              })
            }
          }}
        >
          {props.stake}
          {props.stake > 1 ? (
            <hr
              id={
                !props.startButtonClicked
                  ? 'stake-minus'
                  : 'stake-minus-disabled'
              }
              onClick={(e) => {
                if (!props.startButtonClicked) {
                  e.stopPropagation()
                  props.setStake((oldState: number) => {
                    return oldState > 1 ? oldState - 1 : oldState
                  })
                }
              }}
            />
          ) : null}
        </div>
      </span>
    </div>
  )
}

export default Score
