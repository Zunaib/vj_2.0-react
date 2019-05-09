import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import LandingLayout from './hoc/Layout/LandingLayout';

const asyncWebLayout = asyncComponent(() => {
  return import('./hoc/Layout/WebLayout');
})

const asyncLogout = asyncComponent(() => {
  return import('./containers/Logout/Logout');
})

class App extends Component {


  componentDidMount = () => {
    console.log('mounted')
    if (this.props.isAuth) {
      this.props.onfetchsettings(this.props.isAuth);
    }
  }

  componentDidUpdate() {
    console.log('did upd')
    if (this.props.isAuth) {
      window.location.reload();
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


const mapDispatchToProps = dispatch => {
  return {
    onfetchsettings: (token) => dispatch(actions.FetchSettings(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);