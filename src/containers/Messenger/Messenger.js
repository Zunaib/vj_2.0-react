import React, { Component } from 'react';
import classes from './Messenger.css';
import { connect } from 'react-redux';
import placehold from '../../assets/images/defaultuserimage.png'
// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';

import * as actions from '../../Store/Actions/index';
// import ReactPlayer from 'react-player'
// import { NavLink, Redirect } from 'react-router-dom';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import Auxilary from '../../../hoc/Auxilary/Auxilary';
// import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
// import Snack from '../../../components/UI/SnackBar/Snackbar';

// import video from '../../../assets/images/Vid.mp4'

import MessegeInput from '../../components/UI/Messege/Messege';


class Messenger extends Component {

    state = {
        convoid: window.location.href.split("http://localhost:3000/dashboard/messenger/")[1].split("?")[1],
        profilefname: window.location.href.split("http://localhost:3000/dashboard/messenger/")[1].split("?")[0].split("_")[0],
        profilelname: window.location.href.split("http://localhost:3000/dashboard/messenger/")[1].split("?")[0].split("_")[1],
    
}

    componentDidMount() {
    }
    
    render() {

        let convoname = "Conversation";
        if (this.state.profilefname && this.state.profilelname) {
            convoname = this.state.profilefname + " " + this.state.profilelname;
        }

        return (
            <div className={classes.Main}>
                <div className={classes.Messenger}>
                    <div className={classes.HeaderTabs}>
                        <div className={classes.ListHeader}>
                            <h2>Chats</h2>
                        </div>

                        <div className={classes.ConvoHeader}>
                            <h2>{convoname}</h2>
                        </div>
                    </div>


                    <div className={classes.MessengerList}>

                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                        <div className={classes.SingleListItem}>
                            <div className={classes.ImageButton} >
                                <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                            </div>
                            <div className={classes.Name}>
                                <h3>Name</h3>
                                <p>Here Would Be The Latest Message</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Conversation}>

                        <div className={classes.Messages}>
                            <div className={classes.SingleConvo}>
                                <div className={classes.SingleConvoHeader}>
                                    <h4>13/5/2017</h4>
                                    <hr></hr>
                                </div>
                                <div className={classes.Incoming}>
                                    <p>
                                        Incoming Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                            </div>

                            <div className={classes.SingleConvo}>
                                <div className={classes.SingleConvoHeader}>
                                    <h4>13/5/2017</h4>
                                    <hr></hr>
                                </div>
                                <div className={classes.Incoming}>
                                    <p>
                                        Incoming Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                            </div>

                            <div className={classes.SingleConvo}>
                                <div className={classes.SingleConvoHeader}>
                                    <h4>13/5/2017</h4>
                                    <hr></hr>
                                </div>
                                <div className={classes.Incoming}>
                                    <p>
                                        Incoming Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                            </div>

                            <div className={classes.SingleConvo}>
                                <div className={classes.SingleConvoHeader}>
                                    <h4>13/5/2017</h4>
                                    <hr></hr>
                                </div>
                                <div className={classes.Incoming}>
                                    <p>
                                        Incoming Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                            </div>

                            <div className={classes.SingleConvo}>
                                <div className={classes.SingleConvoHeader}>
                                    <h4>13/5/2017</h4>
                                    <hr></hr>
                                </div>
                                <div className={classes.Incoming}>
                                    <p>
                                        Incoming Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                                <div className={classes.Outgoing}>
                                    <p>
                                        Outgoing Message
                                </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={classes.Send}>
                        <MessegeInput />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        userId: state.Auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);

