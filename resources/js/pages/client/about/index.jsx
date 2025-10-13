import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';
import { AboutSection } from './partials/AboutSection';
import { OrganizatesSection } from './partials/OrganizatesSection';

const About = ({sponsors}) => {
    return (
        <>
            <Navbar />
            <AboutSection />
            {/* <HistorySection /> */}
            <OrganizatesSection sponsors={sponsors} />
            <Footer />
        </>
    );
};

export default About;