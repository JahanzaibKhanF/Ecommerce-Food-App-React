import React from "react";

function FoodSearchListCard(props) {
  return (
    <div className="flex gap-3">
      <div className="bg-gray-400 w-10 h-10 my-2">
        <img src={props.img} alt="" className="h-full w-full" />
      </div>
      <div className="mt-3">
        <h5 className="font-medium">{props.title}</h5>
        <p className="text-sm">{props.details}</p>
      </div>
    </div>
  );
}

export default FoodSearchListCard;
