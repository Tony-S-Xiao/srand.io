import React from 'react';
import { Jumbotron, Image } from 'react-bootstrap';
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
                <Jumbotron title="Motivation" titlefontsize="24px" height="600px" style={{padding:"50px"}}>
                    <h1>Motivation</h1>
                    <div style={{width:"100%", margin: "auto"}}>
                        <Image src="https://imgs.xkcd.com/comics/random_number.png" style={{marginRight:'auto', marginLeft:'auto', width:"70%"}}></Image>
                    </div>
                    <p>
                    Source: xkcd.com/221
                    </p>
                    <p style={{textAlign:"justify"}}>
                    <p>
                    Srand.io seeks to improve the current schemes of random number generation. The current schemes roughly falls into three catagories:
                    </p>
                    <ol>
                        <li>Pseudo Random Number Generators(PRNG) - Algorithmic generation of random numbers standardized by institutions such as <a href="https://www.nist.gov/">NIST</a>.</li>
                        <li>True Random Number Generators(TRNG) - Hardware based generators that sample the environment for random noise such as <a href="http://random.org">random.org</a>.</li>
                        <li>Decentralized Beacons - Trustless and verifiable random numbers generation approachs such as <a href="https://drand.love/">drand</a>.</li>
                    </ol>
                Although these techniques are sufficient for most use cases, none of these technique exhibit all desired qualities of an RNG simultaneously.
                <br></br> PRNGs rely on trusting the underlying
                algorithms to generate unpredictable random numbers. A trust that has been broken by a probable <a href="https://en.wikipedia.org/wiki/Dual_EC_DRBG">NSA backdoor</a>.
                <br></br> TRNG hardware 
                solutions depend on the sampling rate of the hardware to generate random bits. High throughput hardware generators can be very expensive.
                <br></br> Decentralized beacons are a new technology.
                It is yet not clear if there are security issues with the decentralized approach. Decentralized beacons are also insufficient for high throughput applications.
                <br/>Srand.io attempts to solve all of these problems through aggregation.
                    </p>
                </Jumbotron>
                <Jumbotron title="Why Aggregate Random Numbers" titlefontsize="24px" height="600px" style={{padding:"50px"}}>
                    <h1>Why Aggregate</h1>
                    <p style={{textAlign:"justify"}}>The fundamental premise is to use the XOR operator to combine two random numbers into one random number.
                    This allows the desirable qualities of random numbers (uniforminess, unpredictability, security) to propagate to the final number. Using XOR operator
                    is a simple and effective to thwart any attempts at an attack by an adversary or render useless a backdoor in one of the RNG algorithms. 
                    </p>
                </Jumbotron>
            </div>
        );
    }
}