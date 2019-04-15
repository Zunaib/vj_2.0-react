import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
// import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

import Dashboard from '../../containers/Dashboard/Dashboard';
import TestUserProfileSeeting from '../../containers/UserAccountSettings/UserAccountSettings';
import DesignerProfile from '../../containers/DesignerProfile/DesignerProfile';

class WebLayout extends Component {

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
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/dashboard/testinguserprofile" component={TestUserProfileSeeting} />
                    <Route path="/dashboard/designerprofile" component={DesignerProfile} />
                    <Redirect to="/dashboard" />
                </Switch>
            );
        }

        return (
            <div>
                <Toolbar Type="Web" drawerToggleClicked={this.sideDrawerToggleHandler} />
                {/* <Sidedrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        ToLandingToolbar={this.landingPageToggleHandler}

                    /> */}
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

export default connect(mapStateToProps, null)(WebLayout);