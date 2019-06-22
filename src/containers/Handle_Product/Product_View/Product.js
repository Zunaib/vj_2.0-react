import React, { Component } from 'react'
import classes from './Product.css';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
import Snack from '../../../components/UI/SnackBar/Snackbar';
import Comment from "../../../components/UI/Comment/Comment";
import ProductCard from '../../../components/UI/Card/Product/ProductCard';

class Product extends Component {

    state = {
        productid: window.location.href.split("http://localhost:3000/dashboard/products/")[1]
    }

    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/products/")[1];
        this.props.onfetchcurrentproduct(this.props.token, str)

    }

    addtocart = () => {
        this.props.onaddtocart(this.props.token, this.state.productid);
    }

    productdelete = () => {
        this.props.onproductdelete(this.props.token, this.state.productid)
    }
    render() {

        let productdata = null;
        if (this.props.loading) {
            productdata = <Spinner />
        } else {
            let product = this.props.currentproduct;
            let product_thumbnail = 'http://localhost:5000' + product.images[0];
            let editpath = '/dashboard/handle_product/update_product/' + this.state.productid;

            let settingbutton = null;
            let addtocartbutton = null;
            if (product) {
                if (this.props.userId === product.userId) {
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

            let productcomments = "No Comments Yet, Be The First One To Add";
            if (product) {
                productcomments = (product.comments.map((comment, index) => (
                    <div className={[classes.Comment]} key={comment._id}>
                        <h3>{comment.userId.firstName + " " + comment.userId.lastName}</h3>
                        <p>{comment.comment}</p>
                    </div>
                )));

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
                            <img src={product_thumbnail} alt="Product_Thumbnail" />
                        </div>
                        <div className={classes.AlbumInfo}>
                            <h1>{product.productName}</h1> <h3><small>Rs</small> {product.price}</h3>
                            <div className={classes.Desc}>
                                <h4>Description</h4>
                                <p>
                                    {product.description}
                                </p>
                            </div>

                            <div className={classes.Desc}>
                                <h4>Quantity</h4>
                                <h4>
                                    {product.quantity}
                                </h4>
                            </div>

                            <div className={classes.Desc}>
                                <h4>Available sizes</h4>
                                <p>
                                    {product.sizes}

                                </p>
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
        let addederror = null;
        if (this.props.addedtocarterror) {
            addederror = (<Snack message={"Item Already Added"} snackType="error" refresh={this.props.onaddtocartmsg} />);
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
                <NavLink className={classes.Link} to={"/dashboard/products/" + product._id} key={index}>
                    <ProductCard
                        key={product._id}
                        name={product.productName}
                        price={product.price}
                        images={product.images}
                    />
                </NavLink>

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
            <div className={classes.Main}>
                {added}
                {addederror}
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
        addedtocarterror: state.AddtoCart.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentproduct: (token, productid) => dispatch(actions.FetchProduct(token, productid)),
        onaddtocart: (token, productid) => dispatch(actions.AddToCart(token, productid)),
        onaddtocartmsg: () => dispatch(actions.AddToCartMsg()),
        onproductdelete: (token, productid) => dispatch(actions.DeleteProduct(token, productid)),
        ondelmsg: () => dispatch(actions.DeleteProductMsg())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
