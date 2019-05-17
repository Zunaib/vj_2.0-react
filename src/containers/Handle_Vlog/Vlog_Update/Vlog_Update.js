import React, { Component } from 'react'
import classes from './Vlog_Update.css';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'


import FileUploader from '../../../components/FileUploader/FileUpload';
import vlogcvr from '../../../assets/images/AlbumCover.jpg';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Web_Input/WebInput';
import { checkValidity } from '../../../Shared/Validator';
// import Snackbar from '../../../components/UI/SnackBar/SuccessSnackbar';
class Vlog extends Component {

    state = {
        vlogForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Video Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Describe Video In A Few Words'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        vlog: null,
        vlogvideo: null,
        formIsValid: false,
        selectedFile: null,
        selectedsnack: false,
        selectedFileURL: null

    }

    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/handle_vlog/update_vlog/");
        this.props.onfetchcurrentvlog(this.props.token, str[1])
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentvlog !== prevState.vlog) {
            return { vlog: nextProps.currentvlog };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentvlog !== this.props.currentvlog) {
            //Perform some operation here
            this.setState({ vlog: this.props.currentvlog });
            this.setData();
        }
    }

    setData() {

        let prevVlog = this.state.vlog;
        const updatedvlogForm = {
            ...this.state.vlogForm
        };

        const formElements = ['title', 'description'];


        for (let i = 0; i < formElements.length; i++) {
            const updatedFormElement = {
                ...updatedvlogForm[formElements[i]]
            };

            let target = formElements[i];

            if (prevVlog[target] === null) {
                updatedFormElement.value = "";
                updatedFormElement.valid = false;
                updatedFormElement.touched = false;
            } else {
                updatedFormElement.value = prevVlog[target];
                updatedFormElement.valid = true;
                updatedFormElement.touched = true;
            }

            updatedvlogForm[formElements[i]] = updatedFormElement;
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedvlogForm) {
            formIsValid = updatedvlogForm[inputIdentifier].valid && formIsValid;
        }
        let vlog_video = null;
        if (prevVlog.videoLink) {
            vlog_video = 'http://localhost:5000' + prevVlog.videoLink;
        }
        // console.log(updatedvlogForm)
        this.setState({ vlogForm: updatedvlogForm, formIsValid: formIsValid, vlogvideo: vlog_video });

    }



    fileSelectedHandler = (event) => {
        this.setState({
            vlog: null,
            selectedFile: event.target.files[0],
            selectedFileURL: URL.createObjectURL(event.target.files[0]),
            selectedsnack: true
        })
    }



    fieldclearHandler = () => {
        let updatedvlogForm = {
            ...this.state.vlogForm
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedvlogForm) {
            updatedFormElement = {
                ...updatedvlogForm[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedvlogForm[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ vlogForm: updatedvlogForm, selectedFile: null, selectedsnack: false });
    }

    vlogHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.vlogForm) {
            formData[formElementIdentifier] = this.state.vlogForm[formElementIdentifier].value;
        }

        const formElements = ['title', 'description'];
        let prevVlog = this.state.vlog;
        let action = false;
        for (let i = 0; i < formElements.length; i++) {
            let target = formElements[i];
            if (formData[target] !== prevVlog[target]) {
                action = true;
            }
        }


        let data = new FormData();
        if (this.state.selectedFile) {
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
            action = true;
        } else {
            data.append('video', prevVlog.videoLink)
        }
        data.append('vlogId', prevVlog._id);
        data.append('title', formData.title);
        data.append('description', formData.description);

        if (this.state.formIsValid && action) {
            console.log('valid');
            // console.log(data)
            this.props.onupdatecurrentvlog(this.props.token, data);
            // this.fieldclearHandler();
            // this.setState({ formIsValid: false });
        } else {
            console.log('Invalid')
        }

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedvlogForm = {
            ...this.state.vlogForm
        };
        const updatedFormElement = {
            ...updatedvlogForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedvlogForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedvlogForm) {
            formIsValid = updatedvlogForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ vlogForm: updatedvlogForm, formIsValid: formIsValid });
    }
    render() {

        const formElementsArray = [];
        for (let key in this.state.vlogForm) {
            formElementsArray.push({
                id: key,
                config: this.state.vlogForm[key]
            });
        }
        let form = (
            <form onSubmit={this.vlogHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        class={classes.Wrapper}
                        label={formElement.id}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <FileUploader clicked={this.fileSelectedHandler} text="Video file" />
                <Button btnType="WebButton">Update Vlog</Button>

            </form>
        );

        // if (this.props.loading) {
        //     form = <Spinner />;
        // }

        // let imgsnack = null;
        // if (this.state.selectedFile && this.state.selectedsnack) {
        //     imgsnack = (<Snackbar message={'File Added: ( ' + this.state.selectedFile.name + ' )'} msgRefresh={this.props.onMsgRefresh} />);
        //     this.setState({ selectedsnack: false })
        // }

        // let redirect = null;
        // if (this.props.albumid) {
        //     redirect = <Redirect to={"/dashboard/albums/" + this.props.albumid} />
        // }

        const videostyles = {
            controls: true,
            light: false,
            width: "auto",
            height: "200px"
        }

        let vlog_video = this.state.vlogvideo;
        if (this.state.selectedFile) {
            vlog_video = this.state.selectedFileURL
        }

        let redirect = null;
        if (this.props.updated) {
            redirect = <Redirect to={"/dashboard/vlogs/" + this.state.vlog._id} />
        }

        return (
            <div className={classes.Main}>
                {redirect}
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Update Vlog</h1>
                            <div className={classes.FormCardInfo}>
                                <div className={classes.FormSide}>
                                    <div className={classes.Form} >
                                        {form}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.AlbumImage} >
                            {/* <img src={this.state.selectedFile ? this.state.selectedFileURL : albumcvr} alt="Video_Thumbnail" /> */}
                            <div className={classes.Player}>

                                <ReactPlayer url={vlog_video ? vlog_video : vlogcvr}
                                    {...videostyles} />

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
        currentvlog: state.ViewVlog.currentvlog,
        loading: state.ViewVlog.loading,
        updated: state.UpdateVlog.updated,
        token: state.Auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentvlog: (token, vlogid) => dispatch(actions.FetchSingleVlog(token, vlogid)),
        onupdatecurrentvlog: (token, vlogData) => dispatch(actions.UpdateVlog(token, vlogData)),
        onMsgRefresh: () => dispatch(actions.VlogMsgRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vlog);