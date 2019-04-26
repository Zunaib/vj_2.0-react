import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Album.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import AlbumProducts from '../../../components/AlbumProducts/AlbumProducts';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Album extends Component {

    state = {
        album: null,
        delete: null
    }

    componentWillMount() {
        let str = window.location.href;
        let res = str.split("http://localhost:3000/dashboard/albums/");
        const albumid = res[1];
        this.setState({ album: albumid })
        if (this.props.token) {
            this.props.onfetchcurrentalbum(this.props.token, albumid);
        }
    }

    albumdelete = () => {
        this.props.onalbumdelete(this.props.token, this.state.album)
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
                    <NavLink to="/dashboard/designer">
                        <div className={classes.Edit}>
                            <i className="far fa-edit"></i>
                        </div>
                    </NavLink>
                    {/* to="/dashboard/designer" */}
                    <NavLink to="" onClick={this.albumdelete} >
                        <div className={classes.Remove} >
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>

                    <div className={classes.Album_Bottom}>
                        <div className={classes.WorkDisplay}>
                            <div className={classes.Work}>
                                <h2>Album Products</h2>
                                <div className={classes.Content}>
                                    <div className={classes.Add} >
                                        <NavLink to={path} >
                                            <i className="fas fa-plus"></i>
                                        </NavLink>
                                    </div>
                                    <div className={classes.AlbumProducts}>
                                        <AlbumProducts products={this.props.currentalbumproducts} loading={this.props.loading} />
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
                    <NavLink to="/dashboard/designer">
                        <div className={classes.cross}>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
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
        currentalbumproducts: state.CurrentAlbum.currentalbumproducts,
        loading: state.CurrentAlbum.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentalbum: (token, albumid) => dispatch(actions.FetchSingleAlbum(token, albumid)),
        onalbumdelete: (token, albumid) => dispatch(actions.DeleteAlbum(token, albumid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);

