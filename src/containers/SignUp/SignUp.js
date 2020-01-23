import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import { checkValidity } from '../../Shared/Validator';

import classes from './SignUp.css';
import Logo from '../../components/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Snack from '../../components/UI/SnackBar/Snackbar';

class SignUp extends Component {


    state = {
        signupForm: {
            Username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name Here'
                },
                value: '',
                validation: {
                    required: true,
                    isUsername: true,
                    minLength: 5,
                    maxLength: 15

                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'abc@xyz.com'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Aplha Numeric Only'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true,
                    minLength: 7,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
    }


    fieldclearHandler = () => {
        let updatedsignupForm = {
            ...this.state.signupForm
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedsignupForm) {
            updatedFormElement = {
                ...updatedsignupForm[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedsignupForm[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ signupForm: updatedsignupForm });
    }

    signupHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.signupForm) {
            formData[formElementIdentifier] = this.state.signupForm[formElementIdentifier].value;
        }
        const signUpData = {
            userName: formData.Username,
            email: formData.email,
            password: formData.password
        }
        if (this.state.formIsValid) {
            this.props.onAuth(signUpData, 'Signup');
            this.fieldclearHandler();
            this.setState({ formIsValid: false });
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedsignupForm = {
            ...this.state.signupForm
        };
        const updatedFormElement = {
            ...updatedsignupForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedsignupForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedsignupForm) {
            formIsValid = updatedsignupForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ signupForm: updatedsignupForm, formIsValid: formIsValid });
    }

    send() {

    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.signupForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signupForm[key]
            });
        }
        let form = (
            <form onSubmit={this.signupHandler}>
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
                <Button btnType="LoginButton">Sign Up</Button>
                <NavLink to="/login" className={classes.ShiftToSignIn}>
                    <p>Already a User? Click here to Sign In</p>
                    <i className="fas fa-sign-in-alt"></i>
                </NavLink>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let signRedirect = null;
        let signedUp = null;
        if (this.props.redirect) {
            signRedirect = <Redirect to='/login' />;
            signedUp = (<Snack message={"Successfully Signed Up, Please Verify Email To Login"} snackType="success" refresh={this.props.onErrorRefresh} />);
        }

        let errorsnack = null;
        if (this.props.error) {
            let msg = "Wrong Input Format Entered";
            if (this.props.error.userNameExist) {
                msg = "User Name Exists";
            }
            if (this.props.error.emailExist) {
                msg = "Email Already Exists";
            }

            errorsnack = (<Snack message={msg} snackType="error" refresh={this.props.onErrorRefresh} />);

        }

        return (
            <div className={classes.Background}>
                {signedUp}
                {errorsnack}
                {signRedirect}
                <div className={classes.Main}>
                    <div className={classes.ImageSide}>
                        <div className={classes.Image} >

                        </div>
                    </div>
                    <div className={classes.FormSide}>
                        <div className={classes.Logo} >
                            <Logo logoType="Black" />
                        </div>
                        <div className={classes.Form} >
                            <h3>SignUp</h3>
                            {form}
                            {/* <div className={classes.FbGoogle}>
                                <div className={classes.Google}>
                                    <p>Continue With Google</p>
                                    <i className="fab fa-google"></i>

                                </div>
                                <div className={classes.Fb}>
                                    <p>Continue With Facebook</p>
                                    <i className="fab fa-facebook-f"></i>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.Auth.loading,
        error: state.Auth.error,
        redirect: state.Auth.redirect
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (signUpData, type) => dispatch(actions.Auth(signUpData, type)),
        onresetRedirect: () => dispatch(actions.ResetRedirect()),
        onErrorRefresh: () => dispatch(actions.ErrRefresh())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);