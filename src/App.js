import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import LandingLayout from './hoc/Layout/LandingLayout';

const asyncWebLayout = asyncComponent(() => {
  return import('./hoc/Layout/WebLayout');
})

const asyncLogout = asyncComponent(() => {
  return import('./containers/Logout/Logout');
})

class App extends Component {

  render() {

    let routes = (
      <Switch>
        <Route path="/" component={LandingLayout} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={asyncWebLayout} />
          <Route path='/logout' component={asyncLogout} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    }

    return (
      <div>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.Auth.token
  }
}


export default connect(mapStateToProps, null)(App);
