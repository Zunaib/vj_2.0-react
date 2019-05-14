import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BlogCrud.css'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import ReactPlayer from 'react-player';
import * as actions from '../../../Store/Actions/index';
import FormData from 'form-data'


import FileUploader from '../../../components/FileUploader/FileUpload';
import blogcvr from '../../../assets/images/blogimage.jpg';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Web_Input/WebInput';
import { checkValidity } from '../../../Shared/Validator';
// import Snackbar from '../../../components/UI/SnackBar/SuccessSnackbar';
class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogForm: {
                title: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Blog Title'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                synopsis: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                        placeholder: 'Describe Blog In A Few Words'
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
            editorHtml: '',
            theme: 'snow'

        }
        this.handleChange = this.handleChange.bind(this)
    }

    fileSelectedHandler = (event) => {
        this.setState({
            blog: null,
            selectedFile: event.target.files[0],
            selectedFileURL: URL.createObjectURL(event.target.files[0]),
            selectedsnack: true
        })
    }


    fieldclearHandler = () => {
        let updatedblogForm = {
            ...this.state.blogForm
        };
        let updatedFormElement;
        for (let formElementIdentifier in updatedblogForm) {
            updatedFormElement = {
                ...updatedblogForm[formElementIdentifier]
            };
            updatedFormElement.value = "";
            updatedblogForm[formElementIdentifier] = updatedFormElement;
        }

        this.setState({ blogForm: updatedblogForm, formIsValid: false, editorHtml: '', selectedFile: null, selectedsnack: false });
    }

    blogHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.blogForm) {
            formData[formElementIdentifier] = this.state.blogForm[formElementIdentifier].value;
        }

        let data = new FormData();
        if (this.state.selectedFile) {
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        }
        data.append('title', formData.title);
        data.append('description', formData.synopsis);
        data.append('content', this.state.editorHtml);

        if (this.state.formIsValid && this.state.selectedFile && this.state.editorHtml) {
            this.props.onaddBlog(this.props.token, data);
            this.fieldclearHandler();
            this.setState({ formIsValid: false });
        } else {
            console.log('Invalid')
        }

    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedblogForm = {
            ...this.state.blogForm
        };
        const updatedFormElement = {
            ...updatedblogForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedblogForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedblogForm) {
            formIsValid = updatedblogForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ blogForm: updatedblogForm, formIsValid: formIsValid });
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.blogForm) {
            formElementsArray.push({
                id: key,
                config: this.state.blogForm[key]
            });
        }
        let form = (
            <form onSubmit={this.blogHandler}>
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
                <FileUploader clicked={this.fileSelectedHandler} text="Blog Thumbail" />
                <Button btnType="WebButton">{this.state.update ? 'Update Blog' : 'Add Blog'}</Button>

            </form>
        );

        return (

            <div className={classes.Main}>
                {/* {redirect}
            {imgsnack} */}
                <div className={classes.Album}>
                    {/* <NavLink to="/dashboard/designer">
                        <i className="fas fa-times"></i>
                    </NavLink> */}
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Add Blog</h1>
                            <div className={classes.FormCardInfo}>
                                <div className={classes.FormSide}>
                                    <div className={classes.Form} >
                                        {form}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.AlbumImage} >
                            <img src={this.state.selectedFile ? this.state.selectedFileURL : blogcvr} alt="Album_Thumbnail" />
                        </div>
                    </div>


                    <div className={classes.AlbumEditor}>
                        <h2>Blog Body</h2>
                        <ReactQuill
                            theme={this.state.theme}
                            onChange={this.handleChange}
                            value={this.state.editorHtml}
                            modules={Blog.modules}
                            formats={Blog.formats}
                            bounds={'.app'}
                            placeholder={this.props.placeholder}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

Blog.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Blog.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
]

/* 
 * PropType validation
 */
Blog.propTypes = {
    placeholder: PropTypes.string,
}


const mapStateToProps = state => {
    return {
        loading: state.AddBlog.loading,
        error: state.AddBlog.error,
        token: state.Auth.token,
        flag: state.Auth.flag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaddBlog: (token, blogData) => dispatch(actions.AddBlog(token, blogData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);