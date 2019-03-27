import React from 'react';
import classes from './Logo.css';
import VJLogoWhite from '../../assets/images/VJ_L2_White.png';
import VJLogo from '../../assets/images/VJ_LOGO.png';

const Logo = (props) => {
    let image = null;
    if (props.logoType === "White") {
        image = (<img src={VJLogoWhite} alt="Vogue Junction Logo" />);
    } else if (props.logoType === "Black") {
        image = (<img src={VJLogo} alt="Vogue Junction Logo" />);
    }
    return (
        <div className={classes.Logo}>
            {image}
            <h4>Vogue Junction</h4>
        </div>
    );
}

export default Logo;