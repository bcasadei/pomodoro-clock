import React, { Component } from 'react';
import ResetButton from './ResetButton';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerMinutes: props.roundLength,
      timerSeconds: 0,
      timerDegrees: 0,
      paused: true,
      currentTimer: 'round'
    };
  }

  componentWillReceiveProps(nextProps) {
    switch(this.state.currentTimer) {
      case 'round':
        this.setState({ 
          timerMinutes: nextProps.roundLength,
          timerSeconds: 0
        });
        break;
      case 'shortBreak':
        this.setState({ 
          timerMinutes: nextProps.shortBreakLength,
          timerSeconds: 0
        });
        break;
      default:
        this.setState({ 
          timerMinutes: nextProps.longBreakLength,
          timerSeconds: 0
        });
    }
  }

  pauseTimer() {
    this.setState({
      paused: true
    });

    clearInterval(this.timerID);
  }

  resetTimer() {
    this.pauseTimer();
    this.props.reset();

    this.setState({
      currentTimer: 'round',
      timerMinutes: this.props.roundLength,
      timerSeconds: 0,
      timerDegrees: 0,
    });
  }

  startTimer() {
    const start = Date.now();
    const { timerMinutes, timerSeconds, currentTimer } = this.state;

    this.setState({ paused: false });

    const timer = () => {
      const { timerDegrees } = this.state
      const difference = ((timerMinutes * 60) + timerSeconds) - ((Date.now() - start) / 1000 | 0);

      const minutes = (difference / 60) | 0;
      const seconds = (difference % 60) | 0;
      const degrees = timerDegrees <= 360 ? timerDegrees + 15 : 0;

      if(this.state.timerMinutes > 0 || this.state.timerSeconds > 0) {
        this.setState({
          timerMinutes: minutes,
          timerSeconds: seconds,
          timerDegrees: degrees
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
        this.props.toggleHeader();
        this.startTimer();
      }
      else if(currentTimer === 'round') {
        this.setState({
          timerMinutes: this.props.shortBreakLength,
          timerSeconds: 0,
          currentTimer: 'shortBreak'
        });
        clearInterval(this.timerID);
        this.props.toggleHeader();
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
        this.props.toggleHeader();
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
    const { timerMinutes, timerSeconds, timerDegrees } = this.state;

    return (
      <div style={{textAlign: 'center'}}>
        <div className={`timer-container ${this.props.isBreakTime()}`}>
          <div className="timer-active" style={{backgroundImage: `linear-gradient(${timerDegrees}deg, #7ED321 0%, transparent 100%)`}}>
            <div className="timer-circle">
              <div className="timer-text">
                {`${timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}:${timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}`}
              </div>
              {this.renderButton()}
            </div>
          </div>
      </div>
      <ResetButton resetTimer={() => this.resetTimer()}/>
     </div>
    );
  }
}

export default Timer;
