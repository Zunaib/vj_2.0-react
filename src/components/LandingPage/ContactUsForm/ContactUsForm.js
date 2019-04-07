import React, { Component } from 'react';
import classes from './ContactUsForm.css';
import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

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
    formIsValid: false,
    loading: false
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
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.contactUsForm) {
      formData[formElementIdentifier] = this.state.contactUsForm[formElementIdentifier].value;
    }
    const contactUs = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }

    axios.post('/api/contactUs', contactUs)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
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
    const updatedcontactUsForm = {
      ...this.state.contactUsForm
    };
    const updatedFormElement = {
      ...updatedcontactUsForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedcontactUsForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedcontactUsForm) {
      formIsValid = updatedcontactUsForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ contactUsForm: updatedcontactUsForm, formIsValid: formIsValid });
  }

  render() {
    let button = null;
    let error = null;
    if (this.state.formIsValid) {
      button = <Button btnType="SendButton" disabled={!this.state.formIsValid}>Send</Button>;
    }
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
        {button}
        {error}
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <section className={classes.Misc}>
        <h2>Contact Us</h2>
        {form}

      </section>
    );







    // return (
    //   <section className={classes.Misc}>
    //     <h2>Contact Us</h2>




    //     <form>
    //       <p>Fill in the next form to send us a message</p>
    //       <div>
    //         <label htmlFor="name">Name</label>
    //         <input type="text" name="name" placeholder="Your Name Here" onChange={this.getName} />
    //       </div>
    //       <div>
    //         <label htmlFor="email">Email</label>
    //         <input type="email" name="email" placeholder="Your Email Here" onChange={this.getEmail} />
    //       </div>
    //       <div>
    //         <label htmlFor="name">Message</label>
    //         <textarea onChange={this.getDescription} maxLength="450" placeholder="Your Message Here"></textarea>

    //       </div>
    //       <div>
    //         <p>We will answer as soon as possible</p>
    //         <a className={classes.Send} href="/">Send</a>

    //       </div>

    //     </form>








    //   </section>
    // );
  }
}

export default ContactUsForm;
