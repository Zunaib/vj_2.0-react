import React, { Component } from 'react';
import classes from './Vlog.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import ReactPlayer from 'react-player'
import { NavLink, Redirect } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
import Snack from '../../../components/UI/SnackBar/Snackbar';
import Comment from "../../../components/UI/Comment/Comment";

// import video from '../../../assets/images/Vid.mp4'

class Vlog extends Component {
    state = {
        vlogid: window.location.href.split("http://localhost:3000/dashboard/vlogs/")[1],
        delete: null
    }

    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/vlogs/")[1];
        this.props.onfetchcurrentvlog(this.props.token, str);
    }

    vlogdelete = () => {
        this.props.onvlogdelete(this.props.token, this.state.vlogid)
    }
    render() {
        const videostyles = {
            playing: true,
            controls: true,
            volume: 0,
            width: "100%",
            height: "auto"
        }



        let vlogdata = null;
        if (this.props.loading) {
            vlogdata = <Spinner />
        } else {
            let vlog = this.props.currentvlog
            let video = 'http://localhost:5000' + vlog.videoLink;
            let editpath = '/dashboard/handle_vlog/update_vlog/' + this.state.vlogid;

            let settingbutton = null;
            if (vlog) {
                if (this.props.userId === vlog.userId) {
                    console.log('can edit');
                    settingbutton = (
                        <div className={classes.SettingButton}>
                            <Settings editpath={editpath} delete={this.vlogdelete} />
                        </div>
                    );
                }
            }

            let vlogcomments = "No Comments Yet, Be The First One To Add";
            if (vlog) {
                vlogcomments = (vlog.comments.map((comment, index) => (
                    <div className={[classes.Comment]} key={comment._id}>
                        <h3>{comment.userId.firstName + " " + comment.userId.lastName}</h3>
                        <p>{comment.comment}</p>
                    </div>
                )));

            }

            vlogdata = (
                <Auxilary>
                    <NavLink to="/dashboard">
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    {settingbutton}
                    <div className={classes.Album_Top}>
                        {/* <div className={classes.AlbumInfo}>
                            <h1>Test1</h1> <h2>Test2</h2>
                            <div className={classes.Desc}>
                                Desx
                            </div>
                        </div> */}
                        <div className={classes.AlbumImage} >
                            <ReactPlayer url={video} {...videostyles} />
                            <h2>{vlog.title}</h2>
                            <h4>{vlog.description}</h4>
                            <h5>Views</h5>
                        </div>
                        {/* <div className={classes.AlbumImageSide} >
                            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' height="100px" width="180px" />
                            <h2>Name</h2>
                            <h5>Author</h5>
                            <h5>Views</h5>
                        </div> */}
                    </div>
                    <div className={classes.Feedback}>
                        <h2>Comments</h2>
                        <div className={classes.Comments}>
                            {vlogcomments}
                        </div>
                        <div className={classes.EnterComment}>
                            <h4>Enter Comment :</h4>
                            <Comment />
                        </div>
                    </div>
                </Auxilary>

            )
        }
        let delvlog = null;
        if (this.props.deleted) {
            delvlog = (<Snack message={"Vlog Successfully Deleted"} snackType="success" refresh={this.props.onvlogdeleteMsg} />);

        }

        return (
            <div className={classes.Main}>
                {delvlog}
                {this.props.deleted ? <Redirect to="/dashboard/designer" /> : null}
                <div className={classes.Album}>

                    {vlogdata}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        userId: state.Auth.userId,
        currentvlog: state.ViewVlog.currentvlog,
        loading: state.ViewVlog.loading,
        deleted: state.DeleteVlog.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentvlog: (token, vlogid) => dispatch(actions.FetchSingleVlog(token, vlogid)),
        onvlogdelete: (token, vlogid) => dispatch(actions.DeleteVlog(token, vlogid)),
        onvlogdeleteMsg: () => dispatch(actions.DeleteVlogMsg()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vlog);

