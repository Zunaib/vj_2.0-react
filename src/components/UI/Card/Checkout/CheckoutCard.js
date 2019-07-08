import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../Store/Actions/index';
import classes from './CheckoutCard.css';
import Switch from "react-switch";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import StripeCheckout from 'react-stripe-checkout';

class ProfileCard extends Component {
    constructor() {
        super();
        this.state = { checked: false, method: "cashondelivery" };
        this.handleChange = this.handleChange.bind(this);
        this.further = this.further.bind(this);
        this.handleToken = this.handleToken.bind(this);
    }

    handleChange(checked) {
        console.log(checked)
        this.setState({ checked });
        let saveDetails = checked;
        this.props.onsendtemporary(saveDetails)
    }

    onRadioChange = (value) => {
        if (value === "cashondelivery") {
            this.setState({ method: "cashondelivery" });
        } else {
            this.setState({ method: "card" });
        }
        this.props.setType(value)
    }

    handleToken(token, addresses) {
        this.further(token)
    }

    further = (token) => {
        this.props.pay(token)
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

                <div className={classes.PaymentOpt}>
                    <RadioGroup onChange={this.onRadioChange} value="cashondelivery">
                        <RadioButton rootColor={"grey"} pointColor={"purple"} value="cashondelivery">
                            Cash On Delivery
                        </RadioButton>
                        <RadioButton rootColor={"grey"} pointColor={"purple"} value="card">
                            Pay By Credit/Debit Card
                        </RadioButton>
                    </RadioGroup>
                </div>
                <div className={classes.Card}>
                    {this.state.method === "card" ?
                        <StripeCheckout
                            stripeKey="pk_test_GwopF1t42tQvpk8ktUgp6wIP00GP1ixPw6"
                            token={this.handleToken}
                        />
                        : null}
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