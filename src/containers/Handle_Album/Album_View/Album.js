import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import classes from './Album.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import AlbumProducts from '../../../components/AlbumProducts/AlbumProducts';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';

class Album extends Component {

    state = {
        albumid: null,
        delete: null
    }

    componentDidMount() {
        let str = window.location.href;
        let res = str.split("http://localhost:3000/dashboard/albums/");
        const albumid = res[1];
        this.setState({ albumid: albumid })
        this.props.onfetchcurrentalbum(this.props.token, albumid);

    }

    albumdelete = () => {
        this.props.onalbumdelete(this.props.token, this.state.albumid)
    }
    render() {
        let albumid = this.state.albumid;

        let path = "/dashboard/" + albumid + "/handle_product";

        let albumdata = <Spinner />;
        if (!this.props.loading) {
            let album = this.props.currentalbum
            let album_thumbnail = 'http://localhost:5000' + album.thumbnail;
            albumdata = (
                <Auxilary>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>{album.title}</h1> <h2>{album.season + ' ' + album.year}</h2>
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
                                        {/* <NavLink to={path} >
                                            
                                        </NavLink> */}

                                        <NavLink to={path}>
                                            <div className={classes.AddProductButton}>
                                                <h4>Add Product</h4>
                                                <i className="fas fa-plus"></i>
                                            </div>
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
            );
        }


        let editpath = '/dashboard/handle_album/update_album/' + this.state.albumid;
        return (
            <div className={classes.Main}>
                {this.props.deleted ? <Redirect to="/dashboard/designer" /> : null}
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <div className={classes.SettingButton}>
                        <Settings editpath={editpath} delete={this.albumdelete} />
                    </div>
                    {albumdata}

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        currentalbum: state.ViewAlbum.currentalbum,
        currentalbumproducts: state.ViewAlbum.currentalbumproducts,
        loading: state.ViewAlbum.loading,
        deleted: state.DeleteAlbum.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentalbum: (token, albumid) => dispatch(actions.FetchAlbum(token, albumid)),
        onalbumdelete: (token, albumid) => dispatch(actions.DeleteAlbum(token, albumid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);

