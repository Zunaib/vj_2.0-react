import React, { Component } from 'react';
import classes from './LandingPage.css';

import Header from '../../components/LandingPage/Header/Header';
import AboutUs from '../../components/LandingPage/AboutUs/AboutUs';
import Services from '../../components/LandingPage/Services/Services';
import Gallery from '../../components/LandingPage/Gallery/Gallery';
import Mission from '../../components/LandingPage/Mission/Mission';
import ContactUsForm from '../../components/LandingPage/ContactUsForm/ContactUsForm';
import Footer from '../../components/LandingPage/Footer/Footer';

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
