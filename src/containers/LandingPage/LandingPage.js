import React, { Component } from 'react';
import classes from './LandingPage.css';

import Header from './Header/Header';
import AboutUs from './AboutUs/AboutUs';
import Services from './Services/Services';
import Gallery from './Gallery/Gallery';
import Mission from './Mission/Mission';
import ContactUsForm from './ContactUsForm/ContactUsForm';
import Footer from './Footer/Footer';

export class LandingPage extends Component {
    render() {
        return (
            <div className={classes.Container}>
                <Header />
                <AboutUs />
                <Services />
                <Gallery />
                <Mission />
                <ContactUsForm />
                <Footer />
            </div>

        );
    }
}

export default LandingPage;
