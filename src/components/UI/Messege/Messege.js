import React, { Component } from 'react';
import classes from './Messege.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data';
import Button from '../../UI/Button/Button';


// import axios from '../../../axios';
import Input from '../../UI/Input/Web_Input/WebInput';

class MessegeInput extends Component {
    state = {
        messegeinput: {
            messegetext: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Messege'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }


    fieldclearHandler = () => {
        let updatedmessegeinput = {
            ...this.state.messegeinput
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedmessegeinput) {
            updatedFormElement = {
                ...updatedmessegeinput[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedmessegeinput[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ messegeinput: updatedmessegeinput });
    }

    searchHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.messegeinput) {
            formData[formElementIdentifier] = this.state.messegeinput[formElementIdentifier].value;
        }


        let data = new FormData();
        data.append('message', formData.messegetext);
        data.append('conversationId', this.props.singleconvo._id);

        if (formData.messegetext !== '') {
            // this.props.history.push('/dashboard/searchresults');
            this.props.onMessege(this.props.token, data);
            this.fieldclearHandler();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedmessegeinput = {
            ...this.state.messegeinput
        };
        const updatedFormElement = {
            ...updatedmessegeinput[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touchethisd = true;
        updatedmessegeinput[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedmessegeinput) {
            formIsValid = updatedmessegeinput[inputIdentifier].valid && formIsValid;
        }
        this.setState({ messegeinput: updatedmessegeinput, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.messegeinput) {
            formElementsArray.push({
                id: key,
                config: this.state.messegeinput[key]
            });
        }
        let form = (
            <form onSubmit={this.searchHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="SendMSGButton" >Send</Button>
            </form>
        );
        return (
            <div className={classes.Search}>
                {form}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        singleconvo: state.FetchSingleConvo.conversation

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onMessege: (token, messege) => dispatch(actions.Messege(token, messege)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessegeInput));
