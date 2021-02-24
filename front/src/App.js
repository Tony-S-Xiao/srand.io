import React from 'react';
import Homepage from './components/Homepage';

let host_url = 'https://sleepy-depths-42839.herokuapp.com/';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: ' '
    }
    this.timer = {};
  }
  componentDidMount() {
    this.timer = setInterval(()=>{
      fetch(host_url+'random/p=1', {mode: 'cors'})
      .then(response=>response.json())
      .then(result=>this.setState({random: result}));
    }, 4000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (
      <div>
        <Homepage random={this.state.random}/>
      </div>
    );
  }
}

export default App;