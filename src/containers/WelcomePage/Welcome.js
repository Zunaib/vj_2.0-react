import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { NavLink, Redirect } from 'react-router-dom';
import classes from './Welcome.css';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
// import Logo from '../../components/Logo/Logo';
import Auxilary from '../../hoc/Auxilary/Auxilary'
// import AlbumProducts from '../../../components/AlbumProducts/AlbumProducts';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
// import Snack from '../../../components/UI/SnackBar/Snackbar'


import Modal from '../../components/UI/WelcomeModal/Modal';
import ContinueForm from './ContinueForm/ContinueForm';

import Button from '../../components/UI/Button/Button';

class Welcome extends Component {

    state = {
        continueOpened: false,
        continurType: null
    }

    viewContinueHandler = (type) => {
        console.log(type)
        this.setState({ continueOpened: true, continurType: type })
    }
    hideContinueHandler = () => {
        this.setState({ continueOpened: false, continurType: null })
    }



    render() {

        let welcomeredirect = null;
        if (this.props.firstTimeLogin === "false") {
            console.log('in firsdt false')
            if (this.props.isCreator === "true") {
                console.log('red to de')
                welcomeredirect = <Redirect to='/dashboard/designer' />;
            } else {
                welcomeredirect = <Redirect to='/dashboard' />;

            }
        }
        return (
            <Auxilary>
                <Modal show={this.state.continueOpened} modalClosed={this.hideContinueHandler}>
                    <ContinueForm type={this.state.continurType} />
                </Modal>
                <div className={classes.Main}>
                    {welcomeredirect}
                    <div className={classes.Album}>
                        <div className={classes.Welcome}>
                            <h1>Welcome To Vogue Junction</h1>
                        </div>
                        <h2>What Would You Like To Be ?</h2>
                        <div className={classes.Album_Top}>
                            <div className={classes.ContinueCustomer}>
                                <h1>Proceed As Customer</h1>
                                <div className={classes.CustomerFeatures}>
                                    <h5 style={{ backgroundColor: "#034f84" }}>View Products</h5>
                                    <h5 style={{ backgroundColor: "#7e4a35" }}>Like Products</h5>
                                    <h5 style={{ backgroundColor: "#5b9aa0" }}>Favorite Products</h5>
                                    <h5 style={{ backgroundColor: "#50394c" }}>Comment on Products</h5>
                                    <h5 style={{ backgroundColor: "#c83349" }}>Buy Products</h5>
                                    <h5 style={{ backgroundColor: "#034f84" }}>View Blogs, Vlogs</h5>
                                    <h5 style={{ backgroundColor: "#ff7b25" }}>Like Blogs, Vlogs</h5>
                                    <h5 style={{ backgroundColor: "#405d27" }}>Comment on Blogs, Vlogs</h5>
                                    <h5 style={{ backgroundColor: "#50394c" }}>Search Across Site</h5>
                                    <h5 style={{ backgroundColor: "#454140" }}>Follow Creators</h5>
                                    <h5 style={{ backgroundColor: "#c1502e" }}>Contact Other People</h5>
                                </div>
                                <Button btnType="WebButton" clicked={() => this.viewContinueHandler("customer")}>Customer
                            <i className="fas fa-arrow-right"></i>
                                </Button>
                            </div>
                            <div className={classes.ContinueCreator}>
                                <h1>Proceed As Creator</h1>
                                <div className={classes.DesignerFeatures}>
                                    <h5 style={{ backgroundColor: "#50394c" }}>Add New Albums</h5>
                                    <h5 style={{ backgroundColor: "#7e4a35" }}>Manage Albums</h5>
                                    <h5 style={{ backgroundColor: "#034f84" }}>Add New Product</h5>
                                    <h5 style={{ backgroundColor: "#50394c" }}>Manage Products</h5>
                                    <h5 style={{ backgroundColor: "#454140" }}>Add New Blogs</h5>
                                    <h5 style={{ backgroundColor: "#c83349" }}>Manage Blogs</h5>
                                    <h5 style={{ backgroundColor: " #82b74b" }}>Add New Vlogs</h5>
                                    <h5 style={{ backgroundColor: "#ff7b25" }}>Manage Vlogs</h5>
                                    <h5 style={{ backgroundColor: "#454140" }}>View Personal Vlogs, Blogs, Products, Albums</h5>
                                    <h5 style={{ backgroundColor: "#7e4a35" }}>Follow Other Creators</h5>
                                    <h5 style={{ backgroundColor: "#d64161" }}>Contact Other People</h5>
                                </div>
                                <Button btnType="WebButton" clicked={() => this.viewContinueHandler("creator")}>
                                    Creator Profile
                            <i className="fas fa-arrow-right"></i>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </Auxilary>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        isCreator: state.Auth.creator,
        firstTimeLogin: state.Auth.firstTimeLogin
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changetoCustomer: (token) => dispatch(actions.UseAsCustomer(token)),
        changetoCreator: (token) => dispatch(actions.UseAsCreator(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
