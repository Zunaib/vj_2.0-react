import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ProfileCard.css';
import display from '../../../../assets/images/defaultuserimage.png'
class ProfileCard extends Component {

    state = {
        user: '',
        flag: ''
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                user: this.props.settings[0],
                flag: this.props.flag
            })
            console.log(this.state)
        }, 50)
    }

    render() {
        let User = this.state.user;
        let imgpath = null;
        if (User.displayPicture) {
            imgpath = 'http://localhost:5000' + User.displayPicture;
        } else {
            imgpath = display;
        }
        return (
            <div className={classes.ProfileCard}>
                <div className={classes.ProfileImageButton} >
                    <img src={this.props.selectedfile ? this.props.selectedfileURL : imgpath} alt="Display_Image" />
                </div>
                <div className={classes.ProfileCardText}>
                    <h4><b>{User.userName}</b></h4>
                    <h4>{this.state.flag}</h4>
                    <div className={classes.ProfileDesc}>
                        {User.description}
                    </div>
                </div>
            </div>
        );
    }

};


const mapStateToProps = state => {
    return {
        settings: state.UserSettings.settings,
        flag: state.Auth.flag
    }
}


export default connect(mapStateToProps, null)(ProfileCard);
