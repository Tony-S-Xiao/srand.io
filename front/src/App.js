import React from 'react';
import Homepage from './components/Homepage';
import SingleCard from './components/SingleCard'
import {Jumbotron} from 'react-bootstrap';
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
        <Jumbotron style={{width: "60%", margin:"auto", padding:"3%"}}>
          <h1>What is Srand?</h1>
          <p>{data}</p>
          <h1>How it works</h1>
          <p>Srand.io is an aggregation service for random numbers. Our system relies on the randomness generated in the real world to generate random numbers. Third Party APIs
            such as OpenWeatherAPI, United State Geological Survey, Random.org etc. are all combined to generate our final output. 
            <br></br>
            <br></br>
            In addition to aggregating randomness, srand.io also uses different cyptographic random number generation schemes. These algorithms come from different standardization
            organizations and nation-states. Using aggregation, we are able to lower the risk of a compromised cyptographic RNG scheme. As long as one of the schemes is crytopgraphically secure, the final output will be as well.
          </p>
        </Jumbotron>

      </div>
    );
  }
}

export default App;