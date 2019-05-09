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
import Vlog from '../../containers/Handle_Vlog/Vlog_View/Vlog';
import Handle_Vlog from '../../containers/Handle_Vlog/Vlog_CRUD/Vlog';
import Handle_Blog from '../../containers/Handle_Blog/Blog_CRUD/Blog';
import Cart from '../../containers/Cart/Cart';
import Checkout from '../../containers/Checkout/Checkout';
import CustomerOrder from '../../containers/CustomerOrder/CustomerOrder';
import DesignerOrder from '../../containers/DesignerOrder/DesignerOrder';


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
                    <Route path="/dashboard/designer" component={DesignerProfile} />
                    <Route path="/dashboard/usersettings" component={UserAccountSettings} />
                    <Route path="/dashboard/albums/:album" component={asyncAlbum} />
                    <Route path="/dashboard/products/:product" component={Product} />
                    <Route path="/dashboard/handle_album/add_album" component={asyncHandle_Album} />
                    <Route path="/dashboard/:albumid/handle_product" component={Handle_Product} />
                    <Route path="/dashboard/handle_product" component={Handle_Product} />
                    <Route path="/dashboard/vlogs/:vlog" component={Vlog} />
                    <Route path="/dashboard/handle_vlog/add_vlog" component={Handle_Vlog} />
                    <Route path="/dashboard/blogs/:blog" component={Vlog} />
                    <Route path="/dashboard/handle_blog/add_blog" component={Handle_Blog} />
                    <Route path="/dashboard/designerorders" component={DesignerOrder} />
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