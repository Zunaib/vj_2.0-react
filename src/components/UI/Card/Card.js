import React from 'react';
import classes from './Card.css';
import display from '../../../assets/images/DP.jpg'
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import testimg from '../../../assets/images/testimg.jpg'

const Card = (props) => {
    let card = null;
    if (props.cardType === "productCard") {
        card = (
            <div className={classes.ProductCard}>
                <img src={testimg} alt="" />
                <div className={classes.CardText}>
                    <h4><b>Name</b></h4>
                    <div className={classes.Desc}>
                        Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.</div>
                </div>
                <div className={classes.CardInfo}>
                    <div className={classes.CardPrice}>
                        <h4>Pkr 1000</h4>
                    </div>
                    <div className={classes.CardButton}>
                        Button
                </div>
                </div>
            </div>
        );
    } else if (props.cardType === "vlogCard") {
        card = (
            <div className={classes.VlogCard}>
                <img src={testimg} alt="" />
                <div className={classes.CardText}>
                    <h4><b>Title</b></h4>
                    <div className={classes.Desc}>
                        Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.</div>
                </div>
                <div className={classes.CardInfo}>
                    <div className={classes.CardButton}>
                        Share Button
                    </div>
                    <div className={classes.CardButton}>
                        Button
                    </div>
                </div>
            </div>
        );
    } else if (props.cardType === "blogCard") {
        card = (
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
    } else if (props.cardType === "formCard") {
        card = (
            <div className={classes.FormCard}>
                <div className={classes.FormOverlapDiv} >
                    <div></div>
                </div>
                <div className={classes.CardText}>

                </div>
                <div className={classes.FormCardInfo}>
                    <div className={classes.FormCardButton}>
                        Update
                        </div>
                </div>
            </div>
        );
    } else if (props.cardType === "profileCard") {
        card = (
            <div className={classes.ProfileCard}>
                <div className={classes.ProfileImageButton} >
                    <img src={display} alt="" />
                </div>
                <div className={classes.ProfileCardText}>
                    <h4><b>Name</b></h4>
                    <h4><b>Logged In As:</b></h4>
                    <div className={classes.ProfileDesc}>
                        Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.
                        Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.
                        Dolce & Gabbana's 'Greta' tote has been crafted in Italy from hard-wearing red textured-leather.
                        </div>
                </div>
            </div>
        );
    } else if (props.cardType === "profileStatsCard") {
        card = (
            <div className={classes.ProfileStatsCard}>
                <div className={classes.ProfileStatsText}>
                    <h4><b>Statistics</b></h4>
                    <h6><b>Followers:</b></h6>
                    <h6><b>Following:</b></h6>
                    <h6><b>Likes:</b></h6>
                    <h4><b>User Details</b></h4>
                    <h6><b>User Since:</b></h6>
                </div>
            </div>
        );
    } else if (props.cardType === "collectionCard") {
        card = (
            <div className={classes.CollectionCard}>
                <div className={classes.CollectionDrop}>
                    <div className={classes.CollectionCardText}>
                        <h4>Collection Type</h4>
                        <h1>Collection Name</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Auxilary>
            {card}
        </Auxilary>
    );
};

export default Card;