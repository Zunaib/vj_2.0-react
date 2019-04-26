import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../Store/Actions/index';
import classes from './CheckoutCard.css';
import Switch from "react-switch";
class ProfileCard extends Component {
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        console.log(checked)
        this.setState({ checked });
        let saveDetails = checked;
        this.props.onsendtemporary(saveDetails)
    }
    render() {
        return (
            <div className={classes.ProfileCard} >
                <div className={classes.AdpayTop}>
                    <h3>Address Options</h3>
                </div>
                <h4><b>Save These Details To Profile</b></h4>

                <label htmlFor="material-switch">
                    <Switch
                        checked={this.state.checked}
                        onChange={this.handleChange}
                        onColor="#d01cd6"
                        onHandleColor="#841088"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                    />
                </label>

                <div className={classes.AdpayBottom}>
                    <h3>Payment Options</h3>
                </div>

                <label>
                    <input
                        type="radio"
                        name="react-tips"
                        value="Cash On Delivery"
                        defaultChecked
                        className="form-check-input"
                    />
                    Cash On Delivery
                </label>
                <div className={classes.Disc}>
                    <h4>We Currently Only Support Cash on Delivery. Further Payment Methods Are In Upcoming Updates.</h4>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onsendtemporary: (saveDetails) => dispatch(actions.SetTemporary(saveDetails))
    }
}


export default connect(null, mapDispatchToProps)(ProfileCard);