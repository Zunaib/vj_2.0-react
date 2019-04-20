import React, { Component } from 'react'
import classes from './Product.css';
import display from '../../../assets/images/testimg.jpg';
import Card from '../../../components/UI/Card/Card';

class Album extends Component {

    render() {
        return (
            <div className={classes.Main}>


                <div className={classes.Album}>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumImage} >
                            <img src={display} alt="Album_Thumbnail" />
                        </div>
                        <div className={classes.AlbumInfo}>
                            <h1>Product 123</h1> <h3>339$</h3>
                            <div className={classes.Desc}>
                                <h4>Description</h4>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
                            </p>
                            </div>

                            <div className={classes.Desc}>
                                <h4>Designer Information</h4>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                            </div>

                            <div className={classes.Desc}>
                                <h4>Product Details</h4>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={classes.ProfileWork}>
                    <div className={classes.WorkButtons}>
                        <div className={classes.Workbutton} >
                            <i className="fas fa-truck"></i>
                        </div>
                        <div className={classes.Workbutton}>
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className={classes.Workbutton}>
                            <i className="fas fa-copyright"></i>
                        </div>
                    </div>
                </div>


                <div className={classes.Album_Bottom}>
                    <div className={classes.WorkDisplay}>
                        <div className={classes.Work}>
                            <h2>More Products Like This :</h2>
                            <div className={classes.Content}>
                                {/* <div >
                                        <i className="fas fa-plus"></i>
                                    </div> */}
                                <div className={classes.Collections}>
                                    <Card cardType="productCard" />
                                    <Card cardType="productCard" />
                                    <Card cardType="productCard" />
                                    <Card cardType="productCard" />

                                </div>
                            </div>

                        </div>
                    </div>

                </div>


            </div>
        )
    }
}

export default Album;
