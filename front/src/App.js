import React from 'react';
import Homepage from './components/Homepage';

let host_url = 'http://ec2-34-222-50-125.us-west-2.compute.amazonaws.com';
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
      console.log(123);
      fetch(host_url+'/random/1', {mode: 'cors'})
      .then(response=>response.text())
      .then(result=>this.setState({random: result}));
    }, 10000);
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