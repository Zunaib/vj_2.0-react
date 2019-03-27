import React, { Component } from 'react';
import classes from './Layout.css';
import Auxilary from '../Auxilary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBackDrop from '../../components/Navigation/Sidedrawer/NavBackDrop/NavBackDrop';
// import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';


class Layout extends Component {

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
            <Auxilary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                {/* <Sidedrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} /> */}
                <NavBackDrop show={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        );
    }
}

export default Layout;