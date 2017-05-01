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
      roundLength: 25,
      shortBreakLength: 5,
      longBreakLength: 25,
      currentRound: 1
    };
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

        <Timer />
        
        <Rounds currentRound={this.state.currentRound}/>

        <ResetButton />
      </div>
    );
  }
}

export default App;
