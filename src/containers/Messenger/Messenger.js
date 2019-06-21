import React, { Component } from 'react';
import classes from './Messenger.css';
import { connect } from 'react-redux';
import placehold from '../../assets/images/defaultuserimage.png'
import * as actions from '../../Store/Actions/index';
import { NavLink } from 'react-router-dom';
import MessegeInput from '../../components/UI/Messege/Messege';
import Button from '../../components/UI/Button/Button';


class Messenger extends Component {

    state = {
        convoid: window.location.href.split("http://localhost:3000/dashboard/messenger/")[1].split("?")[1],
        profilefname: window.location.href.split("http://localhost:3000/dashboard/messenger/")[1].split("?")[0].split("_")[0],
        profilelname: window.location.href.split("http://localhost:3000/dashboard/messenger/")[1].split("?")[0].split("_")[1],
        singleconvo: null,
        allconvo: null,
        activeId: null
    }

    componentDidMount() {
        if (this.state.convoid) {
            this.props.onfetchsingleconvo(this.props.token, this.state.convoid);
            this.props.onfetchallconvo(this.props.token);
        } else {
            this.props.onfetchallconvo(this.props.token);
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.singleconvo !== prevState.singleconvo) {
            return { singleconvo: nextProps.singleconvo };
        }
        if (nextProps.allconvo !== prevState.allconvo) {
            return { allconvo: nextProps.allconvo };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.singleconvo !== this.props.singleconvo) {
            //Perform some operation here
            this.setState({ singleconvo: this.props.singleconvo });
        }
        if (prevProps.allconvo !== this.props.allconvo) {
            //Perform some operation here
            this.setState({ allconvo: this.props.allconvo });
        }
    }

    singleConvoClicked = (convoid) => {
        this.props.onfetchsingleconvo(this.props.token, convoid);
    }

    handleClick(event, id, fname, lname) {
        this.setState({ activeId: id, profilefname: fname, profilelname: lname })

        console.log(id)
    }
    render() {

        let convoname = "Conversation";
        if (this.state.profilefname && this.state.profilelname) {
            convoname = this.state.profilefname + " " + this.state.profilelname;
        }

        let convomessages = null;
        // let convoheader = null;
        if (this.state.singleconvo) {

            let singleconvo = this.state.singleconvo;

            // convoheader = (
            //     <div className={classes.SingleConvoHeader}>
            //         <h4>{singleconvo.createdAt}</h4>
            //         <hr></hr>
            //     </div>
            // );
            convomessages = (singleconvo.messages.map((msg) => (
                <div className={this.props.userId === msg.user ? classes.Outgoing : classes.Incoming} key={msg._id}>
                    <p>
                        {msg.message}
                    </p>
                </div>
            )));

        }

        let convolist = null;
        if (this.state.allconvo) {
            let allconvo = this.state.allconvo;
            convolist = (allconvo.map((convo) => (
                <NavLink to={"/dashboard/messenger/" + convo.user.firstName + "_" + convo.user.lastName + "?" + convo._id}
                    onClick={() => this.singleConvoClicked(convo._id)}
                    key={convo.user._id}
                    className={classes.Link}
                >
                    <div
                        className={[classes.SingleListItem, this.state.activeId === convo._id ? classes.SingleListItemActive : ''].join(' ')}
                        onClick={() => this.handleClick(this, convo._id, convo.user.firstName, convo.user.lastName)}
                    >
                        <div className={classes.ImageButton} >
                            <img className={classes.Image} src={placehold} alt="MsgListDisplay" />
                        </div>
                        <div className={classes.Name}>
                            <h3>{convo.user.firstName + " " + convo.user.lastName}</h3>
                        </div>
                    </div>
                </NavLink>
            )));
        }

        return (
            <div className={classes.Main}>
                <div className={classes.Messenger}>
                    <div className={classes.HeaderTabs}>
                        <div className={classes.ListHeader}>
                            <h2>Chats</h2>
                        </div>

                        <div className={classes.ConvoHeader}>
                            <Button btnType="DeleteConvo" >Delete</Button>
                            <Button btnType="RefreshConvo" >Refresh</Button>
                            <h2>{convoname}</h2>
                        </div>
                    </div>


                    <div className={classes.MessengerList}>
                        {convolist}

                    </div>
                    <div className={classes.Conversation}>

                        <div className={classes.Messages}>
                            <div className={classes.SingleConvo}>
                                {convomessages}
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
        userId: state.Auth.userId,
        singleconvo: state.FetchSingleConvo.conversation,
        allconvo: state.FetchAllConvo.conversations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchsingleconvo: (token, convoid) => dispatch(actions.FetchSingleConversations(token, convoid)),
        onfetchallconvo: (token) => dispatch(actions.FetchAllConversations(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);

