import React, { Component } from 'react';
import classes from './DesignerProfile.css';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import display from '../../assets/images/defaultuserimage.png'
import LatestAlbums from '../../components/DesignerProfile/LatestAlbums/LatestAlbums';
import LatestProducts from '../../components/DesignerProfile/LatestProducts/LatestProducts';
import LatestVlogs from '../../components/DesignerProfile/LatestVlogs/LatestVlogs';
import LatestBlogs from '../../components/DesignerProfile/LatestBlogs/LatestBlogs';
import Statistics from '../../components/DesignerProfile/Statistics/Statistics';

class DesignerProfile extends Component {

    state = {
        profilecontent: 'LatestAlbums',
        userimage: '',
        userfirst: '',
        userlast: '',
        desc: '',
        albumactive: true,
        prodactive: false,
        vlogactive: false,
        blogactive: false
    }



    componentDidMount = () => {
        let limit = 8;
        this.props.onfetchprofilealbums(this.props.token, limit);
        this.props.onfetchprofileproducts(this.props.token, limit);
        this.props.onfetchprofilevlogs(this.props.token, limit);
        this.props.onfetchprofileblogs(this.props.token, limit);

        let user = this.props.settings[0];
        if (user) {
            this.setState({
                userimage: user.displayPicture,
                userfirst: user.firstName,
                userlast: user.lastName,
                desc: user.description
            })
        }
    }




    getContent = (currentContent) => {
        const Content = {
            LatestProducts: <LatestProducts products={this.props.profileproducts} />,
            LatestAlbums: <LatestAlbums albums={this.props.profilealbums} />,
            LatestVlogs: <LatestVlogs vlogs={this.props.profilevlogs} />,
            LatestBlogs: <LatestBlogs blogs={this.props.profileblogs} />,
            Statistics: <Statistics />
        };
        return Content[currentContent];
    }

    toggleLatestProducts = () => {
        this.setState({ albumactive: false, prodactive: true, vlogactive: false, blogactive: false, profilecontent: 'LatestProducts' })
    }

    toggleLatestAlbums = () => {
        this.setState({ albumactive: true, prodactive: false, vlogactive: false, blogactive: false, profilecontent: 'LatestAlbums' })
    }
    toggleLatestVlogs = () => {
        this.setState({ albumactive: false, prodactive: false, vlogactive: true, blogactive: false, profilecontent: 'LatestVlogs' })
    }
    toggleLatestBlogs = () => {
        this.setState({ albumactive: false, prodactive: false, vlogactive: false, blogactive: true, profilecontent: 'LatestBlogs' })
    }

    render() {

        let img = null;
        let firstname = this.state.userfirst;
        let lastname = this.state.userlast;
        let desc = this.state.desc
        if (this.state.userimage) {
            img = 'http://localhost:5000' + this.state.userimage;
        } else {
            img = display;
        }

        let albumactive = this.state.albumactive ? classes.WorkbuttonActive : null;
        let albumh4active = this.state.albumactive ? classes.h4Active : null;

        let prodactive = this.state.prodactive ? classes.WorkbuttonActive : null;
        let prodh4active = this.state.prodactive ? classes.h4Active : null;

        let vlogactive = this.state.vlogactive ? classes.WorkbuttonActive : null;
        let vlogh4active = this.state.vlogactive ? classes.h4Active : null;

        let blogactive = this.state.blogactive ? classes.WorkbuttonActive : null;
        let blogh4active = this.state.blogactive ? classes.h4Active : null;

        let content = this.getContent(this.state.profilecontent);
        return (
            <div className={classes.Main}>

                <div className={classes.TopImage}>
                </div>

                <div className={classes.ProfileImageButton} >
                    <img src={this.state.userimage ? img : display} alt="Display" />
                    <div className={classes.Button}>
                        <div className={classes.FollowButton}>
                            <h4>Follow</h4>
                        </div>
                    </div>
                </div>

                <div className={classes.Profile}>
                    <NavLink to="/dashboard/designerorders" >
                        <div className={classes.Orders} >
                            <i className="fas fa-sort-amount-down"></i>
                            <h4>Requested Orders</h4>
                        </div>
                    </NavLink>

                    <div className={classes.ProfileInfo} >
                        <h1>{firstname ? firstname + " " + lastname : 'Name'}</h1>
                        <h5>CREATOR</h5>

                        <div className={classes.ConnectIcons}>
                            <i className="fab fa-pinterest-p" ></i>
                            <i className="fab fa-behance" ></i>
                            <i className="fas fa-globe" ></i>
                        </div>

                        <div className={classes.Desc}>
                            {desc ? desc : 'Designer Description'}
                        </div>
                        <Statistics />

                    </div>

                    <div className={classes.ProfileWork}>
                        <div className={classes.WorkButtons}>
                            <div className={[classes.Workbutton, albumh4active].join(' ')} onClick={this.toggleLatestAlbums}>
                                <i className={["fas fa-palette", albumactive].join(' ')} ></i>
                                <h5>Albums</h5>
                            </div>
                            <div className={[classes.Workbutton, prodh4active].join(' ')} onClick={this.toggleLatestProducts}>
                                <i className={["far fa-images", prodactive].join(' ')}></i>
                                <h5>Products</h5>
                            </div>
                            <div className={[classes.Workbutton, vlogh4active].join(' ')} onClick={this.toggleLatestVlogs}>
                                <i className={["fas fa-video", vlogactive].join(' ')}></i>
                                <h5>Vlogs</h5>
                            </div>
                            <div className={[classes.Workbutton, blogh4active].join(' ')} onClick={this.toggleLatestBlogs}>
                                <i className={["fas fa-newspaper", blogactive].join(' ')}></i>
                                <h5>Blogs</h5>
                            </div>
                        </div>

                        <div className={classes.WorkDisplay}>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        settings: state.UserSettings.settings,
        flag: state.Auth.flag,

        profileproducts: state.DesignerProducts.profileproducts,
        productloading: state.DesignerProducts.loading,
        producterror: state.DesignerProducts.error,

        profilealbums: state.DesignerAlbums.profilealbums,
        albumloading: state.DesignerAlbums.loading,
        albumerror: state.DesignerAlbums.error,

        profilevlogs: state.DesignerVlogs.profilevlogs,
        vlogloading: state.DesignerVlogs.loading,
        vlogerror: state.DesignerVlogs.error,

        profileblogs: state.DesignerBlogs.profileblogs,
        blogloading: state.DesignerBlogs.loading,
        blogerror: state.DesignerBlogs.error


    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchprofileproducts: (token, limit) => dispatch(actions.FetchDesignerProducts(token, limit)),
        onfetchprofilealbums: (token, limit) => dispatch(actions.FetchDesignerAlbums(token, limit)),
        onfetchprofilevlogs: (token, limit) => dispatch(actions.FetchDesignerVlogs(token, limit)),
        onfetchprofileblogs: (token, limit) => dispatch(actions.FetchDesignerBlogs(token, limit)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DesignerProfile);