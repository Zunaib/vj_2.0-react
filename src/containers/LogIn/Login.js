import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import classes from './Login.css';
import Logo from '../../components/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
// import axios from '../../axios';

class Login extends Component {

    state = {
        loginForm: {
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
                    type: 'password',
                    placeholder: ''
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }


    fieldclearHandler = () => {
        let updatedloginForm = {
            ...this.state.loginForm
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedloginForm) {
            updatedFormElement = {
                ...updatedloginForm[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedloginForm[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ loginForm: updatedloginForm });
    }

    loginHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.loginForm) {
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        }
        const loginData = {
            email: formData.email,
            password: formData.password
        }
        this.props.onAuth(loginData, 'Login');
        this.fieldclearHandler();

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedloginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedloginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedloginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedloginForm) {
            formIsValid = updatedloginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ loginForm: updatedloginForm, formIsValid: formIsValid });
    }

    render() {

        let button = null;
        let forgetpassword = <a className={classes.Forgot} href="/login">Forgot Password ?</a>;
        if (this.state.formIsValid) {
            button = <Button btnType="LoginButton" disabled={!this.state.formIsValid}>LOGIN</Button>;
        }

        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        let form = (
            <form onSubmit={this.loginHandler}>
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

                {button}
                {forgetpassword}
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to='/dashboard' />;
        }

        let errorMessage = null;
        if (this.props.error) {
            console.log(this.props.error);
            errorMessage = (
                <p>{this.props.error}</p>
            )
        }
        return (
            <div className={classes.Background}>
                {authRedirect}
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
                            {errorMessage}
                            <h3>Login</h3>
                            {form}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuth: state.Auth.token !== null,
        loading: state.Auth.loading,
        error: state.Auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (loginData, type) => dispatch(actions.Auth(loginData, type))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);