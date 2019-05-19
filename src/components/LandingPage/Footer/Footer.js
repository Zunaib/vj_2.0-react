import React from 'react';
import classes from './Footer.css';

const Footer = () => (
    <footer className={classes.Footer}>
        <h3>Vogue Junction By Miscellaneous</h3>
        <a href="https://www.gmail.com/" rel="noopener noreferrer" target="_blank">Support <br /> Miscellaneous@supportme.com</a>
        <ul>
            <li><a href="https://www.facebook.com/" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://www.twitter.com/" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank"><i className="fab fa-instagram"></i></a></li>
        </ul>
    </footer>
);

export default Footer;