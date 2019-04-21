import React, { Component } from 'react';
import classes from './Album.css';
import { connect } from 'react-redux';
// import * as actions from '../../../Store/Actions/index';
import display from '../../../assets/images/AlbumCover.jpg';
import ProductCard from '../../../components/UI/Card/Product/ProductCard';

class Album extends Component {

    render() {

        let album = this.props.currentalbum;
        return (
            <div className={classes.Main}>
                <div className={classes.Album}>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Album 123</h1> <h2>Spring123</h2>
                            <div className={classes.Desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>
                        </div>
                        <div className={classes.AlbumImage} >
                            <img src={display} alt="Album_Thumbnail" />
                        </div>
                    </div>

                    <div className={classes.Album_Bottom}>
                        <div className={classes.WorkDisplay}>
                            <div className={classes.Work}>
                                <h2>Products</h2>
                                <div className={classes.Content}>
                                    {/* <div >
                                        <i className="fas fa-plus"></i>
                                    </div> */}
                                    <div className={classes.Collections}>
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currentalbum: state.Current.currentalbum
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);

