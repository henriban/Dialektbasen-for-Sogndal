import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/HomePage';
import Sociolinguistics from './components/home/Sociolinguistics';
import Database from './components/database/DatabasePage';
import Graph from './components/graph/GraphPage';

import Navbar from './components/Navbar';
import LogoNavbar from './components/LogoNavbar';
import Footer from './components/Footer';


class App extends Component {
  render() {
    return (
        <div>
          {/* <LogoNavbar /> */}
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/sosiolingvistikk' component={Sociolinguistics} />
            <Route path='/database' component={Database}/>
            <Route path='/graf' component={Graph}/>
          </Switch>
          <Footer />
        </div>
    );
  }
}

export default App;
