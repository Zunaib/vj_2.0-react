import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import LandingPage from './containers/LandingPage/LandingPage';
import SignUpPage from './containers/SignUp/SignUp';
import LogInPage from './containers/LogIn/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        {/* <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} /> */}
        <Layout>
          <Switch>
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/login" exact component={LogInPage} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/" exact component={LandingPage} />

          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
