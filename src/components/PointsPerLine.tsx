import React from 'react'
import './PointsPerLine.css'

const PointsPerLine: React.FC = () => {
  return (
    <div id="points-per-line-container">
      <div id="left-wrapper">
        <span>
          <div id="bar-icon"></div>
          <div>300</div>
        </span>
        <span>
          <div id="bell-icon"></div>
          <div>120</div>
        </span>
        <span>
          <div id="star-icon"></div>
          <div>60</div>
        </span>
        <span>
          <div id="seven-icon"></div>
          <div>60</div>
        </span>
        <span>
          <div id="watermelon-icon"></div>
          <div>60</div>
        </span>
      </div>
      <div id="right-wrapper">
        <span>
          <div id="strawberry-icon"></div>
          <div>40</div>
        </span>
        <span>
          <div id="plum-icon"></div>
          <div>40</div>
        </span>
        <span>
          <div id="lemon-icon"></div>
          <div>20</div>
        </span>
        <span>
          <div id="orange-icon"></div>
          <div>20</div>
        </span>
        <span>
          <div id="cherry-icon"></div>
          <div>20</div>
        </span>
      </div>
    </div>
  )
}

export default PointsPerLine
