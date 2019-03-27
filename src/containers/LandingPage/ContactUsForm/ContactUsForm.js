import React, { Component } from 'react';
import classes from './ContactUsForm.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

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

  contactUsHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.contactUsForm) {
      formData[formElementIdentifier] = this.state.contactUsForm[formElementIdentifier].value;
    }
    const contactUs = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      contactUsData: formData
    }
    axios.post('/contactUs.json', contactUs)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
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
        <Button  btnType="SendButton" disabled={!this.state.formIsValid}>Send</Button>
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
