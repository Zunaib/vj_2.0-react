import React, { Component } from 'react';
import classes from './Search.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'


// import axios from '../../../axios';
import Input from '../../UI/Input/Input';

class SearchBar extends Component {
    state = {
        searchBar: {
            searchtext: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Search'
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
        let updatedsearchBar = {
            ...this.state.searchBar
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedsearchBar) {
            updatedFormElement = {
                ...updatedsearchBar[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedsearchBar[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ searchBar: updatedsearchBar });
    }

    searchHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.searchBar) {
            formData[formElementIdentifier] = this.state.searchBar[formElementIdentifier].value;
        }

        let data = new FormData();
        data.append('queryString', formData.searchtext);

        if (formData.searchtext !== '') {
            this.props.history.push('/dashboard/searchresults');
            this.props.onSearch(this.props.token, data);
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
        const updatedsearchBar = {
            ...this.state.searchBar
        };
        const updatedFormElement = {
            ...updatedsearchBar[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touchethisd = true;
        updatedsearchBar[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedsearchBar) {
            formIsValid = updatedsearchBar[inputIdentifier].valid && formIsValid;
        }
        this.setState({ searchBar: updatedsearchBar, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.searchBar) {
            formElementsArray.push({
                id: key,
                config: this.state.searchBar[key]
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

            </form>
        );
        // if (this.state.loading) {
        //     form = <Spinner />;
        // }

        return (
            <div className={classes.Search}>
                {form}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSearch: (token, queryString) => dispatch(actions.Search(token, queryString)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
