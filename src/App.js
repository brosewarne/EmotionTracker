import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';

import { HomePage } from './components/pages/home';
import { NotFound } from './components/pages/not_found';
import { Header } from './components/header/header';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
