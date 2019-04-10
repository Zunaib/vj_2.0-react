import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';


import WebLayout from './hoc/Layout/WebLayout';
import LandingLayout from './hoc/Layout/LandingLayout';



class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/dashboard" component={WebLayout} />
          <Route path="/" component={LandingLayout} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
