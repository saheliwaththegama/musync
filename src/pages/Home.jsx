import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import UpcomingEvents from "../components/sections/UpcomingEvents";
import Announcements from "../components/sections/Announcements";
import Categories from "../components/sections/Categories";
import CallToAction from "../components/sections/CallToAction";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <UpcomingEvents />
      <Announcements />
      <Categories />
      <CallToAction />
    </>
  );
}

export default Home;