import React, { Component } from 'react';
// import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import LandingPage from './containers/LandingPage/LandingPage';
// import SignUpPage from './containers/SignUp/SignUp';
// import LogInPage from './containers/LogIn/Login';
// import Dashboard from './containers/Dashboard/Dashboard';
// import TestUserProfileSeeting from './containers/UserAccountSettings/UserAccountSettings';
// import DesignerProfile from './containers/DesignerProfile/DesignerProfile';
import { Route, Switch, withRouter } from 'react-router-dom';


import WebLayout from './hoc/Layout/WebLayout';
import LandingLayout from './hoc/Layout/LandingLayout';



class App extends Component {



  // state = {
  //   location: this.props.location.pathname
  // }

  // // ...

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     this.onRouteChanged();
  //   }
  // }

  // onRouteChanged() {
  //   console.log("ROUTE CHANGED");
  // }



  render() {
    return (
      <div>
        {/* <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} /> */}


        {/* <Switch>
          <Layout  >
            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/login" exact component={LogInPage} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/testinguserprofile" exact component={TestUserProfileSeeting} />
            <Route path="/designerprofile" exact component={DesignerProfile} />
          </Layout>
        </Switch> */}


        <Switch>
          <Route path="/dashboard"  component={WebLayout} />
          <Route path="/"  component={LandingLayout} />
        </Switch>



      </div>
    );
  }
}

export default withRouter(App);
