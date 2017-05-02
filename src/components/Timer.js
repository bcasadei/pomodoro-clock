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

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      timerMinutes: nextProps.roundLength,
      timerSeconds: 0
    });
  }

  pauseTimer() {
    this.setState({
      paused: true
    });

    clearInterval(this.timerID);
  }

  startTimer() {
    const start = Date.now();
    const { timerMinutes, timerSeconds, currentTimer } = this.state;

    this.setState({ paused: false });

    const timer = () => {
      let difference = ((timerMinutes * 60) + timerSeconds) - ((Date.now() - start) / 1000 | 0);

      let minutes = (difference / 60) | 0;
      let seconds = (difference % 60) | 0;

      if(this.state.timerMinutes > 0 || this.state.timerSeconds > 0) {
        this.setState({
          timerMinutes: minutes,
          timerSeconds: seconds
        });
      }
      else if(currentTimer === 'round' && 
              this.props.currentRound === 4) {
        this.setState({
          timerMinutes: this.props.longBreakLength,
          timerSeconds: 0,
          currentTimer: 'longBreak'
        });
        clearInterval(this.timerID);
        this.startTimer();
      }
      else if(currentTimer === 'round') {
        this.setState({
          timerMinutes: this.props.shortBreakLength,
          timerSeconds: 0,
          currentTimer: 'shortBreak'
        });
        clearInterval(this.timerID);
        this.startTimer();
      }
      else {
        this.setState({
          timerMinutes: this.props.roundLength,
          timerSeconds: 0,
          currentTimer: 'round'
        });
        clearInterval(this.timerID);
        this.props.increaseCurrentRound();
        this.startTimer();
      }
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
              {`${timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}:${timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}`}
            </div>
            {this.renderButton()}
          </div>
        </div> 
     </div>
    );
  }
}

export default Timer;
