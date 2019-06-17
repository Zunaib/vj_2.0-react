import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import classes from './Album.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import AlbumProducts from '../../../components/AlbumProducts/AlbumProducts';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
import Snack from '../../../components/UI/SnackBar/Snackbar'

class Album extends Component {

    state = {
        albumid: window.location.href.split("http://localhost:3000/dashboard/albums/")[1],
        delete: null
    }

    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/albums/");
        this.props.onfetchcurrentalbum(this.props.token, str[1]);
    }

    albumdelete = () => {
        this.props.onalbumdelete(this.props.token, this.state.albumid)
    }
    render() {
        let albumid = this.state.albumid;
        let album = this.props.currentalbum;
        let albumdata = <Spinner />;
        if (!this.props.loading) {
            let album_thumbnail = 'http://localhost:5000' + album.thumbnail;

            let addalbumproduct = null;
            let path = "/dashboard/" + albumid + "/handle_product";

            if (album) {
                if (this.props.userId === album.userId) {
                    addalbumproduct = (
                        <NavLink to={path}>
                            <div className={classes.AddProductButton}>
                                <h4>Add Product</h4>
                                <i className="fas fa-plus"></i>
                            </div>
                        </NavLink>
                    );
                }
            }


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
                                        {addalbumproduct}
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
        let settingbutton = null;
        if (album) {
            if (this.props.userId === album.userId) {
                console.log('can edit');
                settingbutton = (
                    <div className={classes.SettingButton}>
                        <Settings editpath={editpath} delete={this.albumdelete} />
                    </div>
                );
            }
        }

        let albumdel = null;
        if (this.props.deleted) {
            albumdel = (<Snack message={"Album Successfully Deleted"} snackType="success" refresh={this.props.onalbumdeleteMsg} />);

        }

        return (
            <div className={classes.Main}>
                {albumdel}
                {this.props.deleted ? <Redirect to="/dashboard/designer" /> : null}
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    {settingbutton}
                    {albumdata}

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        userId: state.Auth.userId,
        currentalbum: state.ViewAlbum.currentalbum,
        currentalbumproducts: state.ViewAlbum.currentalbumproducts,
        loading: state.ViewAlbum.loading,
        deleted: state.DeleteAlbum.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentalbum: (token, albumid) => dispatch(actions.FetchAlbum(token, albumid)),
        onalbumdelete: (token, albumid) => dispatch(actions.DeleteAlbum(token, albumid)),
        onalbumdeleteMsg: (token, albumid) => dispatch(actions.DeleteAlbumMsg(token, albumid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);

