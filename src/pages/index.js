import React from "react";
import Arrivals from "../components/Home/Arrivals";
import Banner from "../components/Home/Banner/Banner";
import Delivery from "../components/Home/Delivery";

const Home = () => {
  return (
    <div>
      <Banner />
      <Delivery />
      <Arrivals />
      <div className="text-center my-5">
        <img src={require('../img/bannerEnd.png').default} alt="bannerImg" className="w-100"/>
      </div>
    </div>
  );
};

export default Home;
