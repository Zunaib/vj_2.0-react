import React, { Component } from 'react'
import classes from './Product_Update.css';
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
// import Snackbar from '../../../components/UI/SnackBar/SuccessSnackbar';

class Product extends Component {


    componentDidMount() {
        let str = window.location.href.split("/")[6];
        this.props.onfetchcurrentproduct(this.props.token, str)

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentproduct !== prevState.product) {
            return { product: nextProps.currentproduct };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentproduct !== this.props.currentproduct) {
            //Perform some operation here
            this.setState({ album: this.props.currentproduct });
            this.setData();
        }
    }

    setData() {

        let prevProduct = this.state.product;
        const updatedproductForm = {
            ...this.state.productForm
        };

        const formElements = ['name', 'description', 'quantity', 'price', 'discount', 'sizes', 'colors'];
        const formElementsIncoming = ['productName', 'description', 'quantity', 'price', 'discount', 'sizes', 'colors'];


        for (let i = 0; i < formElements.length; i++) {
            const updatedFormElement = {
                ...updatedproductForm[formElements[i]]
            };

            let target = formElementsIncoming[i];

            if (prevProduct[target] === null) {
                updatedFormElement.value = "";
                updatedFormElement.valid = false;
                updatedFormElement.touched = false;
            } else {
                updatedFormElement.value = prevProduct[target];
                updatedFormElement.valid = true;
                updatedFormElement.touched = true;
            }

            updatedproductForm[formElements[i]] = updatedFormElement;
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedproductForm) {
            formIsValid = updatedproductForm[inputIdentifier].valid && formIsValid;
        }
        let product_images = [];
        if (prevProduct.images) {
            for (let i = 0; i < prevProduct.images.length; i++) {
                product_images[i] = 'http://localhost:5000' + prevProduct.images[i];
            }
        }
        this.setState({ productForm: updatedproductForm, formIsValid: formIsValid, productimages: product_images });

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
            }
        },
        formIsValid: false,
        selectedFiles: null,
        selectedsnacks: null,
        selectedFilesURL: null,
        files: false,
        maxselected: false,
        product: null,
        productimages: null,
        productid: window.location.href.split("/")[6]
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
        // console.log(this.state.selectedFiles)
        const formElements = ['name', 'description', 'quantity', 'price', 'discount', 'sizes', 'colors'];
        const formElementsIncoming = ['productName', 'description', 'quantity', 'price', 'discount', 'sizes', 'colors'];
        let prevProduct = this.state.product;
        let action = false;
        for (let i = 0; i < formElements.length; i++) {
            let target = formElements[i];
            let targetIncoming = formElementsIncoming[i];
            if (formData[target] !== prevProduct[targetIncoming]) {
                action = true;
            }
        }

        let data = new FormData();
        if (this.state.files) {
            action = true;
            for (let x = 0; x < this.state.selectedFiles.length; x++) {
                data.append('file', this.state.selectedFiles[x]);
            }
        } else {
            data.append('productImages', prevProduct.images)
            // console.log(prevProduct.images)
        }
        if (prevProduct.albumId) {
            data.append('albumId', prevProduct.albumId);
        }
        data.append('productId', prevProduct._id);
        data.append('productName', formData.name);
        data.append('description', formData.description);
        data.append('color', formData.color);
        data.append('quantity', formData.quantity);
        data.append('sizes', formData.sizes);
        data.append('price', formData.price);
        data.append('discount', formData.discount);

        if (this.state.formIsValid && action) {
            console.log('valid')
            console.log(data)
            this.props.onupdatecurrentproduct(this.props.token, data);
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
                <Button btnType="WebButton" >Update Product</Button>
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

        // let imgsnack = null;
        // if (this.state.selectedFiles && this.state.selectedsnacks) {
        //     imgsnack = (<Snackbar message={'File Added: ( ' + this.state.selectedFiles.length + ' )'} msgRefresh={this.props.onMsgRefresh} />);
        //     this.setState({ selectedsnacks: false })
        // }

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
        } else if (this.state.productimages) {
            productimages = (<div className={classes.Images}>
                <div className={classes.AlbumImage} >
                    <img src={this.state.productimages[0] ? this.state.productimages[0] : productimg} alt="Product_Thumbnail" />
                </div>
                <div className={classes.AlbumImageSmall} >
                    <img src={this.state.productimages[1] ? this.state.productimages[1] : productimg} alt="Product_Thumbnail1" />
                    <img src={this.state.productimages[2] ? this.state.productimages[2] : productimg} alt="Product_Thumbnail2" />
                    <img src={this.state.productimages[3] ? this.state.productimages[3] : productimg} alt="Product_Thumbnail3" />
                    <img src={this.state.productimages[4] ? this.state.productimages[4] : productimg} alt="Product_Thumbnail4" />
                </div>
            </div>);
        }

        let redirect = null;
        if (this.props.updated) {
            redirect = <Redirect to={"/dashboard/products/" + this.state.productid} />
        }


        return (
            <div className={classes.Main}>
                {redirect}
                <div className={classes.Album}>
                    <NavLink to="/dashboard/designer">
                        <div className={classes.cross}>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Update Product</h1>
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
        token: state.Auth.token,
        currentproduct: state.ViewProduct.currentproduct,
        updated: state.UpdateProduct.updated,
        loading: state.ViewProduct.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentproduct: (token, productid) => dispatch(actions.FetchProduct(token, productid)),
        onupdatecurrentproduct: (token, productid) => dispatch(actions.UpdateProduct(token, productid)),
        onMsgRefresh: () => dispatch(actions.ProductMsgRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);