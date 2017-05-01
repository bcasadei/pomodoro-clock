import React from 'react';

const TimeAdjuster = ({ value, timerName, increaseTimer, decreaseTimer }) => {
  return (
    <div className="time-adjuster">
      <div className="row">
        <i className="material-icons md-light md-36"
          onClick={() => decreaseTimer()}>arrow_left
        </i>

        <div className="timer-value">{value}</div>
        
        <i className="material-icons md-light md-36"
          onClick={() => increaseTimer()}>
          arrow_right
        </i>
      </div>

      <div className="row timer-name">
        {timerName}
      </div>
    </div>
  );
}

export default TimeAdjuster;
