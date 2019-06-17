import React, { Component } from 'react';
import classes from './UserProfile.css';
// import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import display from '../../assets/images/defaultuserimage.png'
import LatestAlbums from '../../components/DesignerProfile/LatestAlbums/LatestAlbums';
import LatestProducts from '../../components/DesignerProfile/LatestProducts/LatestProducts';
import LatestVlogs from '../../components/DesignerProfile/LatestVlogs/LatestVlogs';
import LatestBlogs from '../../components/DesignerProfile/LatestBlogs/LatestBlogs';
import Statistics from '../../components/DesignerProfile/Statistics/Statistics';

class UserProfile extends Component {

    state = {
        profileid: window.location.href.split("http://localhost:3000/dashboard/userprofile/")[1],
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
        const str = window.location.href.split("http://localhost:3000/dashboard/userprofile/")[1];
        this.props.fetchprofilesettings(this.props.token, str);
        this.props.onfetchprofilealbums(this.props.token, str, limit);
        this.props.onfetchprofileproducts(this.props.token, str, limit);
        this.props.onfetchprofilevlogs(this.props.token, str, limit);
        this.props.onfetchprofileblogs(this.props.token, str, limit);

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
        settings: state.UserProfileSettings.settings,
        flag: state.Auth.flag,

        profileproducts: state.UserProfileProducts.profileproducts,
        productloading: state.UserProfileProducts.loading,
        producterror: state.UserProfileProducts.error,

        profilealbums: state.UserProfileAlbums.profilealbums,
        albumloading: state.UserProfileAlbums.loading,
        albumerror: state.UserProfileAlbums.error,

        profilevlogs: state.UserProfileVlogs.profilevlogs,
        vlogloading: state.UserProfileVlogs.loading,
        vlogerror: state.UserProfileVlogs.error,

        profileblogs: state.UserProfilesBlogs.profileblogs,
        blogloading: state.UserProfilesBlogs.loading,
        blogerror: state.UserProfilesBlogs.error


    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchprofilesettings: (token, userid) => dispatch(actions.FetchSearchedUserSettings(token, userid)),
        onfetchprofileproducts: (token, limit) => dispatch(actions.FetchUserProducts(token, limit)),
        onfetchprofilealbums: (token, limit) => dispatch(actions.FetchUserAlbums(token, limit)),
        onfetchprofilevlogs: (token, limit) => dispatch(actions.FetchUserVlogs(token, limit)),
        onfetchprofileblogs: (token, limit) => dispatch(actions.FetchUserBlogs(token, limit)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);