import React from 'react';
import Header from './components/Header';
import RandomNumberDisplay from './components/RandomNumberDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: 1
    }
    this.timer = {};
  }
  componentDidMount() {
    this.timer = setInterval(function() {
      this.setState({random: this.state.random+1});
      console.log(this.state.random);
    }.bind(this)
    , 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (
      <div>
        <Header/>
        <RandomNumberDisplay random={this.state.random}></RandomNumberDisplay>
      </div>
    );
  }
}

export default App;