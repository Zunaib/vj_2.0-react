import React, { Component } from 'react';
import classes from './ModifiedCard.css';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../../Store/Actions/index';
class VlogCard extends Component {

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

        this.props.likevlog(this.props.token, this.props.vid)
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
        const videostyles = {
            playing: false,
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

                    {this.props.show ?
                        <div className={classes.CardButton} >
                            <span>
                                {this.state.length}
                            </span>
                            <i className="fas fa-heart">
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
        likevlog: (token, vlogId) => dispatch(actions.LikeVlog(token, vlogId)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VlogCard);