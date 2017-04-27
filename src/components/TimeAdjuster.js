import React from 'react';

const TimeAdjuster = ({ initialValue, timerName }) => {
  return (
    <div className="time-adjuster">
      <div className="row">
        <i className="material-icons md-light md-36">arrow_left</i>
        <div className="timer-value">{initialValue}</div>
        <i className="material-icons md-light md-36">arrow_right</i>
      </div>

      <div className="row timer-name">
        {timerName}
      </div>
    </div>
  );
}

export default TimeAdjuster;