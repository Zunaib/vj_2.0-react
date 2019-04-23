import React, { Component } from 'react'
import classes from './Product.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
// import display from '../../../assets/images/testimg.jpg';
// import ProductCard from '../../../components/UI/Card/Product/ProductCard';
class Product extends Component {

    state = {
        product: null
    }

    componentWillMount() {
        let str = window.location.href;
        let res = str.split("http://localhost:3000/dashboard/products/");
        const productid = res[1];
        this.setState({ product: productid })
        if (this.props.token) {
            this.props.onfetchcurrentproduct(this.props.token, productid)
        }
    }

    addtocart = () => {
        this.props.onaddtocart(this.props.token, this.state.product);
    }
    render() {

        // let productid = this.state.product;

        // let path = "/dashboard/" + productid + "/handle_product";

        let productdata = null;
        if (this.props.loading) {
            productdata = <Spinner />
        } else {
            let product = this.props.currentproduct
            let product_thumbnail = 'http://localhost:5000' + product.images[0];
            productdata = (
                <Auxilary>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumImage} >
                            <img src={product_thumbnail} alt="Product_Thumbnail" />
                        </div>
                        <div className={classes.AlbumInfo}>
                            <h1>{product.productName}</h1> <h3><small>Rs</small> {product.price}</h3>
                            <div className={classes.Desc}>
                                <h4>Description</h4>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
                            </p>
                            </div>

                            <div className={classes.Desc}>
                                <h4>Designer Information</h4>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                            </div>

                            <div className={classes.Desc}>
                                <h4>Product Details</h4>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                            </div>
                            <Button btnType="WebButton" clicked={this.addtocart} >Add To Cart</Button>
                        </div>
                    </div>

                </Auxilary>

            )
        }
        return (
            <div className={classes.Main}>
                <div className={classes.Album}>
                    {productdata}
                </div>

                <div className={classes.ProfileWork}>
                    <div className={classes.WorkButtons}>
                        <div className={classes.Workbutton} >
                            <i className="fas fa-truck"></i>
                        </div>
                        <div className={classes.Workbutton}>
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className={classes.Workbutton}>
                            <i className="fas fa-copyright"></i>
                        </div>
                    </div>
                </div>


                <div className={classes.Album_Bottom}>
                    <div className={classes.WorkDisplay}>
                        <div className={classes.Work}>
                            <h2>More Products From This Designer :</h2>
                            <div className={classes.Content}>
                                {/* <div >
                                        <i className="fas fa-plus"></i>
                                    </div> */}
                                <div className={classes.Collections}>
                                    {/* <ProductCard />
                                    <ProductCard />
                                    <ProductCard />
                                    <ProductCard /> */}

                                </div>
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
        token: state.Auth.token,
        currentproduct: state.CurrentProduct.currentproduct,
        loading: state.CurrentProduct.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentproduct: (token, productid) => dispatch(actions.FetchSingleProduct(token, productid)),
        onaddtocart: (token, productid) => dispatch(actions.AddToCart(token, productid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
