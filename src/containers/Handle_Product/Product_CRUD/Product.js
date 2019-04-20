import React, { Component } from 'react'
import classes from './ProductCrud.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'


import FileUploader from '../../../components/FileUploader/MultipleFile';
import display from '../../../assets/images/testimg.jpg';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Web_Input/WebInput';
import { checkValidity } from '../../../Shared/Validator';
// import Snackbar from '../../../components/UI/SnackBar/SuccessSnackbar';

class Product extends Component {

    state = {
        productForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            sizes: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Size'
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
                    placeholder: 'Describe Product In A Few Words'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Price'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 100,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            quantity: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Quantity'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            colors: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'brown', displayValue: 'Brown' },
                        { value: 'black', displayValue: 'Black' },
                        { value: 'red', displayValue: 'Red' },
                        { value: 'blue', displayValue: 'Blue' },
                        { value: 'yellow', displayValue: 'Yellow' },
                        { value: 'green', displayValue: 'Green' },
                    ]
                },
                value: 'Black',
                validation: {},
                valid: true
            },
            discount: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Discount Percentage'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            album: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'spring 19', displayValue: 'Spring 19' },
                        { value: 'summer 18', displayValue: 'Summer 18' },
                        { value: 'winter 19', displayValue: 'Winter 19' },
                        { value: 'summer 19', displayValue: 'Summer 19' },
                        { value: 'summer 17', displayValue: 'Summer 17' },
                    ]
                },
                value: 'Spring 19',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        selectedFiles: [],
        files: false,
        maxselected: false
    }

    maxSelectFile = (event) => {
        let files = event.target.files // create file object
        if (files.length > 5) {
            this.setState({ maxselected: false })
            const msg = 'Only 5 images can be uploaded at a time'
            event.target.value = null // discard selected file
            console.log(msg)
            return false;

        } else {
            this.setState({ maxselected: true })
            console.log('max true');
            return true;
        }


    }

    fileSelectedHandler = (event) => {

        if (this.maxSelectFile(event)) {
            let newfiles = [
                ...this.state.selectedFiles
            ]
            newfiles.push(event.target.files[0]);
            newfiles.push(event.target.files[1]);
            newfiles.push(event.target.files[2]);
            newfiles.push(event.target.files[3]);
            newfiles.push(event.target.files[4]);
            console.log(newfiles);
            this.setState({ selectedFiles: newfiles, files: true })
        } else {
            console.log('invalid');
        }
    }

    fieldclearHandler = () => {
        let updatedproductForm = {
            ...this.state.productForm
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedproductForm) {
            updatedFormElement = {
                ...updatedproductForm[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedproductForm[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ productForm: updatedproductForm, selectedFiles: null, files: false });
    }

    productHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.productForm) {
            formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }


        console.log(this.state.selectedFiles)




        let data = new FormData();
        if (this.state.files) {
            console.log('selec file true');
            console.log(this.state.selectedFiles);
            // data.append('file[]', this.state.selectedFiles);

            var ins = 5;
            for (var x = 0; x < ins; x++) {
                data.append('file', this.state.selectedFiles[x]);
            }

        }




        data.append('productName', formData.name);
        data.append('quantity', formData.quantity);
        data.append('sizes', formData.sizes);
        data.append('price', formData.price);
        data.append('discount', formData.discount);

        if (this.state.formIsValid && this.state.files) {
            this.props.onaddProduct(this.props.token, data);
            this.fieldclearHandler();
            this.setState({ formIsValid: false });
        } else {
            console.log('Invalid')
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedproductForm = {
            ...this.state.productForm
        };
        const updatedFormElement = {
            ...updatedproductForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedproductForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedproductForm) {
            formIsValid = updatedproductForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ productForm: updatedproductForm, formIsValid: formIsValid });
    }
    render() {

        const formElementsArray = [];
        for (let key in this.state.productForm) {
            formElementsArray.push({
                id: key,
                config: this.state.productForm[key]
            });
        }
        let form = (
            <form onSubmit={this.productHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        class={classes.Wrapper}
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
                <FileUploader clicked={this.fileSelectedHandler} />
                <Button btnType="WebButton" >Add Product</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        // let imgsnack = null;
        // if (this.state.selectedFile1) {
        //     imgsnack = (<Snackbar message={'File Added: ( ' + this.state.selectedFile.name + ' )'} msgRefresh={this.props.onMsgRefresh} />);
        // }

        // let snack = null;
        // if (this.props.message) {
        //     let msg = "Product Added Successfully";
        //     snack = (<Snackbar message={msg} msgRefresh={this.props.onMsgRefresh} />);
        // }

        return (
            <div className={classes.Main}>
                {/* {imgsnack}
                {snack} */}

                <div className={classes.Album}>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Add Product</h1>
                            <div className={classes.FormCardInfo}>
                                <div className={classes.FormSide}>
                                    <div className={classes.Form} >
                                        {form}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.Images}>
                            <div className={classes.AlbumImage} >
                                <img src={display} alt="Album_Thumbnail" />
                            </div>
                            <div className={classes.AlbumImageSmall} >
                                <img src={display} alt="Album_Thumbnail" />
                                <img src={display} alt="Album_Thumbnail" />
                                <img src={display} alt="Album_Thumbnail" />
                                <img src={display} alt="Album_Thumbnail" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.ProductCrud.loading,
        error: state.ProductCrud.error,
        message: state.ProductCrud.message,
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaddProduct: (token, productData) => dispatch(actions.AddProduct(token, productData)),
        onMsgRefresh: () => dispatch(actions.ProductMsgRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);