import React, { Component } from 'react';
import classes from './SignUp.css';
import Logo from '../../components/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios';

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
                    required: true
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
        formIsValid: false,
        loading: false
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
        const signup = {
            userName: formData.fullName,
            email: formData.email,
            password: formData.password
        }
        axios.post('/api/signup', signup)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/dashboard');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
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
        const updatedsignupForm = {
            ...this.state.signupForm
        };
        const updatedFormElement = {
            ...updatedsignupForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedsignupForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedsignupForm) {
            formIsValid = updatedsignupForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ signupForm: updatedsignupForm, formIsValid: formIsValid });
    }

    render() {

        let button = null;
        if (this.state.formIsValid) {
            button = <Button btnType="LoginButton" disabled={!this.state.formIsValid}>REGISTER</Button>;
        }

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
                {button}
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.Background}>
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
                            <h3>Register</h3>
                            {form}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignUp;