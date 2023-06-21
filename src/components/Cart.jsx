import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCart,
  increaseItem,
  decreaseItem,
  deleteItem,
  clearCart,
} from "../actions";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function Cart(props) {
  const open = useSelector((state) => state.handleCart);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.AdditemToCart.cartItems);
  const calculateTotalAmount = (item) => {
    const { variationAmount, ExtraAmount, quantity } = item;
    return (Number(variationAmount) + Number(ExtraAmount)) * quantity;
  };

  const calculateGrandTotal = () => {
    let grandTotal = 0;
    cartItems.map((item) => {
      const { variationAmount, ExtraAmount, quantity } = item;
      const itemTotal =
        (Number(variationAmount) + Number(ExtraAmount)) * quantity;
      grandTotal += itemTotal;
    });
    return grandTotal;
  };

  return (
    <div
      onClick={() => dispatch(closeCart())}
      className={`w-full h-screen fixed ${
        open ? "block" : "hidden"
      } bg-black/50 z-[10]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[80%] md:w-[50%] lg:w-[28%] h-[100%] bg-gray-50 rounded-2xl overflow-hidden  absolute  ${
          open
            ? "right-0 transition-all duration-700"
            : "-right-full transition-all duration-700"
        }`}
      >
        <div className="flex justify-between bg-gray-100 px-2 py-2">
          <p className="font-medium text-lg">Your Cart</p>
          {cartItems.length > 0 ? (
            <p
              onClick={() => {
                dispatch(clearCart());
                dispatch(closeCart());
              }}
              className="font-medium text-lg text-yellow-400 underline cursor-pointer"
            >
              Clear Cart
            </p>
          ) : (
            ""
          )}
        </div>

        {/* if data is avalbe in cart the show it otherwise show empty cart */}
        {cartItems.length > 0 ? (
          <div className=" h-[63%] mx-3 overflow-y-auto">
            {cartItems.map((item, index) => {
              return (
                <div key={item.id} className="flex gap-4 py-2 my-3 border-t ">
                  <div className=" w-[100px] h-[50px] relative">
                    <img src={item.img} className="w-full h-full" />
                    <div className="bg-yellow-400 h-5 w-5 rounded px-1 left-0 top-0 absolute">
                      {item.quantity}
                    </div>
                  </div>
                  <div>
                    <div className="px-1">
                      <p className="font-medium   "> {item.title}</p>
                      <p className="text-gray-400 ">{item.details}</p>
                      <p>{item.variationType + " x " + item.quantity} </p>
                      {item.extraType && (
                        <p>{item.extraType + " x " + item.quantity}</p>
                      )}
                    </div>
                    <div className="flex justify-end py-3">
                      <p className="font-bold">
                        RS. {calculateTotalAmount(item)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="gap-2 flex">
                        <button
                          onClick={() => dispatch(decreaseItem(item.id))}
                          className="bg-red-500 text-white hover:bg-yellow-400 hover:text-black  rounded-full h-7 w-7"
                        >
                          -
                        </button>
                        <button
                          onClick={() => dispatch(increaseItem(item.id))}
                          className="bg-red-500 text-white hover:bg-yellow-400 hover:text-black  rounded-full h-7 w-7"
                        >
                          +
                        </button>
                      </div>
                      <RiDeleteBin6Line
                        onClick={() => dispatch(deleteItem(item.id))}
                        size={20}
                        className="text-gray-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // if cart us empty the show this
          <div className="h-full w-full bg-gary-50">
            <div className="mt-[50%] text-gray-400 ">
              <div className="mx-[40%]">
                <GiForkKnifeSpoon size={70} />
              </div>
              <p className="text-center">Your cart is empty</p>
              <p className="text-center">
                Add an item and start making your order
              </p>
            </div>
          </div>
        )}
        <div className=" h-[37%] border-t py-3 px-3 ">
          <div className="px-1 bg-orange-50 border-t-2 border-yellow-300">
            <p className="text-sm">you have got free delivery!</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="text-gray-700"> Subtotal</p>
            <p className="text-gray-500">RS. {calculateGrandTotal()}</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="text-gray-700"> Delivery Charges</p>
            <p className="text-gray-500">RS. 0.0</p>
          </div>
          <div className="flex justify-between py-1">
            <p className=" font-bold"> Grand Total</p>
            <p className="text-gray-500 font-bold">
              RS. {calculateGrandTotal()}
            </p>
          </div>

          <Link to="/checkout">
            <button
              onClick={() => dispatch(closeCart())}
              className="bg-red-500 text-white font-bold hover:bg-yellow-400 hover:text-black w-full rounded-full py-2 my-1"
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
