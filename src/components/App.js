import React, { Component } from 'react';
import '../style/App.css';
import Header from './Header';
import TimeAdjuster from './TimeAdjuster';
import Rounds from './Rounds';
import ResetButton from './ResetButton';

class App extends Component {
  state = {
    headerText: 'Focus Time',
    roundLength: 25,
    shortBreakLength: 5,
    longBreakLength: 25,
    currentRound: 1,
    timerProgress: '25:00',
    paused: true
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  updateTimer(value) {
    this.setState({
      timerProgress: value
    });
  }

  // pauseTimer(value) {
  //   this.setState({ paused: {value} });
  //   console.log(this.state.paused);
  // }

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

    if(this.state.paused) {
        return;
    }
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

  render() {
    return (
      <div className="container">
        <Header headerText={this.state.headerText}/>

        <div className="row">
          <TimeAdjuster 
            initialValue={this.state.roundLength}
            timerName="Round" />
          <TimeAdjuster 
            initialValue={this.state.shortBreakLength}
            timerName="Short Break" />
          <TimeAdjuster
            initialValue={this.state.longBreakLength}
            timerName="Long Break" />
        </div>

        <div className="timer-container">
          <div className="timer-active">
            <div className="timer-circle">
              <div className="timer-text">{this.state.timerProgress}</div>
              {this.renderButton()}
            </div>
          </div> 
        </div>

        <Rounds currentRound={this.state.currentRound}/>

        <ResetButton />
      </div>
    );
  }
}

export default App;
