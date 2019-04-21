import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import classes from './LatestAlbums.css';
import { NavLink } from 'react-router-dom';
import AlbumCard from '../../UI/Card/Album/AlbumCard';

class LatestAlbums extends Component {

    send = (albumid) => {
        console.log(albumid);
        this.props.onsetcurrentalbum(albumid);
    }
    render() {
        const albums = this.props.albums;
        const cards = (albums.map((album, index = album._id) => (
            <NavLink className={classes.Link} to={"/dashboard/albums/" + album._id} key={album._id} onClick={() => this.send(album._id)}>
                <AlbumCard
                    key={album._id}
                    name={album.productName}
                    price={album.price}
                    images={album.images}
                />
            </NavLink>

        )));

        return (
            <div className={classes.Work}>
                <div className={classes.Content}>
                    <h3>Latest Collections</h3>
                    <div >
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className={classes.Collections}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }


};

// const mapStateToProps = state => {
//     return {
//         token: state.Auth.token,
//         profileproducts: state.DesignerProfile.profileproducts,
//         productloading: state.DesignerProfile.productloading,
//         producterror: state.DesignerProfile.producterror,
//         profilealbums: state.DesignerProfile.profilealbums,
//         albumloading: state.DesignerProfile.albumloading,
//         albumerror: state.DesignerProfile.albumerror

//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        onsetcurrentalbum: (album) => dispatch(actions.SetCurrentAlbum(album))
    }
}

export default connect(null, mapDispatchToProps)(LatestAlbums);