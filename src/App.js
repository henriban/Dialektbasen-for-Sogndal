import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/HomePage';
import Sociolinguistics from './components/home/Sociolinguistics';
import Database from './components/database/DatabasePage';
import Graph from './components/graph/GraphPage';

// import Navbar from './components/Navbar';
import LogoNavbar from './components/LogoNavbar';
import Footer from './components/Footer';

import InternetExplorerError from './components/InternetExplorerError';

class App extends Component {
  render() {

    let isIE = navigator.userAgent.indexOf('MSIE') !== -1 
      || navigator.appVersion.indexOf('Trident/') > -1

    if(isIE){
      return <InternetExplorerError />
    }

    return (
        <div className="app"> 
            <LogoNavbar />
            {/* <Navbar/> */}
            <div className="content">
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path='/sosiolingvistikk' component={Sociolinguistics} />
                  <Route path='/database' component={Database}/>
                  <Route path='/graf' component={Graph}/>
              </Switch>
            </div>
            <Footer />
        </div>
    );
  }
}

export default App;
