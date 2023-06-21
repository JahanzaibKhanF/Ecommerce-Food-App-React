import React from "react";

import Carousel from "../components/Carousel";
import CheezyAdition from "../components/CheezyAdition";
import Starters from "../components/Starters";
import SomeWhatLocal from "../components/SomeWhatLocal";

function Home(props) {
  return (
    <div className="w-full">
      <Carousel />
      <CheezyAdition />
      <Starters />
      <SomeWhatLocal />
    </div>
  );
}

export default Home;
