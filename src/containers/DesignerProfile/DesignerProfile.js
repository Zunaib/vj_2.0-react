import React, { Component } from 'react';
import classes from './DesignerProfile.css';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import display from '../../assets/images/DP.jpg'
import LatestAlbums from '../../components/DesignerProfile/LatestAlbums/LatestAlbums';
import LatestProducts from '../../components/DesignerProfile/LatestProducts/LatestProducts';
import Statistics from '../../components/DesignerProfile/Statistics/Statistics';

class DesignerProfile extends Component {

    componentDidMount = () => {
        if (this.props.token) {
            let limit = 8;
            this.props.onfetchprofilecontent(this.props.token, limit);
        }
    }


    state = {
        profilecontent: 'LatestAlbums'
    }

    getContent = (currentContent) => {
        const Content = {
            LatestProducts: <LatestProducts products={this.props.profileproducts} />,
            LatestAlbums: <LatestAlbums albums={this.props.profilealbums} />,
            Statistics: <Statistics />
        };
        return Content[currentContent];
    }

    toggleLatestProducts = () => {
        this.setState({ profilecontent: 'LatestProducts' })
    }

    toggleLatestAlbums = () => {
        this.setState({ profilecontent: 'LatestAlbums' })
    }

    toggleStatistics = () => {
        this.setState({ profilecontent: 'Statistics' })
    }

    render() {
        let content = this.getContent(this.state.profilecontent);
        return (
            <div className={classes.Main}>

                <div className={classes.TopImage}>
                </div>


                <div className={classes.ProfileImageButton} >
                    <img src={display} alt="Display" />
                    <i className="fas fa-plus"></i>
                </div>


                <div className={classes.Profile}>

                    <div className={classes.ProfileInfo} >
                        <h1>Zunaib Imtiaz</h1>
                        <h5>DESIGNER</h5>

                        <div className={classes.ConnectIcons}>
                            <i className="fab fa-pinterest-p" ></i>
                            <i className="fab fa-behance" ></i>
                            <i className="fas fa-globe" ></i>
                        </div>

                        <div className={classes.Desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>

                    </div>

                    <div className={classes.ProfileWork}>
                        <div className={classes.WorkButtons}>
                            <div className={classes.Workbutton} onClick={this.toggleLatestAlbums}>
                                <i className="fas fa-palette" ></i>
                                <h5>Albums</h5>
                            </div>
                            <div className={classes.Workbutton} onClick={this.toggleLatestProducts}>
                                <i className="far fa-images"></i>
                                <h5>Products</h5>
                            </div>
                            <div className={classes.Workbutton} onClick={this.toggleStatistics}>
                                <i className="fas fa-user-friends" ></i>
                                <h5>Statistics</h5>
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
        profileproducts: state.DesignerProfile.profileproducts,
        productloading: state.DesignerProfile.productloading,
        producterror: state.DesignerProfile.producterror,
        profilealbums: state.DesignerProfile.profilealbums,
        albumloading: state.DesignerProfile.albumloading,
        albumerror: state.DesignerProfile.albumerror

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchprofilecontent: (token, limit) => dispatch(actions.FetchDesignerProfileContent(token, limit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignerProfile);