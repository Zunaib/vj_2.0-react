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

import Select from 'react-select';
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

    async setdropdowns() {
        let updatedproductForm = {
            ...this.state.productForm
        };
        let updatedFormElement;
        // var colors = this.state.dropdowns[0].values;
        // var productTypes = this.state.dropdowns[3].values;
        // var shoesizes = this.state.dropdowns[1].values;
        // var topsizes = this.state.dropdowns[2].values;
        // var bottomsizes = this.state.dropdowns[4].values;

        var colors, productTypes, shoesizes, topsizes, bottomsizes;

        await this.state.dropdowns.map(dropdown => {
            if (dropdown.dropdownName === "Colors") {
                return colors = dropdown.values;
            } else if (dropdown.dropdownName === "ProductType") {
                return productTypes = dropdown.values;
            } else if (dropdown.dropdownName === "ShoeSizes") {
                return shoesizes = dropdown.values;
            } else if (dropdown.dropdownName === "TopSizes") {
                return topsizes = dropdown.values;
            } else if (dropdown.dropdownName === "BottomSizes") {
                return bottomsizes = dropdown.values;
            }
            return null;
        })

        var colorsdrop = [];
        var productTypesdrop = [];
        var shoesizesdrop = [];
        var topsizesdrop = [];
        var bottomsizesdrop = [];

        for (var i = 0; i < colors.length; i++) {
            var o = {};
            o["value"] = colors[i];
            o["label"] = colors[i];
            colorsdrop.push(o);
        }
        this.setState({ colors: colorsdrop })


        for (i = 0; i < productTypes.length; i++) {
            o = {};
            o["displayValue"] = productTypes[i];
            o["value"] = productTypes[i];
            productTypesdrop.push(o);
        }
        this.setState({ productTypes: productTypesdrop })

        for (i = 0; i < shoesizes.length; i++) {
            o = {};
            o["value"] = shoesizes[i];
            o["label"] = shoesizes[i];
            shoesizesdrop.push(o);
        }
        this.setState({ shoesizes: shoesizesdrop })

        for (i = 0; i < topsizes.length; i++) {
            o = {};
            o["value"] = topsizes[i];
            o["label"] = topsizes[i];
            topsizesdrop.push(o);
        }
        this.setState({ topsizes: topsizesdrop })

        for (i = 0; i < bottomsizes.length; i++) {
            o = {};
            o["value"] = bottomsizes[i];
            o["label"] = bottomsizes[i];
            bottomsizesdrop.push(o);
        }
        this.setState({ bottomsizes: bottomsizesdrop })



        for (let formElementIdentifier in updatedproductForm) {
            updatedFormElement = {
                ...updatedproductForm[formElementIdentifier]
            };
            if (formElementIdentifier === "productType") {
                updatedFormElement.elementConfig.options = productTypesdrop;
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
                    required: true,
                    minLength: 5,
                    maxLength: 40
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
                    required: true,
                    minLength: 10,
                    maxLength: 200
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
                value: "Tops",
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
                    type: 'text',
                    placeholder: 'Product Price',
                    minLength: 2,
                    maxLength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        selectedFiles: null,
        selectedsnacks: null,
        selectedFilesURL: null,
        files: false,
        maxselected: false,
        album: null,
        dropdowns: null,
        productTypes: null,
        sizes: null,
        topsizes: null,
        bottomsizes: null,
        shoesizes: null,
        selectedSizes: [],
        selectedColors: [],
        colors: null

    }

    maxSelectFile = (event) => {
        let files = event.target.files // create file object
        if (files.length <= 5 && files.length >= 1) {
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

        let sizesArray = [];
        this.state.selectedSizes.map(size => {
            return sizesArray.push(size.value);
        })
        let colorsArray = [];
        this.state.selectedColors.map(color => {
            return colorsArray.push(color.value);
        })

        console.log(sizesArray)
        console.log(colorsArray)

        data.append('productName', formData.name);
        data.append('type', formData.productType);
        data.append('description', formData.description);
        // data.append('quantity', formData.quantity);
        data.append('price', formData.price);
        // data.append('discount', formData.discount);
        data.append('sizes', sizesArray);
        data.append('colors', colorsArray);


        if (this.state.formIsValid && this.state.files && this.state.selectedColors && this.state.selectedSizes) {
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

        if (inputIdentifier === 'productType') {
            console.log(updatedFormElement.value)
            if (updatedFormElement.value === 'Tops') {
                this.setState({ sizes: "Tops", selectedSizes: [] });
            } else if (updatedFormElement.value === 'Bottoms') {
                this.setState({ sizes: "Bottoms", selectedSizes: [] });
            } else if (updatedFormElement.value === 'Footwear') {
                this.setState({ sizes: "Footwear", selectedSizes: [] });
            }
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedproductForm) {
            formIsValid = updatedproductForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ productForm: updatedproductForm, formIsValid: formIsValid });
    }

    handleSizesChange = (selectedOptions) => {
        this.setState({ selectedSizes: selectedOptions });
        console.log(`Option selected:`, selectedOptions);
    };
    handleColorsChange = (selectedOptions) => {
        this.setState({ selectedColors: selectedOptions });
        console.log(`Option selected:`, selectedOptions);
    };

    onaddPMsg = () => {
        this.setState({ maxselected: false })
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

                <FileUploader clicked={this.fileSelectedHandler}
                    text={
                        this.state.selectedFiles ? this.state.selectedFiles.length + " Images Selected"
                            : "Select Upto 5 Images"} />
                <Button btnType="WebButton" >Add Product</Button>
            </form>


        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let sizes = this.state.topsizes;
        if (this.state.sizes === "Tops") {
            sizes = this.state.topsizes;
        } else if (this.state.sizes === "Bottoms") {
            sizes = this.state.bottomsizes;
        } else if (this.state.sizes === "Footwear") {
            sizes = this.state.shoesizes;
        }

        let productimages = null;
        if (this.state.selectedFiles) {
            productimages = (<div className={classes.Images}>
                <div className={classes.Dropdowns}>
                    <h4>Product Sizes</h4>
                    <Select
                        isMulti
                        isSearchable
                        className={classes.Select}
                        value={this.state.selectedSizes}
                        onChange={this.handleSizesChange}
                        options={sizes}
                    />
                </div>
                <div className={classes.Dropdowns}>
                    <h4>Product Colors</h4>
                    <Select
                        isMulti
                        isSearchable
                        className={classes.Select}
                        value={this.state.selectedColors}
                        onChange={this.handleColorsChange}
                        options={this.state.colors}
                    />
                </div>
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
                <div className={classes.Dropdowns}>
                    <h4>Sizes</h4>
                    <Select
                        isMulti
                        isSearchable
                        className={classes.Select}
                        value={this.state.selectedSizes}
                        onChange={this.handleSizesChange}
                        options={sizes}
                    />
                </div>
                <div className={classes.Dropdowns}>
                    <h4>Colors</h4>
                    <Select
                        isMulti
                        isSearchable
                        className={classes.Select}
                        value={this.state.selectedColors}
                        onChange={this.handleColorsChange}
                        options={this.state.colors}
                    />
                </div>
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
        if (this.state.maxselected) {
            imgsnack = (<Snack message={'Images Added: ( ' + this.state.selectedFiles.length + ' )'} snackType="success" refresh={this.onaddPMsg} />);
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