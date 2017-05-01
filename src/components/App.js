import React, { Component } from 'react';
import '../style/App.css';
import Header from './Header';
import TimeAdjuster from './TimeAdjuster';
import Timer from './Timer';
import Rounds from './Rounds';
import ResetButton from './ResetButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: 'Focus Time',
      roundLength: 20,
      shortBreakLength: 5,
      longBreakLength: 25,
      currentRound: 1,
      currentTimer: 'round'
    };
  }

  increaseTimer(key, value) {
    this.setState({
      [key]: value + 1
    });
  }

  decreaseTimer(key, value) {
    this.setState({
      [key]: value - 1
    });
  }
  

  render() {
    const { roundLength, shortBreakLength, longBreakLength } = this.state;

    return (
      <div className="container">
        <Header headerText={this.state.headerText}/>

        <div className="row">
          <TimeAdjuster 
            value={roundLength}
            timerName="Round" 
            increaseTimer={() => this.increaseTimer("roundLength", roundLength)}
            decreaseTimer={() => this.decreaseTimer("roundLength", roundLength)} />
          <TimeAdjuster 
            value={shortBreakLength}
            timerName="Short Break"
            increaseTimer={() => this.increaseTimer("shortBreakLength", shortBreakLength)}
            decreaseTimer={() => this.decreaseTimer("shortBreakLength", shortBreakLength)}  />
          <TimeAdjuster
            value={longBreakLength}
            timerName="Long Break"
            increaseTimer={() => this.increaseTimer("longBreakLength", longBreakLength)}
            decreaseTimer={() => this.decreaseTimer("longBreakLength", longBreakLength)} />
        </div>

        <Timer
          roundLength={roundLength}
          shortBreakLength={shortBreakLength}
          longBreakLength={longBreakLength} />

        <Rounds currentRound={this.state.currentRound}/>

        <ResetButton />
      </div>
    );
  }
}

export default App;
