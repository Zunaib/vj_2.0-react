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

                    {/* <div className={classes.Album_Bottom}>
                        <div className={classes.WorkDisplay}>
                            <div className={classes.Work}>
                                <h2>Products</h2>
                                <div className={classes.Content}>
                                    <div className={classes.Collections}>
                                        <Card cardType="productCard" />
                                        <Card cardType="productCard" />
                                        <Card cardType="productCard" />
                                        <Card cardType="productCard" />
                                        <Card cardType="productCard" />
                                        <Card cardType="productCard" />
                                        <Card cardType="productCard" />
                                        <Card cardType="productCard" />

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div> */}


                    {/* <div className={classes.ProfileInfo} >
                        <h1>Zunaib Imtiaz</h1>
                        <h5>DESIGNER</h5> */}

                    {/* 
                        <div className={classes.ConnectIcons}>
                            <i className="fab fa-pinterest-p" ></i>
                            <i className="fab fa-behance" ></i>
                            <i className="fas fa-globe" ></i>
                        </div>

                        <div className={classes.Desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>

                    </div>

                    <div className={classes.ProfileWork}>
                        <div className={classes.WorkButtons}>
                            <div className={classes.Workbutton} >
                                <i className="fas fa-palette"></i>
                                <h5>Work</h5>
                            </div>
                            <div className={classes.Workbutton}>
                                <i className="fas fa-user-friends"></i>
                                <h5>Connections</h5>
                            </div>
                            <div className={classes.Workbutton}>
                                <i className="far fa-images"></i>
                                <h5>Images</h5>
                            </div>
                        </div> */}

                    {/* <div className={classes.WorkDisplay}>
                            <div className={classes.Work}>
                                <div className={classes.Content}>
                                    <h3>Latest Collections</h3>
                                    <div >
                                        <i className="fas fa-plus"></i>
                                    </div>
                                    <div className={classes.Collections}>
                                        <Link to='/dashboard/zunaib.imtiaz/album'>
                                            <Card cardType="collectionCard" />
                                        </Link>
                                        <Card cardType="collectionCard" />
                                        <Card cardType="collectionCard" />
                                        <Card cardType="collectionCard" />

                                    </div>
                                </div>

                                <div className={classes.Stats}>
                                    <div className={classes.StatsWork}>
                                        <h3>Stats</h3>
                                        <div className={classes.Numbers}>

                                            <p><b>60</b> Products</p>
                                            <p><b>60</b> Collections</p>
                                            <p><b>60</b> Likes</p>
                                            <p><b>60</b> Followers</p>
                                        </div>

                                        <hr></hr>


                                        <div className={classes.AboutWork} >
                                            <h3>About This Work</h3>
                                            <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</h4>
                                        </div>

                                        <hr></hr>


                                        <div className={classes.Tags}>
                                            <h3>Focus</h3>
                                            <h4>Tops</h4>
                                            <h4>Sunglasses</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    {/* </div> */}
                </div>

                <div className={classes.ProfileWork}>
                    <div className={classes.WorkButtons}>
                        <div className={classes.Workbutton} >
                            <i class="fas fa-truck"></i>
                        </div>
                        <div className={classes.Workbutton}>
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div className={classes.Workbutton}>
                            <i class="fas fa-copyright"></i>
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
