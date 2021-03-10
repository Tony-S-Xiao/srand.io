import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App.js';
import Monitor from './components/Monitor';
import Api from './components/Api';
import About from './components/About';
import Header from './components/Header';
export default class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <Header></Header>
                <Switch>
                    <Route path="/" component={App} exact></Route>
                    <Route path="/api" component={Api} exact></Route>
                    <Route path="/monitor" component={Monitor} exact></Route>
                    <Route path="/about" component={About} exact></Route>                    
                </Switch>
            </BrowserRouter>
        );
    }
}