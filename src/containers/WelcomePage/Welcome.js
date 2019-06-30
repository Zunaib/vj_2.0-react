import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { NavLink, Redirect } from 'react-router-dom';
import classes from './Welcome.css';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
// import Logo from '../../components/Logo/Logo';
// import Auxilary from '../../../hoc/Auxilary/Auxilary'
// import AlbumProducts from '../../../components/AlbumProducts/AlbumProducts';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
// import Snack from '../../../components/UI/SnackBar/Snackbar'

import Button from '../../components/UI/Button/Button';

class Welcome extends Component {

    continueasCustomer = () => {
        console.log('cust')
        this.props.changetoCustomer(this.props.token)
    }

    continueasCreator = () => {
        console.log('create')
        this.props.changetoCreator(this.props.token)
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
                                <h5>View Products</h5>
                                <h5>Buy Products</h5>
                                <h5>View Vlogs</h5>
                                <h5>View Blogs</h5>
                                <h5>Fashion Updates</h5>
                                <h5>Follow Creators</h5>
                                <h5>Contact Other People</h5>
                            </div>
                            <Button btnType="WebButton" clicked={this.continueasCustomer}>Customer</Button>
                        </div>
                        <div className={classes.ContinueCreator}>
                            <h1>Proceed As Creator</h1>
                            <div className={classes.DesignerFeatures}>
                                <h5>View Products</h5>
                                <h5>Buy Products</h5>
                                <h5>View Vlogs</h5>
                                <h5>View Blogs</h5>
                                <h5>Fashion Updates</h5>
                                <h5>Follow Creators</h5>
                                <h5>Contact Other People</h5>
                            </div>
                            <Button btnType="WebButton" clicked={this.continueasCreator}>Creator Profile</Button>
                        </div>
                    </div>

                </div>
            </div>
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
