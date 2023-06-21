import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/slide1.webp";
import slide2 from "../assets/slide2.webp";
import slide3 from "../assets/slide3.webp";
import { GrNext, GrPrevious } from "react-icons/gr";

const Carousel = () => {
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
        <div className="mx-w-[1280px] mx-auto py-[130px]">
          <div className="px-4 sm:px-10 md:px-[90px] ">
            <Slider {...settings}>
              <div className="rounded-2xl overflow-hidden ">
                <img src={slide1} className="rounded-2xl" />
              </div>
              <div className="rounded-2xl overflow-hidden ">
                <img src={slide2} className="rounded-2xl" />
              </div>
              <div className="rounded-2xl overflow-hidden ">
                <img src={slide3} className="rounded-2xl" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
