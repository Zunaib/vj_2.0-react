import React, { Component } from 'react'
import classes from './VlogCrud.css';
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
import Snack from '../../../components/UI/SnackBar/Snackbar';
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
        formIsValid: false,
        selectedFile: null,
        selectedsnack: false,
        selectedFileURL: null

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


        let data = new FormData();
        if (this.state.selectedFile) {
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        }
        data.append('title', formData.title);
        data.append('description', formData.description);

        if (this.state.formIsValid && this.state.selectedFile) {
            console.log('valid');
            console.log(data)
            this.props.onaddVlog(this.props.token, data);
            this.fieldclearHandler();
            this.setState({ formIsValid: false });
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
                <FileUploader clicked={this.fileSelectedHandler}
                    text={"Select Video"}
                    textt={this.state.selectedFile ? "Video Selected" : "Select Video File"} />
                <Button btnType="WebButton">Add Vlog</Button>

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

        let imgsnack = null;
        if (this.state.selectedFile) {
            imgsnack = (<Snack message={'File Added: ( ' + this.state.selectedFile.name + ' )'} snackType="success" refresh={this.props.onaddVlogMsg} />);
        }

        let addvlog = null;
        if (this.props.added) {
            addvlog = (<Snack message={"Vlog Successfully Added"} snackType="success" refresh={this.props.onaddVlogMsg} />);

        }


        return (
            <div className={classes.Main}>
                {imgsnack}
                {addvlog}
                {this.props.added ? <Redirect to={"/dashboard/vlogs/" + this.props.vlogid} /> : null}
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Add Vlog</h1>
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

                                <ReactPlayer url={this.state.selectedFile ? this.state.selectedFileURL : vlogcvr}
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
        loading: state.AddVlog.loading,
        error: state.AddVlog.error,
        vlogid: state.AddVlog.vlogid,
        added: state.AddVlog.added,
        token: state.Auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaddVlog: (token, vlogData) => dispatch(actions.AddVlog(token, vlogData)),
        onaddVlogMsg: () => dispatch(actions.AddVlogMsgRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vlog);