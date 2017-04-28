import React, { Component } from 'react';

  updateTimer(value) {
    this.setState({
      timerProgress: value
    });
  }

  pauseTimer(value) {
    this.setState({ paused: {value} });
    console.log(this.state.paused);
  }

  startTimer(duration) {
    let start = Date.now();
    let difference,
        minutes,
        seconds;

    this.pauseTimer(false);

    const timer = () => {
      // The 25 represents the duration argument
      difference = (25 * 60) - ((Date.now() - start) / 1000 | 0);

      minutes = (difference / 60) | 0;
      seconds = (difference % 60) | 0;

      seconds = seconds < 10 ? "0" + seconds : seconds;

      console.log(`${minutes}:${seconds}`); 
      this.updateTimer(`${minutes}:${seconds}`);
      
    };
   
    timer();
    setInterval(timer, 1000);

    // if(this.state.paused) {
    //     return;
    // }
  }

  renderButton() {
    if(this.state.paused) {
      return (
        <i className="material-icons md-80 md-green"
        onClick={this.startTimer()}>
        play_circle_outline</i>
      );
    }

    return (
      <i className="material-icons md-80 md-red"
      onClick={this.pauseTimer(true)}>
      pause_circle_outline</i>
    );
  }

class Timer extends Component {
  render() {
    return(
      <div className="timer-container">
        <div className="timer-active">
          <div className="timer-circle">
            <div className="timer-text">{timerProgress}</div>
            {renderButton()}
          </div>
        </div> 
      </div>
    );
  }
}

export default Timer;
