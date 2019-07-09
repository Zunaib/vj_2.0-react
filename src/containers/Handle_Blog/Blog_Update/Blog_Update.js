import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Blog_Update.css'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import { Redirect, NavLink } from 'react-router-dom';
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
import Snack from '../../../components/UI/SnackBar/Snackbar';
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
                description: {
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
            blog: null,
            blogthumbnail: null,
            formIsValid: false,
            imageselected: null,
            selectedFile: null,
            selectedsnack: false,
            selectedFileURL: null,
            editorHtml: '',
            theme: 'snow'

        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/handle_blog/update_blog/");
        this.props.onfetchcurrentblog(this.props.token, str[1])
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentblog !== prevState.blog) {
            return { blog: nextProps.currentblog };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentblog !== this.props.currentblog) {
            //Perform some operation here
            this.setState({ blog: this.props.currentblog });
            this.setData();
        }
    }

    setData() {
        let prevBlog = this.state.blog;

        if (prevBlog) {
            console.log(this.state.blog)
            const updatedblogForm = {
                ...this.state.blogForm
            };

            const formElements = ['title', 'description'];

            for (let i = 0; i < formElements.length; i++) {
                const updatedFormElement = {
                    ...updatedblogForm[formElements[i]]
                };

                let target = formElements[i];

                if (prevBlog[target] === null) {
                    updatedFormElement.value = "";
                    updatedFormElement.valid = false;
                    updatedFormElement.touched = false;
                } else {
                    updatedFormElement.value = prevBlog[target];
                    updatedFormElement.valid = true;
                    updatedFormElement.touched = true;
                }

                updatedblogForm[formElements[i]] = updatedFormElement;
            }

            let formIsValid = true;
            for (let inputIdentifier in updatedblogForm) {
                formIsValid = updatedblogForm[inputIdentifier].valid && formIsValid;
            }
            let blog_thumbnail = null;
            if (prevBlog.thumbnail) {
                blog_thumbnail = 'http://localhost:5000' + prevBlog.thumbnail;
            }
            this.setState({ blogForm: updatedblogForm, formIsValid: formIsValid, blogthumbnail: blog_thumbnail, editorHtml: prevBlog.content });
        }
    }

    fileSelectedHandler = (event) => {
        this.setState({
            blog: null,
            selectedFile: event.target.files[0],
            selectedFileURL: URL.createObjectURL(event.target.files[0]),
            selectedsnack: true,
            imageselected: true
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

        this.setState({ blogForm: updatedblogForm, formIsValid: false, editorHtml: '', selectedFile: null, selectedsnack: false, imageselected: false });
    }

    blogHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.blogForm) {
            formData[formElementIdentifier] = this.state.blogForm[formElementIdentifier].value;
        }

        const formElements = ['title', 'description'];
        let prevBlog = this.state.blog;
        let action = false;
        for (let i = 0; i < formElements.length; i++) {
            let target = formElements[i];
            if (formData[target] !== prevBlog[target]) {
                action = true;
            }
        }

        if (this.state.editorHtml !== prevBlog.content) {
            action = true;
        }

        let data = new FormData();
        if (this.state.selectedFile) {
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
            action = true;
        } else {
            data.append('thumbnail', prevBlog.thumbnail);
        }

        console.log(action)

        data.append('blogId', prevBlog._id);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('content', this.state.editorHtml);

        if (this.state.formIsValid && action) {
            this.props.onupdatecurrentBlog(this.props.token, data);
            this.fieldclearHandler();
            this.setState({ formIsValid: false });
            console.log('valid')
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

    onaddBlogMsg = () => {
        this.setState({ imageselected: false })
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
                <FileUploader clicked={this.fileSelectedHandler}
                    text={"Select Thumbnail"}
                    textt={this.state.selectedFile ? "Thumbnail Selected" : "Select Blog Thumbnail"} />
                <Button btnType="WebButton">Update Blog</Button>

            </form>
        );

        let blog_img = this.state.blogthumbnail;
        if (this.state.selectedFile) {
            blog_img = this.state.selectedFileURL
        }

        let imgsnack = null;
        if (this.state.imageselected) {
            imgsnack = (<Snack message={'File Added: ( ' + this.state.selectedFile.name + ' )'} snackType="success" refresh={this.onaddBlogMsg} />);
        }

        let updateblog = null;
        if (this.props.updated) {
            updateblog = (<Snack message={"Blog Successfully Updated"} snackType="success" refresh={this.props.onupdatecurrentBlogMsg} />);

        }

        return (
            <div className={classes.Main}>
                {imgsnack}
                {updateblog}
                {this.props.updated ? <Redirect to={"/dashboard/blogs/" + this.state.blog._id} /> : null}
                <div className={classes.Album}>
                    <NavLink to='/dashboard'>
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>Update Blog</h1>
                            <div className={classes.FormCardInfo}>
                                <div className={classes.FormSide}>
                                    <div className={classes.Form} >
                                        {form}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.AlbumImage} >
                            <img src={blog_img ? blog_img : blogcvr} alt="Album_Thumbnail" />
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
        currentblog: state.ViewBlog.currentblog,
        loading: state.ViewBlog.loading,
        error: state.ViewBlog.error,
        updated: state.UpdateBlog.updated,
        token: state.Auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentblog: (token, blogid) => dispatch(actions.FetchSingleBlog(token, blogid)),
        onupdatecurrentBlog: (token, blogData) => dispatch(actions.UpdateBlog(token, blogData)),
        onupdatecurrentBlogMsg: () => dispatch(actions.UpdateBlogMsg())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);