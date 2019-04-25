import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './WebLayout.css';
import asyncComponent from '../asyncComponent/asyncComponent';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
// import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

import Dashboard from '../../containers/Dashboard/Dashboard';
import DesignerProfile from '../../containers/DesignerProfile/DesignerProfile'
import UserAccountSettings from '../../containers/UserAccountSettings/UserAccountSettings'
import Product from '../../containers/Handle_Product/Product_View/Product';
import Handle_Product from '../../containers/Handle_Product/Product_CRUD/Product';
import Cart from '../../containers/Cart/Cart';
import Checkout from '../../containers/Checkout/Checkout';
import CustomerOrder from '../../containers/CustomerOrder/CustomerOrder';


const asyncAlbum = asyncComponent(() => {
    return import('../../containers/Handle_Album/Album_View/Album');
})
const asyncHandle_Album = asyncComponent(() => {
    return import('../../containers/Handle_Album/Album_CRUD/Album');
})

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
                    <Route path="/dashboard/usersettings" component={UserAccountSettings} />
                    <Route path="/dashboard/cart" component={Cart} />
                    <Route path="/dashboard/checkout" component={Checkout} />
                    <Route path="/dashboard/customerorders" component={CustomerOrder} />
                    <Route path="/dashboard/designer" exact component={DesignerProfile} />
                    <Route path="/dashboard/usersettings" component={UserAccountSettings} />
                    <Route path="/dashboard/albums/:album" component={asyncAlbum} />
                    <Route path="/dashboard/products/:product" component={Product} />
                    <Route path="/dashboard/handle_album" component={asyncHandle_Album} />
                    <Route path="/dashboard/:albumid/handle_product" component={Handle_Product} />
                    <Route path="/dashboard/handle_product" component={Handle_Product} />
                    <Route path="/dashboard/designerorders" component={CustomerOrder} />
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
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.Auth.token,
        flag: state.Auth.flag
    }
}

export default connect(mapStateToProps, null)(WebLayout);