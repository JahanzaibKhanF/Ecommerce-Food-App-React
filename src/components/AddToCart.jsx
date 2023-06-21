import { AiFillCloseSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { closeCartBox } from "../actions";
import { increaseItem } from "../actions";
import { decreaseItem } from "../actions";
import { addItemToCart } from "../actions";
import { useEffect, useState } from "react";

function AddToCart() {
  const { isOpen, cartData } = useSelector((state) => state.switchCartBox);
  const dispatch = useDispatch();

  if (!cartData) {
    return null; // or render a loading state or placeholder
  }

  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [variationAmount, setVariationAmount] = useState({
    price: 0,
    type: "",
  });
  const [ExtraAmount, setExtraAmount] = useState({ price: 0, type: "" });

  const [isAmountSelected, setIsAmountSelected] = useState(true);
  const handleQuantity = (action) => {
    switch (action) {
      case "INCREASE":
        setQuantity(quantity + 1);
        break;
      case "DECREASE":
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }

        break;
      default:
        break;
    }
  };
  const handleVariationAmount = (e) => {
    const { price, type } = JSON.parse(e.target.value);

    setVariationAmount({ price, type });
  };
  const handleExtraAmount = (e) => {
    const { price, type } = JSON.parse(e.target.value);
    setExtraAmount({ price, type });
  };
  useEffect(() => {
    setTotalAmount(
      (Number(variationAmount.price) + Number(ExtraAmount.price)) * quantity
    );

    if (variationAmount.price > 0) {
      setIsAmountSelected(true);
    }
  });
  const handleAddtoCart = () => {
    if (variationAmount.price < 1) {
      setIsAmountSelected(false);
    } else {
      setIsAmountSelected(true);
      const itemData = {
        variationAmount: variationAmount.price,
        ExtraAmount: ExtraAmount.price,
        variationType: variationAmount.type,
        extraType: ExtraAmount.type,
        img: cartData.img,
        title: cartData.title,
        details: cartData.details,
        quantity,
        id: cartData.id,
      };

      dispatch(addItemToCart(itemData));
      dispatch(closeCartBox());
    }
  };
  return (
    <div
      onClick={() => dispatch(closeCartBox())}
      className={`w-full  h-full ${
        isOpen ? "block" : "hidden"
      } py-5 md:py-[50px]  bg-black bg-opacity-50 backdrop-filter backdrop-blur-md fixed z-[10]`}
    >
      <div className="relative max-w-[1280px] mx-5 sm:mx-[10%] h-full rounded-3xl overflow-hidden">
        {/* closing icon */}
        <AiFillCloseSquare
          onClick={() => dispatch(closeCartBox())}
          size={30}
          className="cursor-pointer absolute top-0 right-2 z-20 text-gray-900/50"
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full bg-gray-50 overflow-hidden overflow-y-auto   md:flex relative"
        >
          {/* img and details */}
          <div className="w-full h-[50%] md:h-full md:w-1/2  relative">
            <img
              src={cartData.img}
              alt="food image"
              className="w-full  h-full"
            />
            <div className="absolute bottom-0 left-0  bg-black/10 px-3 w-full text-white  pt-5 py-5 shadow">
              <p className="text-4xl font-bold">{cartData.title}</p>
              <p>{cartData.details} </p>
            </div>
          </div>
          {/* controlls and buttons */}
          {/* regular prices */}
          <div className="w-full h-[30%] md:h-full md:w-1/2 h-[30%]   ">
            <div className="">
              <div
                className={`${
                  isAmountSelected ? "bg-gray-300" : "bg-red-500"
                } px-5 py-3 w-full flex justify-between `}
              >
                <p className="text-lg font-medium">Variation</p>
                {variationAmount.price == 0 ? (
                  <div
                    className="text-white 
                  bg-red-500
                 px-2 rounded-xl 
             "
                  >
                    <p>Required</p>
                  </div>
                ) : (
                  <div
                    className="text-white 
                  bg-green-500
                 px-2 rounded-xl 
             "
                  >
                    <p>Selected</p>
                  </div>
                )}
              </div>
              {cartData?.prices?.map((item) => {
                return (
                  <div className="flex justify-between border-b border-gray-100 py-4 px-5">
                    <div>
                      <input
                        type="radio"
                        name="prices"
                        value={JSON.stringify({
                          price: item.price,
                          type: item.type,
                        })}
                        onChange={handleVariationAmount}
                        className="custom-radio"
                      />
                      <label> {item.type}</label>
                    </div>
                    <p className="text-gray-400">{item.price}</p>
                  </div>
                );
              })}
            </div>
            {/* Extra Top prices */}
            {cartData.extra && (
              <div className="">
                <div className="bg-gray-300 px-5 py-3 w-full flex justify-between ">
                  <p className="text-lg font-medium">Extra Topping</p>
                </div>
                {cartData.extra.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between border-b border-gray-100 py-4 px-5"
                    >
                      <div>
                        <input
                          type="radio"
                          name="extra"
                          value={JSON.stringify({
                            price: item.price,
                            type: item.type,
                          })}
                          onChange={handleExtraAmount}
                          className="custom-radio"
                        />
                        <label> {item.type}</label>
                      </div>
                      <p className="text-gray-400">{item.price}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* tottal amount + add to cart etc */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white border-t absolute bottom-0 md:right-0 w-[100%] md:w-[50%] flex justify-between h-[53px] py-2 px-2"
        >
          <div className="flex gap-1 md:gap-3 w-3/6 sm:w-2/6 ">
            <button
              onClick={() => handleQuantity("DECREASE")}
              className="w-2/4 bg-red-500 hover:bg-yellow-400 text-white hover:text-black text-3xl  rounded-full     "
            >
              -
            </button>
            <div className=" rounded-full w-full  border border-gary-100 hover:border-black bg-white">
              <p className="text-center">{quantity}</p>
            </div>
            <button
              onClick={() => handleQuantity("INCREASE")}
              className="w-2/4 bg-red-500 hover:bg-yellow-400 text-white hover:text-black text-3xl rounded-full    "
            >
              +
            </button>
          </div>
          <div className="w-2/6 md:block">
            <p className=" text-center">RS. {totalAmount}</p>
          </div>
          <div className="w-2/6">
            <button
              onClick={handleAddtoCart}
              className="bg-red-500 hover:bg-yellow-400 text-white hover:text-black py-2 rounded-full w-full    "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
