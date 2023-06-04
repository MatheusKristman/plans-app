import React from "react";

import HomeHeader from "./components/HomeHeader";
import HomeHero from "./components/HomeHero";
import HomeHowItWorks from "./components/HomeHowItWorks";

const Home = () => {
  return (
    <div className="container">
      <HomeHeader />
      <HomeHero />
      <HomeHowItWorks />
    </div>
  );
};

export default Home;
