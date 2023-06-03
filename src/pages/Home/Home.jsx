import React from "react";

import HomeHeader from "./components/HomeHeader";
import HomeHero from "./components/HomeHero";

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
