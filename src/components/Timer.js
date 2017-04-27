import React, { Component } from 'react';

class Timer extends Component {
  state = {
    timerProgress: `${this.props.roundLength}:00`,
    paused: true
  }

  updateTimer(value) {
    this.setState({
      timerProgress: value
    });
  }

  renderButton() {
    if(this.state.paused) {
      return (
        <i className="material-icons md-80 md-green"
        onClick={this.startTimer.bind(this)}>
        play_circle_outline</i>
      );
    }

    return (
      <i className="material-icons md-80 md-red"
      onClick={this.startTimer.bind(this)}>
      pause_circle_outline</i>
    );
  }

  startTimer(duration) {
    let start = Date.now();
    let difference,
        minutes,
        seconds;

    this.setState({ paused: false });

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
  }

  render() {
    return(
    <div className="timer-container">
      <div className="timer-active">
        <div className="timer-circle">
          <div className="timer-text">{this.state.timerProgress}</div>
          {this.renderButton()}
        </div>
      </div> 
    </div>
  );
  }
}

export default Timer;
