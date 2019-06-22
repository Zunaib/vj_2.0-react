import React, { Component } from 'react';
import classes from './Comment.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'
import Input from '../../UI/Input/Input';

class Comment extends Component {
    state = {
        comment: {
            commenttext: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Comment'
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
        let updatedcomment = {
            ...this.state.comment
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedcomment) {
            updatedFormElement = {
                ...updatedcomment[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedcomment[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ comment: updatedcomment });
    }

    commentHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.comment) {
            formData[formElementIdentifier] = this.state.comment[formElementIdentifier].value;
        }

        console.log(formData.commenttext)

        let data = new FormData();
        data.append('comment', formData.commenttext);

        let str = window.location.href.split("http://localhost:3000/dashboard/")[1].split("/")[0];
        if (str === 'products') {
            data.append('productId', this.props.currentproduct._id);
            this.props.onProductComment(this.props.token, data);
            this.fieldclearHandler();
        } else if (str === 'vlogs') {
            data.append('vlogId', this.props.currentvlog._id);
            this.props.onVlogComment(this.props.token, data);
            this.fieldclearHandler();

        } else if (str === 'blogs') {
            console.log('blogs')
            data.append('blogId', this.props.currentblog._id);
            this.props.onBlogComment(this.props.token, data);
            this.fieldclearHandler();
        } else {
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
        const updatedcomment = {
            ...this.state.comment
        };
        const updatedFormElement = {
            ...updatedcomment[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touchethisd = true;
        updatedcomment[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedcomment) {
            formIsValid = updatedcomment[inputIdentifier].valid && formIsValid;
        }
        this.setState({ comment: updatedcomment, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.comment) {
            formElementsArray.push({
                id: key,
                config: this.state.comment[key]
            });
        }
        let form = (
            <form onSubmit={this.commentHandler}>
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
        currentproduct: state.ViewProduct.currentproduct,
        currentalbum: state.ViewAlbum.currentalbum,
        currentvlog: state.ViewVlog.currentvlog,
        currentblog: state.ViewBlog.currentblog,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onProductComment: (token, data) => dispatch(actions.ProductComment(token, data)),
        onBlogComment: (token, data) => dispatch(actions.BlogComment(token, data)),
        onVlogComment: (token, data) => dispatch(actions.VlogComment(token, data)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));
