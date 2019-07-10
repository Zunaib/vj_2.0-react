import React, { Component } from 'react';
import classes from './BlogCard.css';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../../../Store/Actions/index';
class BlogCard extends Component {

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

        this.props.likeblog(this.props.token, this.props.bid)
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

        let imgurl = 'http://localhost:5000' + this.props.thumbnail;

        let sectionStyle = {
            'backgroundImage': "url(" + imgurl + ")"
        };

        return (
            <div className={classes.BlogCard} style={sectionStyle}>
                <div className={classes.Image}>
                    <NavLink className={classes.Link} to={"/dashboard/blogs/" + this.props.bid}>

                        <div className={classes.BlogCardText}>
                            <h4><b>{this.props.title}</b></h4>
                            <div>
                                {this.props.description}
                            </div>
                        </div>
                    </NavLink>
                    <div className={classes.BlogCardInfo}>
                        <div className={classes.BlogCardButton}>
                            <i className={this.state.favorited ? "fas fa-heart" : "far fa-heart"} onClick={this.favorited}></i>
                        </div>
                    </div>
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
        likeblog: (token, blogId) => dispatch(actions.LikeBlog(token, blogId)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard);