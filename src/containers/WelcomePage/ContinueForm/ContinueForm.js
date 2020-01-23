import React, { Component } from 'react';
import { checkValidity } from '../../../Shared/Validator';
import FileUploader from '../../../components/FileUploader/FileUpload';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/CustomInput/CustomInput';
import FormCard from '../../../components/UI/Card/WelcomeForm/Form';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';

import classes from './ContinueForm.css';
export class OrderSummary extends Component {

    state = {
        settingsForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name Here'
                },
                value: '',
                validation: {
                    required: true,
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
                    required: true,
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Describe Yourself In A Few Words'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        selectedFile: null,
        selectedFileURL: null
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileURL: URL.createObjectURL(event.target.files[0])
        })
    }

    settingsHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.settingsForm) {
            formData[formElementIdentifier] = this.state.settingsForm[formElementIdentifier].value;
        }

        let data = new FormData();
        if (this.state.selectedFile) {
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        }

        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('description', formData.description);

        if (this.state.formIsValid && this.state.selectedFile) {
            // console.log(formData)
            // console.log(this.state.selectedFile)
            this.props.onUpdateSettings(this.props.token, data);
            if (this.props.type === "customer") {
                this.continueasCustomer()
            } else {
                this.continueasCreator()
            }
            console.log('valid')
        } else {
            console.log('Invalid')
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedsettingsForm = {
            ...this.state.settingsForm
        };
        const updatedFormElement = {
            ...updatedsettingsForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedsettingsForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedsettingsForm) {
            formIsValid = updatedsettingsForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ settingsForm: updatedsettingsForm, formIsValid: formIsValid });
    }

    continueasCustomer = () => {
        console.log('cust')
        this.props.changetoCustomer(this.props.token)
    }

    continueasCreator = () => {
        console.log('create')
        this.props.changetoCreator(this.props.token)
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.settingsForm) {
            formElementsArray.push({
                id: key,
                config: this.state.settingsForm[key]
            });
        }

        let form = (
            <form onSubmit={this.settingsHandler}>
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
                <FileUploader clicked={this.fileSelectedHandler}
                    text={"Select Image"}
                    textt={this.state.selectedFile ? "Profile Picture Selected" : "Select Profile Picture"} />
                <Button btnType="SetButton">Continue</Button>
            </form>
        );

        return (
            <div className={classes.FormCard}>
                <FormCard form={form} title="Provide Followings" selectedFile={this.state.selectedFile} selectedFileURL={this.state.selectedFileURL} />
                <div className={classes.Err}>
                    <h4>{!this.state.formIsValid ? "Invalid Input Fields" : null}</h4>
                    <h4>{!this.state.selectedFile ? "No Image Selected" : null}</h4>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onUpdateSettings: (token, settingsData) => dispatch(actions.UpdateSettings(token, settingsData)),
        changetoCustomer: (token) => dispatch(actions.UseAsCustomer(token)),
        changetoCreator: (token) => dispatch(actions.UseAsCreator(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
