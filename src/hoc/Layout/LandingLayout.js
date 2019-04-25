import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../asyncComponent/asyncComponent';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBackDrop from '../../components/Navigation/Sidedrawer/NavBackDrop/NavBackDrop';

const asyncLanding = asyncComponent(() => {
    return import('../../containers/LandingPage/LandingPage');
})
const asyncLogin = asyncComponent(() => {
    return import('../../containers/LogIn/Login');
})
const asyncSignup = asyncComponent(() => {
    return import('../../containers/SignUp/SignUp');
})

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
                <Route exact path='/' component={asyncLanding} />
                <Route path='/login' component={asyncLogin} />
                <Route path='/signup' component={asyncSignup} />
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
