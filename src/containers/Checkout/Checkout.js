import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../Store/Actions/index';
import classes from './Checkout.css';

// import Snackbar from '../../components/UI/SnackBar/SuccessSnackbar';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import CheckoutCard from '../../components/UI/Card/Checkout/CheckoutCard';
import FormCard from '../../components/UI/Card/Form/FormCard';
import { checkValidity } from '../../Shared/Validator';
class Checkout extends Component {

    componentDidMount = () => {
        if (this.props.token) {
            this.props.onfetchcheckoutsettings(this.props.token);
            this.props.onfetchcheckoutcart(this.props.token);
            this.getData();
        }
    }

    getData() {
        setTimeout(() => {

            const updatedcheckoutForm = {
                ...this.state.checkoutForm
            };

            const formElements = ['firstName', 'lastName', 'streetAddress', 'city',
                'zipcode', 'province', 'country', 'phone'];


            for (let i = 0; i < formElements.length; i++) {
                const updatedFormElement = {
                    ...updatedcheckoutForm[formElements[i]]
                };

                let target = formElements[i];

                if (this.props.settings[0][target] === null) {
                    updatedFormElement.value = "";
                    updatedFormElement.valid = false;
                    updatedFormElement.touched = false;
                } else {
                    updatedFormElement.value = this.props.settings[0][target];
                    updatedFormElement.valid = true;
                    updatedFormElement.touched = true;
                }

                updatedcheckoutForm[formElements[i]] = updatedFormElement;
            }

            let formIsValid = true;
            for (let inputIdentifier in updatedcheckoutForm) {
                formIsValid = updatedcheckoutForm[inputIdentifier].valid && formIsValid;
            }
            this.setState({ checkoutForm: updatedcheckoutForm, formIsValid: formIsValid });
        }, 500)

    }

    state = {
        checkoutForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name Here'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name Here'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            streetAddress: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            province: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Province'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '03XX-XXXXXXX'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        redirect: null,
        type: "cashondelivery"
        // userName: "",
        // // desc: "",
        // selectedFile: null,
        // selectedFileURL: null
    }

    checkoutHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.checkoutForm) {
            formData[formElementIdentifier] = this.state.checkoutForm[formElementIdentifier].value;
        }


        let order = {
            orderedProducts: this.props.cart,
            total: 6000,
            billingDetails: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                province: formData.province,
                streetAddress: formData.streetAddress,
                city: formData.city,
                zipcode: formData.zipcode,
                country: formData.country,
                phone: formData.phone
            },
            saveDetails: this.props.saveDetails,
            paymentMethod: 'Cash On Delivery'
        }

        console.log(order)

        if (this.state.formIsValid) {
            if (this.state.type === "cashondelivery") {
                this.props.oncheckout(this.props.token, order);
            }
            console.log('valid')
        } else {
            console.log('Invalid')
        }

        this.setState({ redirect: <Redirect to="/dashboard/customerorders" /> })

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedcheckoutForm = {
            ...this.state.checkoutForm
        };
        const updatedFormElement = {
            ...updatedcheckoutForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedcheckoutForm[inputIdentifier] = updatedFormElement;

        let formIsValid = false;
        for (let inputIdentifier in updatedcheckoutForm) {
            formIsValid = updatedcheckoutForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid)
        this.setState({ checkoutForm: updatedcheckoutForm, formIsValid: formIsValid });
    }

    settype = (type) => {
        this.setState({ type: type })
    }

    paywithCard = (cardtoken) => {
        const formData = {};
        for (let formElementIdentifier in this.state.checkoutForm) {
            formData[formElementIdentifier] = this.state.checkoutForm[formElementIdentifier].value;
        }
        let order = {
            orderedProducts: this.props.cart,
            total: 6000,
            billingDetails: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                province: formData.province,
                streetAddress: formData.streetAddress,
                city: formData.city,
                zipcode: formData.zipcode,
                country: formData.country,
                phone: formData.phone
            },
            saveDetails: this.props.saveDetails,
            paymentMethod: 'Pay By Card'
        }

        let carddetails = {
            total: 6000,
            firstName: formData.firstName,
            lastName: formData.lastName,
            province: formData.province,
            streetAddress: formData.streetAddress,
            city: formData.city,
            zipcode: formData.zipcode,
            country: formData.country,
            phone: formData.phone

        }

        console.log(order)

        if (this.state.formIsValid) {
            this.props.oncheckout(this.props.token, order);
            this.props.onpaycard(this.props.token, cardtoken, carddetails);
            console.log('valid')
        } else {
            console.log('Invalid')
        }

        this.setState({ redirect: <Redirect to="/dashboard/customerorders" /> })
    }
    render() {


        const formElementsArray = [];
        for (let key in this.state.checkoutForm) {
            formElementsArray.push({
                id: key,
                config: this.state.checkoutForm[key]
            });
        }

        let form = (
            <form onSubmit={this.checkoutHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        label={formElement.id}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                {
                    this.state.type === "cashondelivery" ?
                        <Button btnType="CheckButton">Checkout</Button> :
                        null
                }
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.Main}>
                {this.state.redirect}

                <div className={classes.FormCard}>
                    <FormCard form={form} title="Checkout" />

                </div>
                <div className={classes.ProfileCard}>
                    <CheckoutCard setType={(type) => this.settype(type)}
                        pay={this.paywithCard}
                        sett={this.props.settings[0]}
                    />
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        settings: state.Checkout.settings,
        cart: state.Checkout.cart,
        saveDetails: state.Checkout.saveDetails,
        loading: state.Checkout.loading,
        error: state.Checkout.error,
        message: state.Checkout.message,
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchcheckoutsettings: (token) => dispatch(actions.FetchCheckoutSettings(token)),
        onfetchcheckoutcart: (token) => dispatch(actions.FetchCheckoutCart(token)),
        oncheckout: (token, order) => dispatch(actions.Checkout(token, order)),
        onpaycard: (token, cardtoken, carddetails) => dispatch(actions.PayWithCard(token, cardtoken, carddetails))
        // onMsgRefresh: () => dispatch(actions.MsgRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
