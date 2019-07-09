import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ModifiedCard.css';
import { connect } from 'react-redux';
import * as actions from '../../../../Store/Actions/index';

class ProductCard extends Component {

    state = {
        favorited: false,
        length: 0
    }

    favorited = () => {
        this.setState((prevState) => {

            if (prevState.favorited === true) {
                return { favorited: !prevState.favorited, length: prevState.length - 1 }
            }

            return { favorited: !prevState.favorited, length: prevState.length + 1 }

        })

        this.props.likeproduct(this.props.token, this.props.pid)
    }

    componentDidMount() {
        if (this.props.likes) {
            let len = this.props.likes.length;
            let like = false;
            like = this.props.likes.indexOf(this.props.loggedinsettings[0]._id) > -1;
            this.setState({ favorited: like, length: len })
        }

    }

    render() {

        let imgpath = 'http://localhost:5000' + this.props.images[0];
        return (
            <div className={classes.ProductCard} >
                <NavLink className={classes.Link} to={"/dashboard/products/" + this.props.pid}>
                    <img src={imgpath} alt="" />
                    <div className={classes.CardText}>
                        <h4><b>{this.props.name}</b></h4>
                    </div>
                </NavLink>

                <div className={classes.CardInfo}>
                    <NavLink className={classes.Link} to={"/dashboard/products/" + this.props.pid}>
                        <div className={classes.CardPrice}>
                            <h4>Pkr {this.props.price}</h4>
                        </div>
                    </NavLink>

                    {this.props.show ?
                        <div className={classes.CardButton} >
                            <span>
                                {this.state.length}
                            </span>
                            <i className="fas fa-thumbs-up">
                            </i>
                        </div>
                        :
                        null
                    }

                </div>
            </div>
        );
    }
};



const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        loggedinsettings: state.UserSettings.settings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likeproduct: (token, productId) => dispatch(actions.LikeProduct(token, productId)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);