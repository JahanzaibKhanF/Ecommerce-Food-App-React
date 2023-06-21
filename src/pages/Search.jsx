import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import products from "../data/Products";
import FoodCard from "../components/FoodCard";

function Search(props) {
  const [searchParam, setSearchParam] = useSearchParams();
  const searchValue = searchParam.toString().replace(/=/g, "");

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-full h-screen  ">
      <div className="max-w-[1280px] mx-auto mx-3 sm:mx-10 lg:mx-[100px] py-[130px] ">
        <div className="bg-white px-6 rounded-xl">
          <div className="flex py-5">
            <Link
              to="/"
              className="text-sm text-sky-700 hover:text-yellow-400 mr-4"
            >
              Home
            </Link>
            <p className="text-sm text-yellow-400 ">Search</p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-4xl font-medium">
              Search results for
              <span className="text-yellow-400 underline">"{searchValue}"</span>
            </h2>
            <div>Sort by</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm: gap-4 py-5">
            {filteredProducts.map((item) => {
              return (
                <div key={item.value}>
                  {" "}
                  <FoodCard
                    key={item.id}
                    title={item.title}
                    img={item.img}
                    details={item.details}
                    price={item.price}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
