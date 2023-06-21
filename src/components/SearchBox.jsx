import React, { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import products from "../data/Products";
import FoodSearchListCard from "./FoodSearchListCard";
import { Link, useNavigate } from "react-router-dom";

function SearchBox(props) {
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  const handleSearch = (e) => {
    const searchData = e.target.value;
    setSearch(searchData);
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  return (
    <div
      onClick={props.open}
      className=" w-full  h-full py-[50px]  bg-black bg-opacity-50 backdrop-filter backdrop-blur-md fixed z-[10]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-[350px] sm:w-[600px] h-fit  rounded-3xl bg-white  px-3 py-3  ]"
      >
        <div className="fixed -translate-x-5    w-[350px]  sm:w-[600px] -translate-y-[12px]  ml-2 rounded-3xl bg-white">
          <div className="flex justify-between py-3 mx-2">
            <h4 className="text-xl">Search</h4>
            <AiFillCloseSquare
              onClick={props.open}
              size={30}
              className="cursor-pointer"
            />
          </div>
          <div className="mx-1 py-1">
            <input
              type="text"
              placeholder="Search Products Here... "
              className="border border-slate-300 focus:border-yellow-400 focus:outline-none focus:border-b-[2px] rounded-3xl w-full px-3 py-2"
              autoFocus
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="mt-[100px] h-fit overflow-hidden">
          {filteredProduct.length > 0 ? (
            filteredProduct
              .slice(0, 6)
              .map((item) => (
                <FoodSearchListCard
                  title={item.title}
                  details={item.details}
                  img={item.img}
                />
              ))
          ) : (
            <p className="text-center font-medium text-gray-400">
              Search with product name for better resultes
            </p>
          )}
          {filteredProduct.length > 6 ? (
            <Link
              to={`/search?=${search}`}
              className="text-yellow-500 ml-[35%]"
              onClick={props.open}
            >
              View all resultes
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
