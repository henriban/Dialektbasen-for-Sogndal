import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/HomePage';
import Database from './components/database/DatabasePage';
import Graph from './components/graph/GraphPage';

import Navbar from './components/Navbar';


class App extends Component {
  render() {
    return (
        <div>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/database' component={Database}/>
            <Route path='/graf' component={Graph}/>
          </Switch>
          {/*<Footer />*/}
        </div>
    );
  }
}

export default App;
