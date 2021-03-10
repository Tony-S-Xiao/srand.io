import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import EndpointDocumentation from './EndpointDocumentation';
import CodeExample from './CodeExample';
import JSONPretty from 'react-json-pretty';
export default class Api extends React.Component {
    constructor(props) {
        super(props);
    }

    copyToClipboard(string_to_copy) {
        let copy_text = document.getElementById('copy-helper');
        copy_text.type = 'text';
        copy_text.value = string_to_copy;
        copy_text.select();
        document.execCommand("copy");
        copy_text.type = 'hidden';
    };

    render() {
        let code_example1=`{"randomNumber":["f141853b46f5514269a4acaae9db1989b0c869e076ab166ed87f1d788b1cfcd4",
        "76b4853e40899e60ae881f9dd65625d7e85aaedae007b622b159aff8d3d4e55e",
        "b900348a5289ab4b89a0318250c9ed7cb6204b40f1682c2bebcd7db3125b9859"]}`;
        let code_example2 = `{"consecZeros":[{"runLength":1,"runCount":53387},{"runLength":2,"runCount":26883},
        {"runLength":3,"runCount":13516},{"runLength":4,"runCount":6756},{"runLength":5,"runCount":3399},
        {"runLength":6,"runCount":1607},{"runLength":7,"runCount":884},{"runLength":8,"runCount":449},
        {"runLength":9,"runCount":192},{"runLength":10,"runCount":107},{"runLength":11,"runCount":51},
        {"runLength":12,"runCount":24},{"runLength":13,"runCount":11},{"runLength":14,"runCount":6},
        {"runLength":15,"runCount":4},{"runLength":16,"runCount":1},{"runLength":17,"runCount":1}]}`;
        let code_example3 =`{"percentage":0.5021410826359832}`;
        return (
            <div>
                <Jumbotron style={{width:'1000px', margin:'auto', padding:'50px'}}>
                    <h1>HTTP API Reference</h1>
                    <p>
                    Endpoint: http://api.srand.io
                    </p>
                    <p>
                    The following calls to the API can be made. These API either returns the desired amount random bits or provides
                    statistical information about the entropy gathered in the past day. All parameters are required. Data is given in JSON format. 
                    </p>
                    <br></br>
                    <EndpointDocumentation endpoint="/random/INTEGER" 
                    description="This method returns the desired amount of random bits in 32 byte blocks. Random bits are given in hexadecimal format."
                    titleClickHandle={this.copyToClipboard}
                    arguments={[{name:'INTEGER', description: 'The number of 32 byte blocks desired. Must be an integer between 1 and 8.'}]}
                    ></EndpointDocumentation>
                    <p>
                    Example:
                    <br></br>
                    To get 768 random bits, use the following API call.
                    </p>
                    <CodeExample>
                        {"http://api.srand.io/random/3"}
                    </CodeExample>
                    <br></br>
                    <p>
                    Response:
                    </p>
                    <CodeExample>
                        <JSONPretty id="json-pretty" data={code_example1}></JSONPretty>
                    </CodeExample>
                    <br></br>

                    <EndpointDocumentation endpoint="/stats/zero-percentage/INTEGER" 
                    description="This method returns the percentage of zeros in the entropy gathered in the past few hours."
                    titleClickHandle={this.copyToClipboard}
                    arguments={[{name:'INTEGER', description: 'The number of hours to include. Must be an integer between 1 and 24.'}]}
                    ></EndpointDocumentation>
                    <p>
                    Example:
                    <br></br>
                    To get percentage of zeros for the last 12 hours, use the following API call.
                    </p>
                    <CodeExample>
                        {"http://api.srand.io/stats/zero-percentage/12"}
                    </CodeExample>
                    <br></br>
                    <p>
                    Response and Interpretation:
                    </p>
                    In the last 12 hours of entropy collection, approximately 50.2% of the bits obtained were zeros.
                    <CodeExample>
                        <JSONPretty id="json-pretty" data={code_example3}></JSONPretty>
                    </CodeExample>
                    <br></br>
                    <EndpointDocumentation endpoint="/stats/zero-runs/INTEGER" 
                    description="This method returns a histogram of groups of consecutive zeros and their frequency in the entropy gathered in the past few hours."
                    titleClickHandle={this.copyToClipboard}
                    arguments={[{name:'INTEGER', description: 'The number of hours to include. Must be an integer between 1 and 24.'}]}
                    ></EndpointDocumentation>
                    <p>
                    Example:
                    <br></br>
                    To get histogram for the last 12 hours, use the following API call.
                    </p>
                    <CodeExample>
                        {"http://api.srand.io/stats/zero-runs/12"}
                    </CodeExample>
                    <br></br>
                    <p>
                    Response and Interpretation:
                    </p>
                    In the last 12 hours of entropy collection,
                    there were 53387 groups of consecutive zeros with a length of 1, 26883 groups of consecutive zeros with a length of 2, 13516 groups of consecutive zeros with a length of 3... etc.
                    <CodeExample>
                        <JSONPretty id="json-pretty" data={code_example2}></JSONPretty>
                    </CodeExample>
                    <br></br>
                </Jumbotron>
            </div>
            
        );
    }
}