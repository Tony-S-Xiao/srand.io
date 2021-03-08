import React from 'react';
import { Jumbotron } from 'react-bootstrap';
export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    render() {
        return (
            <div style={{width:"1000px", margin: "auto"}}>
                <Jumbotron title="The Problem With Current RNGs" titleFontSize="24px" height="600px">
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
                </Jumbotron>
            </div>
        );
    }
}