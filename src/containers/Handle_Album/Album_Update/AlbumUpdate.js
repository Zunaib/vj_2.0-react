import React, { Component } from 'react'
import classes from './AlbumUpdate.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'

// import Auxilary from '../../../hoc/Auxilary/Auxilary'
import FileUploader from '../../../components/FileUploader/FileUpload';
import albumcvr from '../../../assets/images/AlbumCover.jpg';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Web_Input/WebInput';
import { checkValidity } from '../../../Shared/Validator';
import Snack from '../../../components/UI/SnackBar/Snackbar';
class Album extends Component {


    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/handle_album/update_album/");
        this.props.onfetchcurrentalbum(this.props.token, str[1])
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentalbum !== prevState.album) {
            return { album: nextProps.currentalbum };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentalbum !== this.props.currentalbum) {
            //Perform some operation here
            this.setState({ album: this.props.currentalbum });
            this.setData();
        }
    }

    setData() {

        let prevAlbum = this.state.album;
        const updatedalbumForm = {
            ...this.state.albumForm
        };

        const formElements = ['title', 'season', 'year', 'description'];


        for (let i = 0; i < formElements.length; i++) {
            const updatedFormElement = {
                ...updatedalbumForm[formElements[i]]
            };

            let target = formElements[i];

            if (prevAlbum[target] === null) {
                updatedFormElement.value = "";
                updatedFormElement.valid = false;
                updatedFormElement.touched = false;
            } else {
                updatedFormElement.value = prevAlbum[target];
                updatedFormElement.valid = true;
                updatedFormElement.touched = true;
            }

            updatedalbumForm[formElements[i]] = updatedFormElement;
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedalbumForm) {
            formIsValid = updatedalbumForm[inputIdentifier].valid && formIsValid;
        }
        let album_thumbnail = null;
        if (prevAlbum.thumbnail) {
            album_thumbnail = 'http://localhost:5000' + prevAlbum.thumbnail;
        }
        // console.log(updatedalbumForm)
        this.setState({ albumForm: updatedalbumForm, formIsValid: formIsValid, albumthumbnail: album_thumbnail });

    }

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
        selectedFileURL: null,
        albumthumbnail: null,
        fileselected: null,
        albumid: window.location.href.split("http://localhost:3000/dashboard/handle_album/update_album/")[1]
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileURL: URL.createObjectURL(event.target.files[0]),
            selectedsnack: true,
            fileselected: true

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

        this.setState({ albumForm: updatedalbumForm, selectedFile: null, selectedsnack: false, fileselected: false });
    }

    albumHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.albumForm) {
            formData[formElementIdentifier] = this.state.albumForm[formElementIdentifier].value;
        }

        const formElements = ['title', 'season', 'year', 'description'];
        let prevAlbum = this.state.album;
        let action = false;
        for (let i = 0; i < formElements.length; i++) {
            let target = formElements[i];
            if (formData[target] !== prevAlbum[target]) {
                action = true;
            }
        }

        let data = new FormData();
        if (this.state.selectedFile) {
            action = true;
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        } else {
            data.append('thumbnail', prevAlbum.thumbnail)
        }

        data.append('albumId', this.state.album._id);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('season', formData.season);
        data.append('year', formData.year);

        if (this.state.formIsValid && action) {
            this.props.onupdatealbum(this.props.token, data);
            this.fieldclearHandler();
            this.setState({ formIsValid: false });
        } else {
            console.log('invalid')
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

    onaddAlbumMsg = () => {
        this.setState({ fileselected: false })
    }

    render() {
        let body = <Spinner />;
        if (!this.props.loading) {
            const formElementsArray = [];
            for (let key in this.state.albumForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.albumForm[key]
                });
            }

            let album_img = this.state.albumthumbnail;
            if (this.state.selectedFile) {
                album_img = this.state.selectedFileURL
            }

            body = (
                <div className={classes.Album_Top}>
                    <div className={classes.AlbumInfo}>
                        <h1>Update Album</h1>
                        <div className={classes.FormCardInfo}>
                            <div className={classes.FormSide}>
                                <div className={classes.Form} >
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
                                        <FileUploader clicked={this.fileSelectedHandler}
                                            text={"Select Thumbnail"}
                                            textt={this.state.selectedFile ? "Thumbnail Selected" : "Select Album Thumbnail"}
                                        />
                                        <Button btnType="WebButton">Update Album</Button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.AlbumImage} >
                        <img src={album_img ? album_img : albumcvr} alt="Album_Thumbnail" />
                    </div>
                </div>
            );
        }


        let imgsnack = null;
        if (this.state.fileselected) {
            imgsnack = (<Snack message={'File Added: ( ' + this.state.selectedFile.name + ' )'} snackType="success" refresh={this.props.onaddAlbumMsg} />);
        }

        let albumupdate = null;
        if (this.props.updated) {
            albumupdate = (<Snack message={"Album Successfully Updated"} snackType="success" refresh={this.props.onalbumUpdateMsg} />);
        }

        return (
            <div className={classes.Main}>
                {albumupdate}
                {this.props.updated ? <Redirect to={"/dashboard/albums/" + this.state.album._id} /> : null}
                {imgsnack}
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    {body}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentalbum: state.ViewAlbum.currentalbum,
        currentalbumproducts: state.ViewAlbum.currentalbumproducts,
        loading: state.ViewAlbum.loading,
        token: state.Auth.token,
        updated: state.UpdateAlbum.updated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentalbum: (token, albumid) => dispatch(actions.FetchAlbum(token, albumid)),
        onupdatealbum: (token, updatedalbum) => dispatch(actions.UpdateAlbum(token, updatedalbum)),
        onalbumUpdateMsg: () => dispatch(actions.UpdateAlbumMsg())


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);