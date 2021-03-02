import React from 'react';
import Homepage from './components/Homepage';
import SingleCard from './components/SingleCard'
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
      this.setState({random: Math.random()});
      /*
      fetch(host_url+'/random/1', {mode: 'cors'})
      .then(response=>response.text())
      .then(result=>this.setState({random: result}));*/
    }, 10000);
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
        <SingleCard title="The Problem With Current RNGs" titleFontSize="24px" height="600px">
          {"Current techniques for generating random numbers fall into a few categories:"}
          <ol>
            <li>Pseudo Random Number Generators(PRNG) - Algorithmic generation of random numbers standardized by institutions such as <a href="https://www.nist.gov/">NIST</a>.</li>
            <li>True Random Number Generators(TRNG) - Hardware based generators that sample the environment for random noise such as <a href="http://random.org">random.org</a>.</li>
            <li>Decentralized Beacons - Trustless and verifiable random numbers generation approachs such as <a href="https://drand.love/">drand</a>.</li>
          </ol>
        Although these techniques are sufficient for most use cases, none of these technique exhibit all desired qualities of an RNG simultaneously. PRNGs rely on trusting the underlying
        algorithms to generate unpredictable random numbers. A trust that has been broken by a probable <a href="https://en.wikipedia.org/wiki/Dual_EC_DRBG">NSA backdoor</a>. TRNG hardware 
        solutions depend on the sampling rate of the hardware to generate random bits. High throughput hardware generators can be very expensive. Decentralized beacons are a new technology.
         It is yet not clear if there are security issues with the decentralized approach. Decentralized beacons are also insufficient for high throughput applications.
         <br/>Srand.io solves all of these problems through aggregation.
        </SingleCard>
      </div>
    );
  }
}

export default App;