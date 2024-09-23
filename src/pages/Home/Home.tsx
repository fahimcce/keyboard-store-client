import CustomerReviews from "./CustomerReviews";
import CustomizableOptions from "./CustomizableOptions";
import FeaturedBrands from "./FeaturedBrands";

import Hero from "./Hero";
import Products from "./Products";
import Services from "./Services";

import WhyChoose from "./WhyChoose";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Products />
      <FeaturedBrands />
      <CustomerReviews />
      <WhyChoose />
      <CustomizableOptions />
    </div>
  );
};

export default Home;
