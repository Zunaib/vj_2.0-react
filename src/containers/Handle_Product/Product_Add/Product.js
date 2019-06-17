import React, { Component } from 'react'
import classes from './ProductCrud.css';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'


import FileUploader from '../../../components/FileUploader/MultipleFile';
import productimg from '../../../assets/images/testimg.jpg';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Web_Input/WebInput';
import { checkValidity } from '../../../Shared/Validator';
import Snack from '../../../components/UI/SnackBar/Snackbar';

class Product extends Component {


    componentDidMount() {
        let str = window.location.href;
        let res = str.split("/");
        const albumid = res[4];
        if (albumid === 'handle_product') {
            this.setState({ album: null })
        } else {
            this.setState({ album: albumid })
        }
    }

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
            type: {
                elementType: 'select',
                elementConfig: {
                    placeholder: "Select Product Type",
                    options: [
                        { value: 'shoes', displayValue: 'Shoes' },
                        { value: 'shirt', displayValue: 'Shirt' },
                        { value: 'pant', displayValue: 'Pant' },
                        { value: 'clothe', displayValue: 'Clothe' },
                    ]
                },
                value: 'clothe',
                validation: {},
                valid: true
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
            "discount Price": {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Discounted Price'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        selectedFiles: null,
        selectedsnacks: null,
        selectedFilesURL: null,
        files: false,
        maxselected: false,
        album: null
    }

    maxSelectFile = (event) => {
        let files = event.target.files // create file object
        if (files.length <= 5 && files.length > 1) {
            this.setState({ maxselected: true })
            console.log('max true');
            return files.length;
        } else {
            this.setState({ maxselected: false })
            console.log('max false');
            event.target.value = null // discard selected file
            return false;
        }
    }

    fileSelectedHandler = (event) => {

        let files = this.maxSelectFile(event);
        if (files) {
            let newfiles = [
            ]
            let newfilesURL = [
            ]

            for (let i = 0; i < files; i++) {
                newfiles.push(event.target.files[i]);
                newfilesURL.push(URL.createObjectURL(event.target.files[i]));
            }
            this.setState({
                selectedFiles: newfiles,
                selectedFilesURL: newfilesURL,
                selectedsnacks: true,
                files: true
            })
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

        this.setState({ productForm: updatedproductForm, selectedFiles: null, selectedFilesURL: null, files: false, selectedsnacks: false });
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

            var ins = 5;
            for (var x = 0; x < ins; x++) {
                data.append('file', this.state.selectedFiles[x]);
            }

        }
        if (this.state.album) {
            data.append('albumId', this.state.album);
        }
        data.append('productName', formData.name);
        data.append('description', formData.description);
        data.append('color', formData.color);
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

        let productimages = null;
        if (this.state.selectedFiles) {
            productimages = (<div className={classes.Images}>
                <div className={classes.AlbumImage} >
                    <img src={this.state.selectedFiles[0] ? this.state.selectedFilesURL[0] : productimg} alt="Product_Thumbnail" />
                </div>
                <div className={classes.AlbumImageSmall} >
                    <img src={this.state.selectedFiles[1] ? this.state.selectedFilesURL[1] : productimg} alt="Product_Thumbnail1" />
                    <img src={this.state.selectedFiles[2] ? this.state.selectedFilesURL[2] : productimg} alt="Product_Thumbnail2" />
                    <img src={this.state.selectedFiles[3] ? this.state.selectedFilesURL[3] : productimg} alt="Product_Thumbnail3" />
                    <img src={this.state.selectedFiles[4] ? this.state.selectedFilesURL[4] : productimg} alt="Product_Thumbnail4" />
                </div>
            </div>);
        } else {
            productimages = (<div className={classes.Images}>
                <div className={classes.AlbumImage} >
                    <img src={productimg} alt="Product_Thumbnail" />
                </div>
                <div className={classes.AlbumImageSmall} >
                    <img src={productimg} alt="Product_Thumbnail1" />
                    <img src={productimg} alt="Product_Thumbnail2" />
                    <img src={productimg} alt="Product_Thumbnail3" />
                    <img src={productimg} alt="Product_Thumbnail4" />
                </div>
            </div>);
        }

        let addedprod = null;
        if (this.props.prodadded) {
            addedprod = (<Snack message={"Product Successfully Added"} snackType="success" refresh={this.props.onaddProductMsg} />);
        }

        let imgsnack = null;
        if (this.state.selectedFiles) {
            imgsnack = (<Snack message={'File Added: ( ' + this.state.selectedFiles.length + ' )'} snackType="success" refresh={this.props.onaddProductMsg} />);
        }
        return (
            <div className={classes.Main}>
                {imgsnack}
                {addedprod}
                {this.props.prodadded ? <Redirect to={"/dashboard/products/" + this.props.productid} /> : null}
                <div className={classes.Album}>
                    <NavLink to="/dashboard">
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
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
                        {productimages}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.AddProduct.loading,
        error: state.AddProduct.error,
        productid: state.AddProduct.productid,
        prodadded: state.AddProduct.added,
        token: state.Auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaddProduct: (token, productData) => dispatch(actions.AddProduct(token, productData)),
        onaddProductMsg: () => dispatch(actions.AddProductMsg())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);