import React from 'react'
import './PointsPrizes.css'

interface PointsPrizesProps {
  stake: number
}

const PointsPrizes: React.FC<PointsPrizesProps> = (props) => {
  return (
    <div id="points-prizes-container">
      <div id="left-wrapper">
        <p>1000 </p>
        <p>750 </p>
        <p>500 </p>
        <p>400 </p>
        <p>300 </p>
        <p>250 </p>
        <p>200 </p>
        <p>150 </p>
        <p>100 </p>
      </div>
      <div id="right-wrapper">
        <p>{200 * props.stake}</p>
        <p>{100 * props.stake}</p>
        <p>{40 * props.stake}</p>
        <p>{20 * props.stake}</p>
        <p>{10 * props.stake}</p>
        <p>{6 * props.stake}</p>
        <p>{4 * props.stake}</p>
        <p>{3 * props.stake}</p>
        <p>{2 * props.stake}</p>
      </div>
    </div>
  )
}

export default PointsPrizes
