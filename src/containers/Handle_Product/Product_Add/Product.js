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
        this.props.fetchdropdowns(this.props.token);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dropdowns !== prevState.dropdowns) {
            return { dropdowns: nextProps.dropdowns };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dropdowns !== this.props.dropdowns) {
            //Perform some operation here
            this.setState({ dropdowns: this.props.dropdowns });
            this.setdropdowns();
        }
    }

    setdropdowns() {
        let updatedproductForm = {
            ...this.state.productForm
        };
        let updatedFormElement;
        var colors = this.state.dropdowns[0].values;
        var productTypes = this.state.dropdowns[1].values;
        var shoesizes = this.state.dropdowns[2].values;
        var topsizes = this.state.dropdowns[3].values;
        var bottomsizes = this.state.dropdowns[4].values;
        var res = [];
        var res1 = [];
        var res2 = [];
        var res3 = [];
        var res4 = [];
        for (var i = 0; i < colors.length; i++) {
            var o = {};
            o["displayValue"] = colors[i];
            o["value"] = colors[i];
            res.push(o);
        }

        for (i = 0; i < productTypes.length; i++) {
            o = {};
            o["displayValue"] = productTypes[i];
            o["value"] = productTypes[i];
            res1.push(o);
        }

        for (i = 0; i < topsizes.length; i++) {
            o = {};
            o["displayValue"] = topsizes[i];
            o["value"] = topsizes[i];
            res2.push(o);
        }
        this.setState({ topsizes: res2 })

        for (i = 0; i < bottomsizes.length; i++) {
            o = {};
            o["displayValue"] = bottomsizes[i];
            o["value"] = bottomsizes[i];
            res3.push(o);
        }
        this.setState({ bottomsizes: res3 })

        for (i = 0; i < shoesizes.length; i++) {
            o = {};
            o["displayValue"] = shoesizes[i];
            o["value"] = shoesizes[i];
            res4.push(o);
        }
        this.setState({ shoesizes: res4 })


        for (let formElementIdentifier in updatedproductForm) {
            updatedFormElement = {
                ...updatedproductForm[formElementIdentifier]
            };
            if (formElementIdentifier === "colors") {
                // updatedFormElement.value = res;
                updatedFormElement.elementConfig.options = res;
                updatedproductForm[formElementIdentifier] = updatedFormElement;
            }
            if (formElementIdentifier === "productType") {
                updatedFormElement.elementConfig.options = res1;
                updatedproductForm[formElementIdentifier] = updatedFormElement;
            }
            if (formElementIdentifier === "sizes") {
                // updatedFormElement.value = res2;
                updatedFormElement.elementConfig.options = res2;
                updatedproductForm[formElementIdentifier] = updatedFormElement;
            }
        }
        this.setState({ productForm: updatedproductForm })
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
            productType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                    ]
                },
                value: "",
                validation: {},
                valid: true
            },
            sizes: {
                elementType: 'multiselect',
                elementConfig: {
                    options: [
                    ]
                },
                value: [],
                validation: {},
                valid: true
            },
            colors: {
                elementType: 'multiselect',
                elementConfig: {
                    options: [
                    ]
                },
                value: [],
                validation: {},
                valid: true
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
            discount: {
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
        album: null,
        dropdowns: null,
        topsizes: null,
        bottomsizes: null,
        shoesizes: null

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
        data.append('quantity', formData.quantity);
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

        if (inputIdentifier === 'sizes') {
            console.log('in sizes')
            console.log(updatedFormElement.value)
        }

        if (inputIdentifier === 'productType') {
            console.log(updatedFormElement.value)
            if (updatedFormElement.value === 'Tops') {
                console.log("aya ae")
                const updatedproductForm = {
                    ...this.state.productForm
                };
                const updatedFormElement = {
                    ...updatedproductForm["sizes"]
                };

                updatedFormElement.elementConfig.options = this.state.topsizes;
                updatedproductForm["sizes"] = updatedFormElement;
            } else if (updatedFormElement.value === 'Bottoms') {
                console.log("aya ae")
                const updatedproductForm = {
                    ...this.state.productForm
                };
                const updatedFormElement = {
                    ...updatedproductForm["sizes"]
                };

                console.log(this.state.topsizes)

                updatedFormElement.elementConfig.options = this.state.bottomsizes;
                updatedproductForm["sizes"] = updatedFormElement;
            } else if (updatedFormElement.value === 'Footwear') {
                console.log("aya ae")
                const updatedproductForm = {
                    ...this.state.productForm
                };
                const updatedFormElement = {
                    ...updatedproductForm["sizes"]
                };

                console.log(this.state.shoesizes)

                updatedFormElement.elementConfig.options = this.state.shoesizes;
                updatedproductForm["sizes"] = updatedFormElement;
            }
        }

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
        dropdowns: state.FetchProductDropdowns.dropdowns,
        token: state.Auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchdropdowns: (token) => dispatch(actions.Fetchproductdropdowns(token)),
        onaddProduct: (token, productData) => dispatch(actions.AddProduct(token, productData)),
        onaddProductMsg: () => dispatch(actions.AddProductMsg())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);