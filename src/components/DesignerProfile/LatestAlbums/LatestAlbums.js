import React, { Component } from 'react';
import classes from './LatestAlbums.css';
import { NavLink } from 'react-router-dom';
import AlbumCard from '../../UI/Card/Album/AlbumCard';

class LatestAlbums extends Component {
    render() {
        const albums = this.props.albums;
        const cards = (albums.map((album, index = album._id) => (
            <NavLink className={classes.Link} to={"/dashboard/albums/" + album._id} key={index}>
                <AlbumCard
                    key={index}
                    name={album.title}
                    season={album.season}
                    year={album.year}
                    thumbnail={album.thumbnail}
                />
            </NavLink>

        )));

        return (
            <div className={classes.Work}>
                <div className={classes.Content}>
                    <h3>Latest Albums</h3>
                    <NavLink to="/dashboard/handle_album/add_album">
                        <div className={classes.AddAlbumButton}>
                            <h4>Add Album</h4>
                            <i className="fas fa-plus"></i>
                        </div>
                    </NavLink>
                    <div className={classes.Collections}>
                        {cards}
                    </div>
                </div>
            </div>
        );
    }


};



export default LatestAlbums;