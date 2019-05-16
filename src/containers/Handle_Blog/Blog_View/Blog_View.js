import React, { Component } from 'react';
import classes from './Blog_View.css';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/index';
import { NavLink, Redirect } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Settings from '../../../components/UI/Dropdown/SettingsDropdown/Settings';


// import video from '../../../assets/images/Vid.mp4'

class ViewBlog extends Component {
    state = {
        blogid: null,
        delete: null,

    }

    componentDidMount() {
        let str = window.location.href;
        let res = str.split("http://localhost:3000/dashboard/blogs/");
        const blogid = res[1];
        this.setState({ blogid: blogid })
        this.props.onfetchcurrentblog(this.props.token, blogid);

    }

    vlogdelete = () => {
        this.props.onblogdelete(this.props.token, this.state.blogid)
    }
    render() {
        let blogdata = null;
        if (this.props.loading) {
            blogdata = <Spinner />
        } else {
            let blog = this.props.currentblog[0]
            // let video = 'http://localhost:5000' + vlog.videoLink;

            blogdata = (
                <Auxilary>
                    <div className={classes.Album_Top}>
                        <div className={classes.AlbumInfo}>
                            <h1>{blog.title}</h1>
                            <div className={classes.Desc}>
                                {blog.description}
                            </div>
                        </div>
                        {/* <div className={classes.AlbumImage} >
                            <img src={album_thumbnail} alt="Album_Thumbnail" />
                        </div> */}
                    </div>

                    <div className={classes.AlbumEditor}>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} className={classes.BlogContent} />
                    </div>
                </Auxilary>

            )
        }


        let editpath = '/dashboard/handle_blog/update_blog/' + this.state.blogid;
        return (
            <div className={classes.Main}>
                {this.props.deleted ? <Redirect to="/dashboard/designer" /> : null}
                <div className={classes.Album}>
                    <NavLink to="/dashboard">
                        <div className={classes.cross}>
                            <h4>Close</h4>
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink>
                    <div className={classes.SettingButton}>
                        <Settings editpath={editpath} delete={this.vlogdelete} />
                    </div>
                    {blogdata}
                    {/* <NavLink to="/dashboard/designer">
                        <div className={classes.Edit}>
                            <i className="far fa-edit"></i>
                        </div>
                    </NavLink>
              
                    <NavLink to="" onClick={this.albumdelete} >
                        <div className={classes.Remove} >
                            <i className="fas fa-times"></i>
                        </div>
                    </NavLink> */}

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        currentblog: state.ViewBlog.currentblog,
        loading: state.ViewBlog.loading,
        deleted: state.DeleteBlog.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchcurrentblog: (token, blogid) => dispatch(actions.FetchSingleBlog(token, blogid)),
        onblogdelete: (token, blogid) => dispatch(actions.DeleteBlog(token, blogid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlog);

