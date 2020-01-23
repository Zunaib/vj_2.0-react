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
                <Header scrollToContactUs={this.props.scrollToContactUs} />
                <AboutUs aboutRef={this.props.aboutRefProp} />
                <Services />
                <Gallery />
                <Mission missionRef={this.props.missionRefProp} />
                <ContactUsForm contactUsRef={this.props.contactUsRefProp} />
                <Footer />
            </div>

        );
    }
}


export default LandingPage;
