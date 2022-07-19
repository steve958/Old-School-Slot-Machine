import React from 'react'
import './Score.css'

interface SuperMeterProps {
  superMeter: any
  setCredit: Function
  credit: number
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
        <div id="stake">1</div>
      </span>
    </div>
  )
}

export default Score
