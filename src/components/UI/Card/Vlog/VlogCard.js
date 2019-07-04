import React, { Component } from 'react';
import classes from './VlogCard.css';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../../Store/Actions/index';
class VlogCard extends Component {

    state = {
        favorited: false
    }

    favorited = () => {
        this.setState((prevState) => {
            return { favorited: !prevState.favorited }
        })

        this.props.likevlog(this.props.token, this.props.vid)
    }

    componentDidMount() {
        if (this.props.likes) {
            let like = false;
            like = (
                this.props.likes.map(lk => {
                    if (lk === this.props.loggedinsettings[0]._id) { like = true }
                    return like
                })
            );

            this.setState({ favorited: like[0] })
        }

    }


    render() {
        const videostyles = {
            playing: true,
            controls: true,
            volume: 0,
            width: "100%",
            height: "100%"
        }

        let video = 'http://localhost:5000' + this.props.videoLink;

        return (
            <div className={classes.VlogCard} >
                <NavLink className={classes.Link} to={"/dashboard/vlogs/" + this.props.vid}>
                    <ReactPlayer url={video} {...videostyles} />
                    <div className={classes.CardText}>
                        <h4><b>{this.props.title}</b></h4>
                        <div className={classes.Desc}>
                            {this.props.description}

                        </div>
                    </div>
                </NavLink>
                <div className={classes.CardInfo}>
                    <div className={classes.CardButton}>
                        <i className={this.state.favorited ? "fas fa-heart" : "far fa-heart"} onClick={this.favorited}></i>
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
        likevlog: (token, vlogId) => dispatch(actions.LikeVlog(token, vlogId)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VlogCard);