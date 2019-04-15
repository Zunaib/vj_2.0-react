import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import WebLayout from './hoc/Layout/WebLayout';
import LandingLayout from './hoc/Layout/LandingLayout';
import Logout from './containers/Logout/Logout';



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
          <Route path="/dashboard" component={WebLayout} />
          <Route path='/logout' component={Logout} />
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
