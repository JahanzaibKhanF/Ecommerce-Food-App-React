import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GrNext, GrPrevious } from "react-icons/gr";

const FoodCardsSlider = ({ items }) => {
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      >
        <div className="bg-red-600 md:w-10 px-2 py-5  rounded-2xl hidden md:block  absolute top-[50%] -translate-y-[50%] left-[50%] translate-x-[40%] ">
          <GrNext size={32} color="#FF0000" />
        </div>
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      >
        <div className=" bg-red-600 w-10  px-2 py-5 rounded-2xl hidden md:block  absolute top-[50%] -translate-y-[50%] right-[50%] -translate-x-[30%] ">
          <GrPrevious size={32} color="#FF0000" />
        </div>
      </div>
    );
  }

  const [slidNumbers, setSlidNumbers] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize > 900) {
        setSlidNumbers(4);
      } else if (screenSize > 650) {
        setSlidNumbers(3);
      } else {
        setSlidNumbers(2);
      }
    };

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidNumbers,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <>
      <div className="w-full">
        <div className="mx-w-[1280px] mx-auto py-4">
          <div className="py-10 mx-3 sm:mx-10 lg:mx-[100px] flex jutify-between">
            <div className="w-2/4 border-b border-gray-300 mb-2"></div>
            <p className="w-2/6 sm:w-1/6 text-center text-lg sm:text-xl font-bold">
              More in &nbsp;
              {items
                .map((item) => {
                  return item.category;
                })
                .slice(0, 1)}
            </p>
            <div className="w-2/4 border-b border-gray-300 mb-2"></div>
          </div>
          <div className="px-4 sm:px-10 md:px-[90px] border roundex-2xl py-3 mx-3 sm:mx-10 lg:mx-[100px] bg-[white] ">
            <Slider {...settings}>
              {items.map((item) => {
                return (
                  <FoodCard
                    key={item.id}
                    title={item.title}
                    img={item.img}
                    details={item.details}
                    prices={item.prices}
                    id={item.id}
                    category={item.category}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCardsSlider;
