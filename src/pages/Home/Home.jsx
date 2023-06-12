import React from "react";
import useHomeStore from "../../stores/useHomeStore";
import { shallow } from "zustand/shallow";
import { ToastContainer } from "react-toastify";

import HomeHeader from "./components/HomeHeader";
import HomeHero from "./components/HomeHero";
import HomeHowItWorks from "./components/HomeHowItWorks";
import HomeBenefits from "./components/HomeBenefits";
import HomeFAQ from "./components/HomeFAQ";
import Footer from "../components/Footer";
import HomeInitialFilterBox from "./components/HomeInitialFilterBox";

const Home = () => {
  const { isFilterBoxOpen } = useHomeStore(
    (state) => ({
      isFilterBoxOpen: state.isFilterBoxOpen,
    }),
    shallow
  );

  return (
    <div className="container">
      {isFilterBoxOpen && <HomeInitialFilterBox />}
      <ToastContainer />
      <HomeHeader />
      <HomeHero />
      <HomeHowItWorks />
      <HomeBenefits />
      <HomeFAQ />
      <Footer />
    </div>
  );
};

export default Home;
