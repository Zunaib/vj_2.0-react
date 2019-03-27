import React from 'react';
import classes from './Header.css';

const Header = () => (
    <section className={classes.Header}>
        {/* <img src={LandingImg} alt="Landing Page Image First" /> */}
        <div className={classes.head}>
            <h1>Fall Into The Vogue</h1>
            <div>
                <p>Design Can Be Art. Design Can Be Asthetics. Design Is So Simple, That's Why It Is So Complicated.</p>
                <div><a className={classes.Contact} href="/">Contact Us</a></div>
            </div>
        </div>
    </section>
);

export default Header;