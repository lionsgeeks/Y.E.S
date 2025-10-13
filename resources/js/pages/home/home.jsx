import Hero from "./components/hero";
import EventInfo from "./components/eventInfo";
import HeroArticles from "./components/heroArticles";
import MobileApp from "./components/mobileApp";
import Sponsors from "./components/sponsors";
import Who from "./components/who";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
const HomePage = () => {

const HomePage = ({ sponsors = [] }) => {
    return (
        <>
            <Navbar />
            {/* Hero */}
            <Hero />

            {/* event info: time, date, etc */}
            <EventInfo />

            {/* sponsors */}
            <Sponsors sponsors={sponsors} />

            {/* who we are */}
            <Who />

            {/* mobile app */}
            <MobileApp />

            {/* articles */}
            {/* hadi hta tqad backend o ndiroha hadi dyal articles */}
            <HeroArticles />
            <Footer />
        </>
    );
};

export default HomePage;
