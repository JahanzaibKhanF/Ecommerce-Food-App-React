import React, { createContext, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openCartBox } from "../actions";

export default function FoodCard(props) {
  const navigate = useNavigate();
  const OpenProduct = () => {
    navigate(`/product/${props.category}/${props.id}`);
    window.scrollTo(0, 0);
  };
  const dispatch = useDispatch();
  const handleCartBox = () => {
    const data = {
      title: props.title,
      img: props.img,
      details: props.details,
      prices: props.prices,
      extra: props.extra,
      id: props.id,
    };
    dispatch(openCartBox(data));
  };
  const price =
    props.prices && props.prices.length > 0 ? props.prices[0].price : null;

  return (
    <>
      <div className="mx-auto  ">
        <div className="cursor-pointer relative border-2  hover:border-yellow-300 border-slate-200 shadow-xl  text-center bg-[white]  rounded-3xl py-3">
          <div
            onClick={OpenProduct}
            className=" rounded-3xl overflow-hidden mx-3"
          >
            <img className="w-full    " src={props.img} />
          </div>

          <div className=" absolute right-6 top-2 w-7 h-7 border bg-[white] border-[red] mt-4 rounded-full">
            <AiOutlineHeart
              className="mt-[2px] mx-auto text-center text-[red]"
              size="24"
            />
          </div>
          <div className="  ">
            <h1 className="font-bold text-lg ">{props.title}</h1>
            <div className="h-10 overflow-hidden ">
              <p className=" text-sm px-3">{props.details}</p>
            </div>
            <div className=" border-t-[1px]  mb-4 py-3">
              <p className="font-bold text-red-500">from Rs.{price}</p>
              <button
                onClick={handleCartBox}
                className=" font-medium bg-red-600 mb-6 text-lg text-white rounded-full p-2 px-3 "
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
