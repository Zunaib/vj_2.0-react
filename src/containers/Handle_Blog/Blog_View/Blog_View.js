import React, { Component } from 'react';
import classes from './Blog_View.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import { NavLink, Redirect } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';
import Snack from '../../../components/UI/SnackBar/Snackbar';



// import video from '../../../assets/images/Vid.mp4'

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
            let blog = this.props.currentblog[0];
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

