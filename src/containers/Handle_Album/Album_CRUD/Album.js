import React, { Component } from 'react'
import classes from './AlbumCrud.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'


import FileUploader from '../../../components/FileUploader/FileUpload';
import albumcvr from '../../../assets/images/AlbumCover.jpg';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Web_Input/WebInput';
import { checkValidity } from '../../../Shared/Validator';
import Snackbar from '../../../components/UI/SnackBar/SuccessSnackbar';
class Album extends Component {

    state = {
        albumForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Album Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            season: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Album Season'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Year'
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
                    placeholder: 'Describe Album In A Few Words'
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
            selectedFile: event.target.files[0],
            selectedFileURL: URL.createObjectURL(event.target.files[0]),
            selectedsnack: true
        })
    }



    fieldclearHandler = () => {
        let updatedalbumForm = {
            ...this.state.albumForm
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedalbumForm) {
            updatedFormElement = {
                ...updatedalbumForm[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedalbumForm[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ albumForm: updatedalbumForm, selectedFile: null, selectedsnack: false });
    }

    albumHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.albumForm) {
            formData[formElementIdentifier] = this.state.albumForm[formElementIdentifier].value;
        }



        let data = new FormData();
        if (this.state.selectedFile) {
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        }
        data.append('albumName', formData.title);
        data.append('description', formData.description);
        data.append('season', formData.season);
        data.append('year', formData.year);

        if (this.state.formIsValid && this.state.selectedFile) {
            this.props.onaddAlbum(this.props.token, data);
            this.fieldclearHandler();
            this.setState({ formIsValid: false });
        } else {
            console.log('Invalid')
        }

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedalbumForm = {
            ...this.state.albumForm
        };
        const updatedFormElement = {
            ...updatedalbumForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedalbumForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedalbumForm) {
            formIsValid = updatedalbumForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ albumForm: updatedalbumForm, formIsValid: formIsValid });
    }
    render() {

        const formElementsArray = [];
        for (let key in this.state.albumForm) {
            formElementsArray.push({
                id: key,
                config: this.state.albumForm[key]
            });
        }
        let form = (
            <form onSubmit={this.albumHandler}>
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
                <FileUploader clicked={this.fileSelectedHandler} text="Thumbnail" />
                <Button btnType="WebButton">Add Album</Button>

            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let imgsnack = null;
        if (this.state.selectedFile && this.state.selectedsnack) {
            imgsnack = (<Snackbar message={'File Added: ( ' + this.state.selectedFile.name + ' )'} msgRefresh={this.props.onMsgRefresh} />);
            this.setState({ selectedsnack: false })
        }

        let redirect = null;
        if (this.props.albumid) {
            redirect = <Redirect to={"/dashboard/albums/" + this.props.albumid} />
        }

        return (
            <div className={classes.Main}>
                {redirect}
                {imgsnack}
                <div className={classes.Album}>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Add Album</h1>
                            <div className={classes.FormCardInfo}>
                                <div className={classes.FormSide}>
                                    <div className={classes.Form} >
                                        {form}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.AlbumImage} >
                            <img src={this.state.selectedFile ? this.state.selectedFileURL : albumcvr} alt="Album_Thumbnail" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.AlbumCrud.loading,
        error: state.AlbumCrud.error,
        albumid: state.AlbumCrud.albumid,
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaddAlbum: (token, albumData) => dispatch(actions.AddAlbum(token, albumData)),
        onMsgRefresh: () => dispatch(actions.AlbumMsgRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);