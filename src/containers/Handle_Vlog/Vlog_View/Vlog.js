import React, { Component } from 'react';
import classes from './Vlog.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import ReactPlayer from 'react-player'
import { NavLink, Redirect } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';

// import video from '../../../assets/images/Vid.mp4'

class Vlog extends Component {
    state = {
        vlogid: null,
        delete: null
    }

    componentDidMount() {
        let str = window.location.href;
        let res = str.split("http://localhost:3000/dashboard/vlogs/");
        const vlogid = res[1];
        this.setState({ vlogid: vlogid })
        this.props.onfetchcurrentvlog(this.props.token, vlogid);
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
            vlogdata = (
                <Auxilary>
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
                </Auxilary>

            )
        }


        let editpath = '/dashboard/handle_vlog/update_vlog/' + this.state.vlogid;
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
                        <Settings editpath={editpath} delete={this.vlogdelete} />
                    </div>
                    {vlogdata}
                    {/* <NavLink to="/dashboard/designer">
                        <div className={classes.Edit}>
                            <i className="far fa-edit"></i>
                        </div>
                    </NavLink>
              
                    <NavLink to="" onClick={this.albumdelete} >
                        <div className={classes.Remove} >
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink> */}

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        currentvlog: state.ViewVlog.currentvlog,
        loading: state.ViewVlog.loading,
        deleted: state.DeleteVlog.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentvlog: (token, vlogid) => dispatch(actions.FetchSingleVlog(token, vlogid)),
        onvlogdelete: (token, vlogid) => dispatch(actions.DeleteVlog(token, vlogid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vlog);

