import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from '../asyncComponent/asyncComponent';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBackDrop from '../../components/Navigation/Sidedrawer/NavBackDrop/NavBackDrop';
import LandingPage from '../../containers/LandingPage/LandingPage';
import LoginPage from '../../containers/LogIn/Login';
import SignUpPage from '../../containers/SignUp/SignUp';

class LandingLayout extends Component {

    constructor(props) {
        super(props)
        this.aboutRef = React.createRef()
        this.scrollToAbout = this.scrollToAbout.bind(this)

        this.missionRef = React.createRef()
        this.scrollToMission = this.scrollToMission.bind(this)

        this.contactUsRef = React.createRef()
        this.scrollTocontactUs = this.scrollTocontactUs.bind(this)

    }

    scrollToAbout() {
        window.scrollTo(0, this.aboutRef.current.offsetTop)
    }

    scrollToMission() {
        window.scrollTo(0, this.missionRef.current.offsetTop)
    }

    scrollTocontactUs() {
        window.scrollTo(0, this.contactUsRef.current.offsetTop)
    }


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
                <Toolbar Type="Landing" drawerToggleClicked={this.sideDrawerToggleHandler}
                    scrollToAbout={this.scrollToAbout}
                    scrollToMission={this.scrollToMission} />
                <NavBackDrop show={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler} />
                <main>
                    {this.props.children}
                </main>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(routeProps) => (
                            <LandingPage {...routeProps}
                                aboutRefProp={this.aboutRef}
                                missionRefProp={this.missionRef}
                                contactUsRefProp={this.contactUsRef}
                                scrollToContactUs={this.scrollTocontactUs} />
                        )}
                    />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/signup' component={SignUpPage} />
                    <Redirect to="/" />
                </Switch>
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
