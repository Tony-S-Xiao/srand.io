import React from 'react';
import Homepage from './components/Homepage';
import SingleCard from './components/SingleCard'

let host_url = 'http://api.srand.io';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: ' '
    }
    this.timer = {};
  }
  componentDidMount() {
    fetch(host_url+'/random/1', {mode: 'cors'})
    .then(response=>response.json())
    .then(result=>this.setState({random: result.randomNumber[0]}));
    /*
    this.timer = setInterval(()=>{
      fetch(host_url+'/random/1', {mode: 'cors'})
      .then(response=>response.json())
      .then(result=>this.setState({random: result.randomNumber[0]}))
    }, 10000);
    */
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    let data = "At it's simplest, srand.io is a random number generation service. The difference being rather than rely on a single source of entropy, srand.io aggregates multiple sources of entropy in an effort to generate random bits with higher throughput that are less predictable and more trustworthy.";
    return (
      <div>
        <Homepage random={this.state.random}/>
        <SingleCard title="What is Srand.io?" titleFontSize="36px" height="300px">
          {data}
        </SingleCard>

      </div>
    );
  }
}

export default App;