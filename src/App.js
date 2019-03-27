import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import LandingPage from './containers/LandingPage/LandingPage';
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
            <Route path="/" exact component={LandingPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
