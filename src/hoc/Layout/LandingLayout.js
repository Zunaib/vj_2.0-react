import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBackDrop from '../../components/Navigation/Sidedrawer/NavBackDrop/NavBackDrop';

import LandingPage from '../../containers/LandingPage/LandingPage';
import Login from '../../containers/LogIn/Login';
import Signup from '../../containers/SignUp/SignUp';



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

        let routes = (
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    {/* <Redirect to="/" /> */}
                </Switch>
            );
        }

        return (
            <div>
                <Toolbar Type="Landing" drawerToggleClicked={this.sideDrawerToggleHandler} />
                <NavBackDrop show={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler} />
                <main>
                    {this.props.children}
                </main>
                {routes}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAuth: state.Auth.token
    }
}

export default connect(mapStateToProps, null)(LandingLayout);
