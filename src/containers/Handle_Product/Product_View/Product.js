import React, { Component } from 'react'
import classes from './Product.css';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
// import display from '../../../assets/images/testimg.jpg';
// import ProductCard from '../../../components/UI/Card/Product/ProductCard';
class Product extends Component {

    state = {
        productid: null
    }

    componentDidMount() {
        let str = window.location.href;
        let res = str.split("http://localhost:3000/dashboard/products/");
        const productid = res[1];
        this.setState({ productid: productid })
        this.props.onfetchcurrentproduct(this.props.token, productid)

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
                            <Button btnType="WebButton" clicked={this.addtocart} >Add To Cart</Button>
                        </div>
                    </div>

                </Auxilary>

            )
        }


        let editpath = '/dashboard/handle_product/update_product/' + this.state.productid;
        return (
            <div className={classes.Main}>
                {this.props.deleted ? <Redirect to="/dashboard/designer" /> : null}
                <div className={classes.Album}>
                    <NavLink to="/dashboard">
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <div className={classes.SettingButton}>
                        <Settings editpath={editpath} delete={this.productdelete} />
                    </div>

                    {productdata}
                </div>

                {/* <div className={classes.ProfileWork}>
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
                </div> */}


                <div className={classes.Album_Bottom}>
                    <div className={classes.WorkDisplay}>
                        <div className={classes.Work}>
                            {/* <h2>More Products From This Designer :</h2> */}
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
        currentproduct: state.ViewProduct.currentproduct,
        loading: state.ViewProduct.loading,
        deleted: state.DeleteProduct.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentproduct: (token, productid) => dispatch(actions.FetchProduct(token, productid)),
        onaddtocart: (token, productid) => dispatch(actions.AddToCart(token, productid)),
        onproductdelete: (token, productid) => dispatch(actions.DeleteProduct(token, productid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
