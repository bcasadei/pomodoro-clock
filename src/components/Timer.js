import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerMinutes: props.roundLength,
      timerSeconds: 0,
      paused: true,
      currentTimer: 'round'
    };
  }

  // Keep track of which timer we're currently on, Round, 
  // Short Break or Long Break.
  // Round - starting timer
  // Short Break - happens between rounds
  // Long Break - replaces Round every 4th break

  pauseTimer() {
    this.setState({
      paused: true
    });

    clearInterval(this.timerID);
  }

  startTimer() {
    let start = Date.now();
    let { timerMinutes, timerSeconds } = this.state;

    this.setState({ paused: false });

    const timer = () => {
      let difference = ((timerMinutes * 60) + timerSeconds) - ((Date.now() - start) / 1000 | 0);

      let minutes = (difference / 60) | 0;
      let seconds = (difference % 60) | 0;

      this.setState({
        timerMinutes: minutes,
        timerSeconds: seconds
      });
    };
   
    timer();
    this.timerID = setInterval(timer, 1000);
  }

  renderButton() {
    if(this.state.paused) {
      return (
        <i className="material-icons md-80 md-green"
        onClick={() => this.startTimer()}>
        play_circle_outline</i>
      );
    };

    return (
      <i className="material-icons md-80 md-red"
      onClick={() => this.pauseTimer(true)}>
      pause_circle_outline</i>
    );
  }

  render() {
    const { timerMinutes, timerSeconds } = this.state;

    return (
      <div className="timer-container">
        <div className="timer-active">
          <div className="timer-circle">
            <div className="timer-text">
              {`${timerMinutes}:${timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}`}
            </div>
            {this.renderButton()}
          </div>
        </div> 
     </div>
    );
  }
}

export default Timer;
