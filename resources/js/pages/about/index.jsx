import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';
import { AboutSection } from './partials/AboutSection';
import { OrganizatesSection } from './partials/OrganizatesSection';

const About = () => {
    return (
        <>
            <Navbar />
            <AboutSection />
            {/* <HistorySection /> */}
            <OrganizatesSection />
            <Footer />
        </>
    );
};

export default About;