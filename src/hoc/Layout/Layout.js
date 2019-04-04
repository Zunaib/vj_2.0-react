import React, { Component } from 'react';
import Auxilary from '../Auxilary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBackDrop from '../../components/Navigation/Sidedrawer/NavBackDrop/NavBackDrop';

// import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';


class Layout extends Component {

    state = {
        showSideDrawer: false,
        webToolBar: true,
        landingToolbar: false
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
            return { webToolBar: !prevState.webToolBar, landingToolbar: !prevState.landingToolbar }
        });
        localStorage.setItem("webToolBar", true);
        localStorage.setItem("landingToolbar", false);

    }
    landingPageToggleHandler = () => {
        this.setState((prevState) => {
            return { webToolBar: !prevState.webToolBar, landingToolbar: !prevState.landingToolbar }
        });
        localStorage.setItem("webToolBar", false);
        localStorage.setItem("landingToolbar", true);
    }

    // hydrateStateWithLocalStorage() {
    //     // for all items in state
    //     for (let key in this.state) {
    //         // if the key exists in localStorage
    //         if (localStorage.hasOwnProperty(key)) {
    //             // get the key's value from localStorage
    //             let value = localStorage.getItem(key);
    //             // parse the localStorage string and setState
    //             try {
    //                 value = JSON.parse(value);
    //                 this.setState({ [key]: value });
    //             } catch (e) {
    //                 // handle empty string
    //                 this.setState({ [key]: value });
    //             }
    //         }
    //     }
    // }


    // componentDidMount = () => {
    //     this.hydrateStateWithLocalStorage();
    // }


    render() {

        let layout = null;
        if (this.state.webToolBar) {
            layout = (
                <Auxilary>
                    <Toolbar Type="Web" drawerToggleClicked={this.sideDrawerToggleHandler}  />
                    {/* <Sidedrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        ToLandingToolbar={this.landingPageToggleHandler}

                    /> */}
                    <main>
                        {this.props.children}
                    </main>

                </Auxilary>
            );
        } else if (this.state.landingToolbar) {
            layout = (
                <Auxilary>
                    <Toolbar Type="Landing" drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <NavBackDrop show={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler} />
                    <main>
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