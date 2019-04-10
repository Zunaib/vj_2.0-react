import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBackDrop from '../../components/Navigation/Sidedrawer/NavBackDrop/NavBackDrop';

import LandingPage from '../../containers/LandingPage/LandingPage';
import Login from '../../containers/LogIn/Login';
import Signup from '../../containers/SignUp/SignUp';
import Logout from '../../containers/Logout/Logout';



class LandingLayout extends Component {


    state = {
        showSideDrawer: false
    }


    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }


    render() {
        return (
            <div>
                <Toolbar Type="Landing" drawerToggleClicked={this.sideDrawerToggleHandler} />
                <NavBackDrop show={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler} />
                <main>
                    {this.props.children}
                </main>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/logout' component={Logout} />
                </Switch>
            </div>
        )
    }
}

export default LandingLayout;