import HomeHeader from "./components/HomeHeader";
import HomeHero from "./components/HomeHero";
import HomeHowItWorks from "./components/HomeHowItWorks";
import HomeBenefits from "./components/HomeBenefits";
import HomeFAQ from "./components/HomeFAQ";
import Footer from "../components/Footer";

const HomeAlternative = () => {
  return (
    <div className="container-alternative">
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
