import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import classes from './UserAccountSettings.css';


import Snackbar from '../../components/UI/SnackBar/SuccessSnackbar';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Card from '../../components/UI/Card/Card';
import { checkValidity } from '../../Shared/Validator';


class UserAccountSettings extends Component {

    componentDidMount = () => {
        if (this.props.token) {
            this.props.onfetchsettings(this.props.token);
            this.getData();
        }
    }
    getData() {
        setTimeout(() => {

            const updatedsettingsForm = {
                ...this.state.settingsForm
            };

            const formElements = ['firstName', 'lastName', 'description', 'streetAddress', 'city',
                'zipcode', 'province', 'country', 'gender', 'phone'];


            for (let i = 0; i < formElements.length; i++) {
                const updatedFormElement = {
                    ...updatedsettingsForm[formElements[i]]
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

                updatedsettingsForm[formElements[i]] = updatedFormElement;
            }

            let formIsValid = true;
            for (let inputIdentifier in updatedsettingsForm) {
                formIsValid = updatedsettingsForm[inputIdentifier].valid && formIsValid;
            }
            this.setState({ settingsForm: updatedsettingsForm, formIsValid: formIsValid });
            this.setState({ userName: this.props.settings[0].userName });
            this.setState({ desc: this.props.settings[0].description });

        }, 500)

    }

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
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Describe Yourself In A Few Words'
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
            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'male', displayValue: 'Male' },
                        { value: 'female', displayValue: 'Female' }
                    ]
                },
                value: 'Male',
                validation: {},
                valid: true
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
        userName: "",
        desc: ""
    }

    settingsHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.settingsForm) {
            formData[formElementIdentifier] = this.state.settingsForm[formElementIdentifier].value;
        }

        const formElements = ['firstName', 'lastName', 'description', 'streetAddress', 'city',
            'zipcode', 'province', 'country', 'gender', 'phone'];

        let action = false;
        for (let i = 0; i < formElements.length; i++) {
            let target = formElements[i];
            if (formData[target] !== this.props.settings[0][target] && formData[target] !== "") {
                action = true;
            }
        }
        const settingsData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateofbirth: "1/1/1",
            description: formData.description,
            province: formData.province,
            gender: formData.gender,
            streetAddress: formData.streetAddress,
            city: formData.city,
            zipcode: formData.zipcode,
            country: formData.country,
            phone: formData.phone
        }

        if (action) {
            this.props.onUpdateSettings(this.props.token, settingsData);
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

    render() {

        let snack = null;
        if (this.props.message) {
            console.log('message pass');
            let msg = "Data Successfully Updated";
            snack = (<Snackbar message={msg} msgRefresh={this.props.onMsgRefresh} />);
        }

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
                <Button btnType="WebButton">Update</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let profile = {
            username: this.state.userName,
            desc: this.state.desc,
            logger: this.props.flag
        }

        return (
            <div className={classes.Main}>
                {snack}
                <div className={classes.StatsCard}>
                    <Card cardType="profileStatsCard" />
                </div>
                <div className={classes.FormCard}>
                    <Card cardType="formCard" form={form} />

                </div>
                <div className={classes.ProfileCard}>
                    <Card cardType="profileCard" profile={profile} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        settings: state.UserSettings.settings,
        loading: state.UserSettings.loading,
        error: state.UserSettings.error,
        message: state.UserSettings.message,
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchsettings: (token) => dispatch(actions.FetchSettings(token)),
        onUpdateSettings: (token, settingsData) => dispatch(actions.UpdateSettings(token, settingsData)),
        onMsgRefresh: () => dispatch(actions.MsgRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountSettings);
