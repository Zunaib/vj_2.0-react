import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Album.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Spinner from '../../../components/UI/Spinner/Spinner';

class Album extends Component {

    state = {
        album: null
    }

    componentWillMount() {
        let str = window.location.href;
        let res = str.split("http://localhost:3000/dashboard/albums/");
        const albumid = res[1];
        this.setState({ album: albumid })
        if (this.props.token) {
            this.props.onfetchcurrentalbum(this.props.token, albumid)
        }
    }

    render() {
        let albumid = this.state.album;

        let path = "/dashboard/" + albumid + "/handle_product";

        let albumdata = null;
        if (this.props.loading) {
            albumdata = <Spinner />
        } else {
            let album = this.props.currentalbum
            let album_thumbnail = 'http://localhost:5000' + album.thumbnail;
            albumdata = (
                <Auxilary>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>{album.albumName}</h1> <h2>{album.season + ' ' + album.year}</h2>
                            <div className={classes.Desc}>
                                {album.description}
                            </div>
                        </div>
                        <div className={classes.AlbumImage} >
                            <img src={album_thumbnail} alt="Album_Thumbnail" />
                        </div>
                    </div>

                    <div className={classes.Album_Bottom}>
                        <div className={classes.WorkDisplay}>
                            <div className={classes.Work}>
                                <h2>Album Products</h2>
                                <div className={classes.Content}>
                                    <div className={classes.Add} >
                                        <NavLink to={path}>
                                            <i className="fas fa-plus"></i>
                                        </NavLink>
                                    </div>
                                    <div className={classes.AlbumProducts}>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </Auxilary>

            )
        }
        return (
            <div className={classes.Main}>
                <div className={classes.Album}>
                    {albumdata}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        currentalbum: state.CurrentAlbum.currentalbum,
        loading: state.CurrentAlbum.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentalbum: (token, albumid) => dispatch(actions.FetchSingleAlbum(token, albumid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);

