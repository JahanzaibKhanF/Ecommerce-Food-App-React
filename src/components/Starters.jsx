import React from "react";
import FoodCard from "./FoodCard";
import products from "../data/Products";

function Starters(props) {
  const filteredProducts = products.filter(
    (item) => item.category === "starters"
  );

  return (
    <div className="w-full">
      <div className="max-w-[1280px] mx-auto mx-3 sm:mx-10 lg:mx-[100px] py-10 ">
        <div className="border border-r-0 border-l-0 border-b-0 py-5">
          <h3 className="text-3xl font-bold">Starters</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm: gap-4 py-5">
            {filteredProducts.map((item) => {
              return (
                <FoodCard
                  key={item.id}
                  title={item.title}
                  img={item.img}
                  details={item.details}
                  prices={item.prices}
                  extra={item.extra}
                  id={item.id}
                  category={item.category}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Starters;
