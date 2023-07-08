import { useEffect } from "react";
import useAlternativeHomeStore from "../../stores/useAlternativeHomeStore";
import { ToastContainer } from "react-toastify";

import HomeHeader from "./components/HomeHeader";
import HomeHero from "./components/HomeHero";
import HomeHowItWorks from "./components/HomeHowItWorks";
import HomeBenefits from "./components/HomeBenefits";
import HomeFAQ from "./components/HomeFAQ";
import Footer from "../components/Footer";
import PJClientRegisterBox from "./components/PJClientRegisterBox";

const HomeAlternative = () => {
  const { closeMobileNav, isFormBoxOpen } = useAlternativeHomeStore((state) => ({
    closeMobileNav: state.closeMobileNav,
    isFormBoxOpen: state.isFormBoxOpen,
  }));

  useEffect(() => {
    closeMobileNav();
  }, []);

  useEffect(() => {
    if (isFormBoxOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
    }
  }, [isFormBoxOpen]);

  return (
    <div className="container-alternative">
      {isFormBoxOpen && <PJClientRegisterBox />}
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

export default HomeAlternative;
