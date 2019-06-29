import React, { Component } from 'react';
import classes from './Cart.css';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';

class Cart extends Component {

    render() {

        let imgpath = 'http://localhost:5000' + this.props.images[0];

        return (
            <tr className={classes.TbTr} >
                <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                    <div className={classes.AlbumImage} >
                        <img src={imgpath} alt="Cart_Product_Thumbnail" />
                    </div>
                </td>
                <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                    <span>
                        <Link to="#product" className={classes.ThTrTh11}>{this.props.name}</Link>
                        <br />
                        <small>by Dolce&Gabbana</small>
                    </span>
                </td>
                <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                  
                </td>
                <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                
                </td>
                <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                    <span>
                        <small>Rs </small>
                        {this.props.price}
                    </span>
                </td>
                <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh14].join(' ')}>


                </td>
                <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                    <div className={classes.QuanButtons} onClick={this.props.remove}>
                        <div className={classes.cross}>
                            <h4>Remove</h4>
                            <i className="fas fa-times"></i>
                        </div>

                    </div>

                </td>


            </tr>
        );
    }


};

const mapStateToProps = state => {
    return {
        token: state.Auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onremoveprroduct: (token, productid) => dispatch(actions.RemoveFromCart(token, productid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
