import React from "react";
import circle_lazy_loading from "../assets/circle_lazy_loading.gif";

function LazyLoading(props) {
  return (
    <div className=" w-full  h-full   bg-black bg-opacity-50 backdrop-filter backdrop-blur-md fixed z-[10]">
      <div className="w-10 mx-auto my-[20%]">
        <img src={circle_lazy_loading} alt="" className="w-full" />
      </div>
    </div>
  );
}

export default LazyLoading;
