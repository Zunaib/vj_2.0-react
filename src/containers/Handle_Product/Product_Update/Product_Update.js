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
import Snack from '../../../components/UI/SnackBar/Snackbar';
import Select from 'react-select';

class Product extends Component {


    componentDidMount() {
        let str = window.location.href.split("/")[6];
        this.props.onfetchcurrentproduct(this.props.token, str)
        this.props.fetchdropdowns(this.props.token);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentproduct !== prevState.product) {
            return { product: nextProps.currentproduct };
        }
        if (nextProps.dropdowns !== prevState.dropdowns) {
            return { dropdowns: nextProps.dropdowns };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentproduct !== this.props.currentproduct) {
            //Perform some operation here
            this.setState({ album: this.props.currentproduct });
            this.setData();
        }

        if (prevProps.dropdowns !== this.props.dropdowns) {
            //Perform some operation here
            this.setState({ dropdowns: this.props.dropdowns });
            this.setdropdowns();
        }
    }

    setData() {

        let prevProduct = this.state.product;

        const updatedcolors = [
            ...this.state.selectedColors
        ];
        var colors = prevProduct.colors;
        for (var i = 0; i < colors.length; i++) {
            var o = {};
            o["value"] = colors[i];
            o["label"] = colors[i];
            updatedcolors.push(o);
        }
        const updatedsizes = [
            ...this.state.selectedSizes
        ];
        var sizes = prevProduct.sizes;
        for (var k = 0; k < sizes.length; k++) {
            var j = {};
            j["value"] = sizes[k];
            j["label"] = sizes[k];
            updatedsizes.push(j);
        }
        this.setState({ selectedColors: updatedcolors, selectedSizes: updatedsizes })


        const updatedproductForm = {
            ...this.state.productForm
        };

        const formElements = ['name', 'description', 'productType', 'price'];
        const formElementsIncoming = ['productName', 'description', 'productType', 'price'];


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

    async setdropdowns() {
        let updatedproductForm = {
            ...this.state.productForm
        };
        let updatedFormElement;


        var colors, productTypes, shoesizes, topsizes, bottomsizes;

        await this.state.dropdowns.map(dropdown => {
            if (dropdown.dropdownName === "Colors") {
                colors = dropdown.values;
            } else if (dropdown.dropdownName === "ProductType") {
                productTypes = dropdown.values;
            } else if (dropdown.dropdownName === "ShoeSizes") {
                shoesizes = dropdown.values;
            } else if (dropdown.dropdownName === "TopSizes") {
                topsizes = dropdown.values;
            } else if (dropdown.dropdownName === "BottomSizes") {
                bottomsizes = dropdown.values;
            }
            return null
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
                    required: true,
                    minLength: 1,
                    maxLength: 100,
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
        product: null,
        productimages: null,
        productid: window.location.href.split("/")[6],
        dropdowns: null,
        productTypes: null,
        sizes: null,
        topsizes: null,
        bottomsizes: null,
        shoesizes: null,
        selectedSizes: [],
        selectedColors: [],
        colors: null,
        dropchanges: false
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
        const formElements = ['name', 'description', 'productType', 'price'];
        const formElementsIncoming = ['productName', 'description', 'productType', 'price'];
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

        data.append('productId', prevProduct._id);
        data.append('productName', formData.name);
        data.append('productType', formData.productType)
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('sizes', sizesArray);
        data.append('colors', colorsArray);

        if ((this.state.formIsValid && action) || this.state.dropchanges) {
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


        if (inputIdentifier === 'productType') {
            console.log(updatedFormElement.value)
            if (updatedFormElement.value === 'Tops') {
                this.setState({ sizes: "Tops", selectedSizes: [] });
            } else if (updatedFormElement.value === 'Bottoms') {
                this.setState({ sizes: "Bottoms", selectedSizes: [] });
            } else if (updatedFormElement.value === 'Footwear') {
                this.setState({ sizes: "Footwear", selectedSizes: [] });
            }


            let prevProduct = this.state.product;
            console.log(prevProduct)
            if (prevProduct.productType === updatedFormElement.value) {
                const updatedsizes = [
                    ...this.state.selectedSizes
                ];
                var sizes = prevProduct.sizes;
                for (var k = 0; k < sizes.length; k++) {
                    var j = {};
                    j["value"] = sizes[k];
                    j["label"] = sizes[k];
                    updatedsizes.push(j);
                }
                this.setState({ selectedSizes: updatedsizes })
            }

        }

        let formIsValid = true;
        for (let inputIdentifier in updatedproductForm) {
            formIsValid = updatedproductForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ productForm: updatedproductForm, formIsValid: formIsValid });
    }

    handleSizesChange = (selectedOptions) => {
        this.setState({ selectedSizes: selectedOptions, dropchanges: true });
        console.log(`Option selected:`, selectedOptions);
    };
    handleColorsChange = (selectedOptions) => {
        this.setState({ selectedColors: selectedOptions, dropchanges: true });
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
                            : "Click To Change Images"} />
                <Button btnType="WebButton" >Update Product</Button>
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
        } else if (this.state.productimages) {
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



        let imgsnack = null;
        if (this.state.maxselected) {
            imgsnack = (<Snack message={'Images Added: ( ' + this.state.selectedFiles.length + ' )'} snackType="success" refresh={this.onaddPMsg} />);
        }

        let updateprod = null;
        if (this.props.updated) {
            updateprod = (<Snack message={"Product Successfully Updated"} snackType="success" refresh={this.props.onupdateMsg} />);
        }


        return (
            <div className={classes.Main}>
                {updateprod}
                {imgsnack}
                {this.props.updated ? <Redirect to={"/dashboard/products/" + this.state.productid} /> : null}
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
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
        dropdowns: state.FetchProductDropdowns.dropdowns,
        loading: state.ViewProduct.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchdropdowns: (token) => dispatch(actions.Fetchproductdropdowns(token)),
        onfetchcurrentproduct: (token, productid) => dispatch(actions.FetchProduct(token, productid)),
        onupdatecurrentproduct: (token, productid) => dispatch(actions.UpdateProduct(token, productid)),
        onupdateMsg: () => dispatch(actions.UpdateProductMsg())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);