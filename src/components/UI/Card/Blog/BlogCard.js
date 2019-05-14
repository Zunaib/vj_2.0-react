import React from 'react';
import classes from './BlogCard.css';
const BlogCard = (props) => {

    let imgurl = 'http://localhost:5000' + props.thumbnail;

    let sectionStyle = {
        'backgroundImage': "url(" + imgurl + ")"
    };

    return (
        <div className={classes.BlogCard} style={sectionStyle}>
            <div className={classes.Image}>
                <div className={classes.BlogCardText}>
                    <h4><b>{props.title}</b></h4>
                    <div>
                        {props.description}
                    </div>
                </div>
                <div className={classes.BlogCardInfo}>
                    <div className={classes.BlogCardButton}>
                        Read Article
                </div>
                </div>
            </div>

        </div>
    );
};

export default BlogCard;