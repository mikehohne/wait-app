import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'


// componenet imports
import Navigation from './components/Navigation'
import Form from './components/Form'



class App extends Component {



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navigation />
          {/* <img src="http://quomo.org/clients/thecomplex/wp-content/uploads/2012/04/Wait-website-logo2.png" className="App-logo" alt="logo" /> */}
        </header>
        <Form />
      </div>
    );
  }
}

export default App;
