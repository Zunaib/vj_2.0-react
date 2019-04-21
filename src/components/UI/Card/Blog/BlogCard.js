import React from 'react';
import classes from './BlogCard.css';
const BlogCard = (props) => {

    return (
        <div className={classes.BlogCard}>
            <div className={classes.Image}>
                <div className={classes.BlogCardText}>
                    <h4><b>Title</b></h4>
                    <div>
                        Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.</div>
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