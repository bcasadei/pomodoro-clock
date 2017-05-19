import React from 'react';

const ResetButton = ({ resetTimer }) => {
  return (
    <button className="reset-button" onClick={resetTimer}>
      Reset
    </button>
  );
}

export default ResetButton;
