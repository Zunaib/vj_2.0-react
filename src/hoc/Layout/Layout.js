import React, { Component } from 'react';
import classes from './Layout.css';
import Auxilary from '../Auxilary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBackDrop from '../../components/Navigation/Sidedrawer/NavBackDrop/NavBackDrop';
// import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';


class Layout extends Component {

    state = {
        showSideDrawer: false,
        webToolBar: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    webPageToggleHandler = () => {
        this.setState((prevState) => {
            return { webToolBar: !prevState.webToolBar }
        });
    }
    landingPageToggleHandler = () => {
        this.setState((prevState) => {
            return { webToolBar: !prevState.webToolBar }
        });
    }


    render() {

        let layout = null;
        if (this.state.webToolBar) {
            layout = (
                <Auxilary>
                    <Toolbar Type="Web" drawerToggleClicked={this.sideDrawerToggleHandler} ToLandingToolbar={this.landingPageToggleHandler} />
                    {/* <Sidedrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        ToLandingToolbar={this.landingPageToggleHandler}

                    /> */}
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </Auxilary>
            );
        } else {
            layout = (
                <Auxilary>
                    <Toolbar Type="Landing" drawerToggleClicked={this.sideDrawerToggleHandler} ToWebToolbar={this.webPageToggleHandler} />
                    <NavBackDrop show={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler} ToWebToolbar={this.webPageToggleHandler} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </Auxilary>
            );
        }

        return (
            <Auxilary>
                {layout}
            </Auxilary>
        );
    }
}

export default Layout;