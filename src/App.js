import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import LandingLayout from './hoc/Layout/LandingLayout';
import Welcome from './containers/WelcomePage/Welcome';


const asyncWebLayout = asyncComponent(() => {
  return import('./hoc/Layout/WebLayout');
})

const asyncLogout = asyncComponent(() => {
  return import('./containers/Logout/Logout');
})

class App extends Component {


  componentDidMount = () => {
    if (this.props.isAuth) {
      this.props.onfetchsettings(this.props.isAuth);
    }
  }

  componentDidUpdate() {
    if (this.props.isAuth) {
      window.location.reload()
    }
  }


  render() {

    let routes = (
      <Switch>
        <Route path="/" component={LandingLayout} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      if (this.props.firstTimeLogin === "true") {
        routes = (
          <Switch>
            <Route path='/welcome' component={Welcome} />
            <Route path='/logout' component={asyncLogout} />
            <Redirect to="/welcome" />
          </Switch>
        );
      } else {
        routes = (
          <Switch>
            <Route path="/dashboard" component={asyncWebLayout} />
            <Route path='/logout' component={asyncLogout} />
            <Redirect to="/dashboard" />
          </Switch>
        );
      }
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
    isAuth: state.Auth.token,
    firstTimeLogin: state.Auth.firstTimeLogin,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onfetchsettings: (token) => dispatch(actions.FetchSettings(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);