import React, { Component } from 'react';
import classes from './Blog_View.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import { NavLink, Redirect } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
import Snack from '../../../components/UI/SnackBar/Snackbar';
import Comment from "../../../components/UI/Comment/Comment";


class ViewBlog extends Component {
    state = {
        blogid: window.location.href.split("http://localhost:3000/dashboard/blogs/")[1],
        delete: null,

    }

    componentDidMount() {
        let str = window.location.href.split("http://localhost:3000/dashboard/blogs/")[1];
        this.props.onfetchcurrentblog(this.props.token, str);

    }

    blogdelete = () => {
        this.props.onblogdelete(this.props.token, this.state.blogid)
    }
    render() {
        let blogdata = null;

        if (this.props.loading) {
            blogdata = <Spinner />
        } else {
            let blog = this.props.currentblog;
            let editpath = '/dashboard/handle_blog/update_blog/' + this.state.blogid;

            let settingbutton = null;
            if (blog) {
                if (this.props.userId === blog.userId) {
                    console.log('can edit');
                    settingbutton = (
                        <div className={classes.SettingButton}>
                            <Settings editpath={editpath} delete={this.blogdelete} />
                        </div>
                    );
                }
            }


            let blogcomments = (
                <div className={[classes.Comment]}>
                    <h3>No Comments Yet, Be The First One To Add</h3>
                </div>
            );
            if (blog.comments.length > 0) {
                blogcomments = (blog.comments.map((comment, index) => (
                    <div className={[classes.Comment]} key={comment._id}>
                        <h3>{comment.userId.firstName ? comment.userId.firstName + " " + comment.userId.lastName : "Anonymous"}</h3>
                        <p>{comment.comment}</p>
                    </div>
                )));

            }

            blogdata = (
                <Auxilary>
                    <NavLink to="/dashboard">
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    {settingbutton}
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>{blog.title}</h1>
                            <div className={classes.Desc}>
                                {blog.description}
                            </div>
                        </div>
                    </div>
                    <div className={classes.AlbumEditor}>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} className={classes.BlogContent} />
                    </div>


                    <div className={classes.Feedback}>
                        <h2>Comments</h2>
                        <div className={classes.Comments}>
                            {blogcomments}
                        </div>
                        <div className={classes.EnterComment}>
                            <h4>Enter Comment :</h4>
                            <Comment />
                        </div>
                    </div>
                </Auxilary>

            )
        }

        let blogdel = null;
        if (this.props.deleted) {
            blogdel = (<Snack message={"Blog Successfully Deleted"} snackType="success" refresh={this.props.onblogdeleteMsg} />);
        }

        return (
            <div className={classes.Main}>
                {blogdel}
                {this.props.deleted ? <Redirect to="/dashboard/designer" /> : null}
                <div className={classes.Album}>
                    {blogdata}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        userId: state.Auth.userId,
        currentblog: state.ViewBlog.currentblog,
        loading: state.ViewBlog.loading,
        deleted: state.DeleteBlog.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentblog: (token, blogid) => dispatch(actions.FetchSingleBlog(token, blogid)),
        onblogdelete: (token, blogid) => dispatch(actions.DeleteBlog(token, blogid)),
        onblogdeleteMsg: () => dispatch(actions.DeleteBlogMsg()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlog);

