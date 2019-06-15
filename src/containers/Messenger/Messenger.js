import React, { Component } from 'react';
import classes from './Messenger.css';
import { connect } from 'react-redux';
import placehold from '../../assets/images/defaultuserimage.png'
import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';

// import * as actions from '../../../Store/Actions/index';
// import ReactPlayer from 'react-player'
// import { NavLink, Redirect } from 'react-router-dom';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import Auxilary from '../../../hoc/Auxilary/Auxilary';
// import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
// import Snack from '../../../components/UI/SnackBar/Snackbar';

// import video from '../../../assets/images/Vid.mp4'

class Messenger extends Component {

    render() {

        return (
            <div className={classes.Main}>
                <div className={classes.Messenger}>
                    {/* <div>
                    <div className={classes.LisTool}>
                        <h3>Toolbar</h3>
                    </div>
                    <div className={classes.LisTool}>
                        <h3>Toolbar</h3>
                    </div>
                    </div> */}
                    <div className={classes.HeaderTabs}>
                        <div className={classes.ListHeader}>
                            <h2>Chats</h2>
                        </div>

                        <div className={classes.ConvoHeader}>
                            <h2>Conversation</h2>
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
                        <Input
                            key={'sendmessage'}
                            elementType={"input"}
                            changed={(event) => this.inputChangedHandler(event)} />
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

