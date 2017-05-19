import React, { Component } from 'react';
import '../style/App.css';
import Header from './Header';
import TimeAdjuster from './TimeAdjuster';
import Timer from './Timer';
import Rounds from './Rounds';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: 'Focus Time',
      roundLength: 25,
      shortBreakLength: 5,
      longBreakLength: 25,
      currentRound: 1
    };
  }

  increaseTimer(key, value) {
    if(value >= 1 && value <= 59) {
      this.setState({ [key]: value + 1 });
    }
    return;
  }

  decreaseTimer(key, value) {
    if(value >= 2 && value <= 60) {
      this.setState({ [key]: value - 1 });
    }
    return;
  }

  increaseCurrentRound() {
    const { currentRound } = this.state;

    if(currentRound === 4) {
      this.setState({ currentRound: 1 });
    }

    this.setState({ currentRound: currentRound + 1 });
  }

  toggleHeader() {
    switch(this.state.headerText) {
      case 'Focus Time':
        this.setState({ headerText: 'Break Time' });
        break;
      default:
        this.setState({ headerText: 'Focus Time' });
        break;
    }
  }

  reset() {
    this.setState({
      headerText: 'Focus Time',
      currentRound: 1
    });
  }
  
  render() {
    const { 
      roundLength, 
      shortBreakLength, 
      longBreakLength, 
      currentRound 
    } = this.state;

    return (
      <div className="container">
        <Header>
          {this.state.headerText}
        </Header>

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
          longBreakLength={longBreakLength}
          currentRound={currentRound}
          increaseCurrentRound={() => this.increaseCurrentRound()}
          toggleHeader={() => this.toggleHeader()}
          reset={() => this.reset()}
        />

        <Rounds currentRound={currentRound}/>
      </div>
    );
  }
}

export default App;
