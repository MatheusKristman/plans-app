import { useEffect } from "react";
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
  const { isFilterBoxOpen, closeMobileNav } = useHomeStore(
    (state) => ({
      isFilterBoxOpen: state.isFilterBoxOpen,
      closeMobileNav: state.closeMobileNav,
    }),
    shallow
  );

  useEffect(() => {
    closeMobileNav();
  }, []);

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
