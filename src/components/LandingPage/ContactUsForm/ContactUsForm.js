import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';

import classes from './ContactUsForm.css';
// import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import { checkValidity } from '../../../Shared/Validator';

class ContactUsForm extends Component {
  state = {
    contactUsForm: {
      name: {
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
          placeholder: 'Your E-Mail Here'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      message: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Message Here'
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
    let updatedcontactUsForm = {
      ...this.state.contactUsForm
    };
    let updatedFormElement;
    for (let formElementIdentifier in updatedcontactUsForm) {
      updatedFormElement = {
        ...updatedcontactUsForm[formElementIdentifier]
      };
      updatedFormElement.value = "";
      updatedcontactUsForm[formElementIdentifier] = updatedFormElement;
    }

    this.setState({ contactUsForm: updatedcontactUsForm });
  }

  contactUsHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.contactUsForm) {
      formData[formElementIdentifier] = this.state.contactUsForm[formElementIdentifier].value;
    }
    const contactUs = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }
    if (this.state.formIsValid) {
      this.props.onSubmitContactUsForm(contactUs);
    } else {
      console.log('invalid')
    }
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
    const updatedcontactUsForm = {
      ...this.state.contactUsForm
    };
    const updatedFormElement = {
      ...updatedcontactUsForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedcontactUsForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedcontactUsForm) {
      formIsValid = updatedcontactUsForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ contactUsForm: updatedcontactUsForm, formIsValid: formIsValid });
  }

  render() {
    let error = null;
    if (!this.state.formIsValid) {
      error = <p className={classes.error}>Fill In All Fields With Valid Input To Send.</p>
    }

    const formElementsArray = [];
    for (let key in this.state.contactUsForm) {
      formElementsArray.push({
        id: key,
        config: this.state.contactUsForm[key]
      });
    }
    let form = (
      <form onSubmit={this.contactUsHandler}>
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
        {/* {button} */}
        <Button btnType="SendButton">Send</Button>
        {error}
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <section className={classes.Misc} ref={this.props.contactUsRef}>
        <h2>Contact Us</h2>
        {form}

      </section>
    );

  }
}

const mapStateToProps = state => {
  return {
    loading: state.ContactUs.loading,
    error: state.ContactUs.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitContactUsForm: (contactUsData) => dispatch(actions.ContactUsForm(contactUsData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactUsForm);
