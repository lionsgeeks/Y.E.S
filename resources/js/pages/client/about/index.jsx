import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';
import { AboutSection } from './partials/AboutSection';
import { OrganizatesSection } from './partials/OrganizatesSection';
import { CommitteeSection } from './partials/CommitteeSection';

const About = ({sponsors, committee = []}) => {
    return (
        <>
            <Navbar />
            <AboutSection />
            {/* <HistorySection /> */}
            <OrganizatesSection sponsors={sponsors} />
            <CommitteeSection committee={committee} />
            <Footer />
        </>
    );
};

export default About;