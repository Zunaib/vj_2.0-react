import React from 'react';
import classes from './Logo.css';
import VJLogoWhite from '../../assets/images/VJ_L2_White.png';
import VJLogo from '../../assets/images/VJ_LOGO.png';

const Logo = (props) => {
    let image = null;
    if (props.logoType === "White") {
        image = (
            <div className={classes.LogoWhite}>
                <img src={VJLogoWhite} alt="Vogue Junction Logo" />
            </div>
        );
    } else if (props.logoType === "Black") {
        image = (
            <div className={classes.Logo}>
            <img src={VJLogo} alt="Vogue Junction Logo" />
            </div>
            );
    }
    return (
        <div >
            {image}
        </div>
    );
}

export default Logo;