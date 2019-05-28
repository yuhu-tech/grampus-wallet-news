import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NewDetali from './pages/newDetail'
import NewList from './pages/newList'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={NewList} />
            <Route exact path='/detail' component={NewDetali} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
