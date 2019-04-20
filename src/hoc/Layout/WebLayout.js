import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './WebLayout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
// import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

import Dashboard from '../../containers/Dashboard/Dashboard';
import TestUserProfileSeeting from '../../containers/UserAccountSettings/UserAccountSettings';
import DesignerProfile from '../../containers/DesignerProfile/DesignerProfile';
import Album from '../../containers/Handle_Album/Album_View/Album';
import Handle_Album from '../../containers/Handle_Album/Album_CRUD/Album';
import Product from '../../containers/Handle_Product/Product_View/Product';
import Handle_Product from '../../containers/Handle_Product/Product_CRUD/Product';
import Cart from '../../containers/Cart/Cart';

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
                    <Route path="/dashboard/usersettings" component={TestUserProfileSeeting} />
                    <Route path="/dashboard/designer" component={DesignerProfile} />
                    <Route path="/dashboard/albums/:album" component={Album} />
                    <Route path="/dashboard/products/:product" component={Product} />
                    <Route path="/dashboard/handle_album" component={Handle_Album} />
                    <Route path="/dashboard/handle_product" component={Handle_Product} />
                    <Route path="/dashboard/cart" component={Cart} />
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
                <main className={classes.Web}>
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