import React, { Component } from 'react'
import classes from './Product.css';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
import Snack from '../../../components/UI/SnackBar/Snackbar';
import Comment from "../../../components/UI/Comment/Comment";
import ProductCard from '../../../components/UI/Card/Product/ProductCard';
import Select from 'react-select';
import Slider from "react-slick";

import CartModel from '../../../components/UI/CartModel/CartModel';
import Continue from './Continue/Continue';

import Magnifier from "react-magnifier";

class Product extends Component {

    state = {
        productid: window.location.href.split("http://localhost:3000/dashboard/products/")[1],
        SelectedColor: null,
        SelectedSize: null,
        favorited: false,
        product: null,
        continueOpened: false

    }

    openModal = () => {
        this.setState({ continueOpened: true })
    }
    closeModal = () => {
        this.setState({ continueOpened: false })
    }

    favorited = () => {
        this.setState((prevState) => {
            return { favorited: !prevState.favorited }
        })

        this.props.AddtoFavorite(this.props.token, this.state.productid)
    }

    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/products/")[1];
        this.props.onfetchcurrentproduct(this.props.token, str)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentproduct !== prevState.product) {
            return { product: nextProps.currentproduct };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentproduct !== this.props.currentproduct) {
            //Perform some operation here
            this.setState({ product: this.props.currentproduct });
            this.setFav();
        }
    }

    setFav = () => {
        // console.log(this.props.currentproduct._id)
        // console.log(this.props.loggedinsettings[0].favoriteProducts)
        let favprod = this.props.loggedinsettings[0].favoriteProducts;

        if (favprod) {
            let fav = false;
            fav = favprod.indexOf(this.props.currentproduct._id) > -1;
            this.setState({ favorited: fav })
        }

    }


    handleColorChange = SelectedColor => {
        this.setState({ SelectedColor });
    };
    handleSizeChange = SelectedSize => {
        this.setState({ SelectedSize });
    };

    addtocart = () => {
        if (this.state.SelectedColor && this.state.SelectedSize) {
            this.props.onaddtocart(this.props.token, this.state.productid, this.state.SelectedColor.value, this.state.SelectedSize.value);
            this.setState({ SelectedColor: null, SelectedSize: null })
            this.openModal()
        }
    }

    productdelete = () => {
        this.props.onproductdelete(this.props.token, this.state.productid)
    }

    pushProduct = (id) => {
        this.props.history.push("/dashboard/products/" + id)
        this.props.onfetchcurrentproduct(this.props.token, id)
    }
    render() {

        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: true,
        };

        let productdata = null;
        if (this.props.loading) {
            productdata = <Spinner />
        } else {
            let product = this.props.currentproduct;
            let editpath = '/dashboard/handle_product/update_product/' + this.state.productid;

            let settingbutton = null;
            let addtocartbutton = null;
            let colorsdrop = [];
            let sizesdrop = [];



            if (product) {


                for (var i = 0; i < product.colors.length; i++) {
                    var o = {};
                    o["value"] = product.colors[i];
                    o["label"] = product.colors[i];
                    colorsdrop.push(o);
                }

                for (var k = 0; k < product.sizes.length; k++) {
                    var j = {};
                    j["value"] = product.sizes[k];
                    j["label"] = product.sizes[k];
                    sizesdrop.push(j);
                }


                if (this.props.userId === product.userId._id) {
                    settingbutton = (
                        <div className={classes.SettingButton}>
                            <Settings editpath={editpath} delete={this.productdelete} />
                        </div>
                    );
                } else {
                    addtocartbutton = (
                        <Button btnType="WebButton" clicked={this.addtocart} >Add To Cart</Button>
                    );
                }
            }

            let productcomments = (
                <div className={[classes.Comment]}>
                    <h3>No Comments Yet, Be The First One To Add</h3>
                </div>
            );
            if (product.comments) {
                if (product.comments.length > 0) {
                    productcomments = (product.comments.map((comment, index) => (
                        <div className={[classes.Comment]} key={comment._id}>
                            <h3>{comment.userId.firstName ? comment.userId.firstName + " " + comment.userId.lastName : "Anonymous"}</h3>
                            <p>{comment.comment}</p>
                        </div>
                    )));
                }
            }

            productdata = (
                <Auxilary>
                    <NavLink to="/dashboard">
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    {settingbutton}
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumImage} >
                            <Slider {...settings}>
                                {product.images.map((img, index) => {
                                    return <div key={index}>
                                        {/* <img src={'http://localhost:5000' + img} alt="Product_Thumbnail" /> */}
                                        <Magnifier src={'http://localhost:5000' + img} width={"100%"} mgWidth={300} mgHeight={300}
                                            zoomFactor={1} />
                                    </div>
                                })}
                            </Slider>
                            {/* <img src={product_thumbnail} alt="Product_Thumbnail" /> */}
                        </div>
                        <div className={classes.AlbumInfo}>
                            <h1>{product.productName}</h1> <h3><small>Rs</small> {product.price}</h3>
                            <div className={classes.Desc}>
                                <h4>Description</h4>
                                <p>
                                    {product.description}
                                </p>
                            </div>
                            <div className={classes.Fav}>
                                <h4>{this.state.favorited ? "Remove From Favorites" : "Add To Favorites"}:</h4>
                                <i className={this.state.favorited ? "fas fa-star" : "far fa-star"} onClick={this.favorited}></i>
                            </div>
                            <div className={classes.Fav}>
                                <h4>{"Designer: " + product.userId.firstName + " " + product.userId.lastName}</h4>
                            </div>

                            <div className={classes.Drops}>
                                <h4>Select Size</h4>
                                <Select
                                    className={classes.Select}
                                    value={this.state.SelectedSize}
                                    onChange={this.handleSizeChange}
                                    options={sizesdrop}
                                />
                            </div>

                            <div className={classes.Drops}>
                                <h4>Select Color</h4>
                                <Select
                                    className={classes.Select}
                                    value={this.state.SelectedColor}
                                    onChange={this.handleColorChange}
                                    options={colorsdrop}
                                />
                            </div>

                            {addtocartbutton}
                        </div>
                    </div>

                    <div className={classes.Feedback}>
                        <h2>Comments</h2>
                        <div className={classes.Comments}>
                            {productcomments}
                        </div>
                        <div className={classes.EnterComment}>
                            <h4>Enter Comment :</h4>
                            <Comment />
                        </div>
                    </div>

                </Auxilary>

            )
        }


        let added = null;
        if (this.props.addedtocart) {
            added = (<Snack message={"Item Successfully Added To Cart"} snackType="success" refresh={this.props.onaddtocartmsg} />);

        }

        let delprod = null;
        if (this.props.deleted) {
            delprod = (<Snack message={"Product Successfully Deleted"} snackType="success" refresh={this.props.ondelmsg} />);
        }

        let similar = null;
        let similarproducts = null;
        if (this.props.similarproducts !== null) {
            console.log("true")

            similar = (this.props.similarproducts.map((product, index = product._id) => (
                <div className={classes.Link} key={index} onClick={() => this.pushProduct(product._id)}>
                    <ProductCard
                        key={product._id}
                        pid={product._id}
                        likes={product.likes}
                        name={product.productName}
                        price={product.price}
                        images={product.images}
                    />
                </div>

            )));


            similarproducts = (
                <div className={classes.Work}>
                    <h2>More Products From This Designer :</h2>
                    <div className={classes.Content}>
                        <div className={classes.Collections}>
                            {similar}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <Auxilary>
                <CartModel show={this.state.continueOpened} modalClosed={this.closeModal} >
                    <Continue />
                </CartModel>
                <div className={classes.Main}>
                    {added}
                    {delprod}
                    {this.props.deleted ? <Redirect to="/dashboard/designer" /> : null}
                    <div className={classes.Album}>
                        {productdata}
                    </div>


                    <div className={classes.Album_Bottom}>
                        <div className={classes.WorkDisplay}>
                            {similarproducts}
                        </div>

                    </div>


                </div>
            </Auxilary>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        userId: state.Auth.userId,
        currentproduct: state.ViewProduct.currentproduct,
        similarproducts: state.ViewProduct.similarproducts,
        loading: state.ViewProduct.loading,
        deleted: state.DeleteProduct.deleted,
        addedtocart: state.AddtoCart.added,
        addedtocarterror: state.AddtoCart.error,
        loggedinsettings: state.UserSettings.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentproduct: (token, productid) => dispatch(actions.FetchProduct(token, productid)),
        onaddtocart: (token, productid, color, size) => dispatch(actions.AddToCart(token, productid, color, size)),
        onaddtocartmsg: () => dispatch(actions.AddToCartMsg()),
        onproductdelete: (token, productid) => dispatch(actions.DeleteProduct(token, productid)),
        AddtoFavorite: (token, productid) => dispatch(actions.AddtoFavorite(token, productid)),
        ondelmsg: () => dispatch(actions.DeleteProductMsg())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
