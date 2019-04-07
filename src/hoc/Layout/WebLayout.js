import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

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
                <Switch>
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/dashboard/testinguserprofile" component={TestUserProfileSeeting} />
                    <Route path="/dashboard/designerprofile" component={DesignerProfile} />
                </Switch>
            </div>
        )
    }
}

export default WebLayout;