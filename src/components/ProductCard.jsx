// import cheezy2 from "../assets/cheezy2.webp";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openCartBox } from "../actions";
export default function ProductCard({ item }) {
  const price =
    item.prices && item.prices.length > 0 ? item.prices[0].price : null;
  const dispatch = useDispatch();
  const handleCartBox = () => {
    const data = {
      title: item.title,
      img: item.img,
      details: item.details,
      prices: item.prices,
      extra: item.extra,
      id: item.id,
    };
    dispatch(openCartBox(data));
  };

  return (
    <>
      <div className="w-full h-fit  ">
        <div className="max-w-[1280px] mx-auto mx-3 sm:mx-10 lg:mx-[100px] py-[130px] ">
          <div className=" w-full border rounded-2xl bg-[white] ">
            <div className="md:flex">
              <div className="md:w-2/5 border-3xl lg:pl-20  pt-16 md:mb-20  ">
                <img src={item.img} className="w-full h-full" />
              </div>
              <div className="   md:w-3/5 px-4   pt-8 ">
                <div className="  w-full md:w-5/6 lg:w-4/6 text-left">
                  <h1 className="    font-bold  text-3xl py-4">{item.title}</h1>
                  <p className=" text-gray-500 ">{item.details}</p>
                  <div className="md:text-xl flex text-sm flex  md:mt-40">
                    <AiOutlineHeart
                      className=" md:mt-2 mx-1 text-center text-[red]"
                      size="24"
                    />
                    <span className=" mt-1 hover:text-yellow-400">
                      Add to Favourite
                    </span>
                  </div>
                  <h1 className=" md:text-xl text-sm font-bold">Rs. {price}</h1>
                  <button
                    onClick={() => handleCartBox()}
                    className="  hover:bg-yellow-400 hover:text-black w-full  my-4 py-2  px-28 text-lg font-bold bg-red-600 mb-6   text-white rounded-full  "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
