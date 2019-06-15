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
import ViewProduct from '../../containers/Handle_Product/Product_View/Product';
import Add_Product from '../../containers/Handle_Product/Product_Add/Product';
import Update_Product from '../../containers/Handle_Product/Product_Update/Product_Update';
import Vlog from '../../containers/Handle_Vlog/Vlog_View/Vlog';
import Handle_Vlog from '../../containers/Handle_Vlog/Vlog_Add/Vlog';
import Add_Blog from '../../containers/Handle_Blog/Blog_Add/Blog';
import View_Blog from '../../containers/Handle_Blog/Blog_View/Blog_View';
import Cart from '../../containers/Cart/Cart';
import Checkout from '../../containers/Checkout/Checkout';
import CustomerOrder from '../../containers/CustomerOrder/CustomerOrder';
import DesignerOrder from '../../containers/DesignerOrder/DesignerOrder';
import Messenger from '../../containers/Messenger/Messenger'


import UpdateAlbum from '../../containers/Handle_Album/Album_Update/AlbumUpdate';
import UpdateBlog from '../../containers/Handle_Blog/Blog_Update/Blog_Update';
import UpdateVlog from '../../containers/Handle_Vlog/Vlog_Update/Vlog_Update';


const asyncAlbum = asyncComponent(() => {
    return import('../../containers/Handle_Album/Album_View/Album');
})
const asyncHandle_Album = asyncComponent(() => {
    return import('../../containers/Handle_Album/Album_Add/Album');
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
            if (this.props.isCreator === "true") {
                routes = (
                    <Switch>
                        <Route path="/dashboard/messenger" component={Messenger} />
                        <Route path="/dashboard/usersettings" component={UserAccountSettings} />
                        <Route path="/dashboard/designer" component={DesignerProfile} />
                        <Route path="/dashboard/albums/:album" component={asyncAlbum} />
                        <Route path="/dashboard/products/:product" component={ViewProduct} />
                        <Route path="/dashboard/handle_album/add_album" component={asyncHandle_Album} />
                        <Route path="/dashboard/:albumid/handle_product" component={Add_Product} />
                        <Route path="/dashboard/handle_product/add_product" component={Add_Product} />
                        <Route path="/dashboard/vlogs/:vlog" component={Vlog} />
                        <Route path="/dashboard/handle_vlog/add_vlog" component={Handle_Vlog} />
                        <Route path="/dashboard/blogs/:blog" component={View_Blog} />
                        <Route path="/dashboard/handle_blog/add_blog" component={Add_Blog} />
                        <Route path="/dashboard/designerorders" component={DesignerOrder} />
                        <Route path="/dashboard/handle_album/update_album/:id" component={UpdateAlbum} />
                        <Route path="/dashboard/handle_product/update_product/:id" component={Update_Product} />
                        <Route path="/dashboard/handle_blog/update_blog/:id" component={UpdateBlog} />
                        <Route path="/dashboard/handle_vlog/update_vlog/:id" component={UpdateVlog} />
                        <Redirect to="/dashboard/designer" />
                    </Switch>
                );
            } else {
                routes = (
                    <Switch>
                        <Route path="/dashboard/messenger" component={Messenger} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/dashboard/usersettings" component={UserAccountSettings} />
                        <Route path="/dashboard/cart" component={Cart} />
                        <Route path="/dashboard/checkout" component={Checkout} />
                        <Route path="/dashboard/customerorders" component={CustomerOrder} />
                        <Route path="/dashboard/products/:product" component={ViewProduct} />
                        <Route path="/dashboard/albums/:album" component={asyncAlbum} />
                        <Route path="/dashboard/vlogs/:vlog" component={Vlog} />
                        <Route path="/dashboard/blogs/:blog" component={View_Blog} />
                        <Redirect to="/dashboard" />
                    </Switch>
                );
            }
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
        isAuth: state.Auth.token,
        isCreator: state.Auth.creator,
    }
}


export default connect(mapStateToProps, null)(WebLayout);