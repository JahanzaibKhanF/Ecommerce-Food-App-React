import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { openLoginBox } from "../actions";
import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import circle_lazy_loading from "../assets/circle_lazy_loading.gif";
import "react-phone-number-input/style.css";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { openAddressBox } from "../actions";
import {
  closeCart,
  increaseItem,
  decreaseItem,
  deleteItem,
  clearCart,
  RunLazyLoading,
  STOPLazyLoading,
} from "../actions";
import { RiDeleteBin6Line } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import { authentication, firestore } from "../firebase_config";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

function Checkout(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const checkLoginBoxCondition = useSelector((state) => state.handleLoginBox);
  const userId = localStorage.getItem("userId");

  const getDataFromDb = async () => {
    dispatch(RunLazyLoading());
    const userId = localStorage.getItem("userId");
    try {
      if (userId) {
        const userCartCollection = collection(
          firestore,
          "users",
          userId,
          "cartItems"
        );
        const userCartDocRef = doc(userCartCollection, userId);
        // dispatch(RunLazyLoading());
        const userCartSnap = await getDoc(userCartDocRef);
        if (userCartSnap.exists) {
          const userData = userCartSnap.data();
          const cartItems = userData.cartItems || [];

          setCartItems(cartItems);

          console.log(" cartItems here :", cartItems);
          dispatch(STOPLazyLoading());
        }
      }
    } catch {
      console.log("no fetching from firebase");
      dispatch(STOPLazyLoading());
    }
  };

  useEffect(() => {
    if (!userId || userId === "") {
      dispatch(openLoginBox());
    }

    getDataFromDb();
  }, []);

  const [phoneNumber, setPhoneNumber] = useState();
  const [inputData, setInputData] = useState({
    name: "",
    instructions: "",
  });
  // hanlde instruction  & name input field
  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const calculateTotalAmount = (item) => {
    const { variationAmount, ExtraAmount, quantity } = item;
    return (Number(variationAmount) + Number(ExtraAmount)) * quantity;
  };

  const calculateGrandTotal = () => {
    let grandTotal = 0;
    if (cartItems.length) {
      cartItems.map((item) => {
        const { variationAmount, ExtraAmount, quantity } = item;
        const itemTotal =
          (Number(variationAmount) + Number(ExtraAmount)) * quantity;
        grandTotal += itemTotal;
      });
    }
    return grandTotal;
  };

  const city = localStorage.getItem("city");
  const area = localStorage.getItem("area");
  console.log("now", cartItems);

  const handleAddressBox = () => {
    dispatch(openAddressBox());
  };
  return (
    <div className="w-full h-full bg-gray-100">
      <div className="max-w-[1280px]  pt-[140px] h-full mx-auto">
        <div className="py-3 px-3 bg-white rounded-2xl  text-sm">
          <div className="py-3 flex">
            <Link to="/" className="text-sky-300">
              Home
            </Link>
            &nbsp;
            <p className="text-yellow-300"> Checkout</p>
          </div>
          <div className="w-full flex gap-10 ">
            {/* 1 */}
            <div className="w-2/3">
              <div className="w-full bg-gray-100 rounded-2xl mb-5  py-6 px-3">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <p>Full Name</p>
                    <input
                      type="text"
                      value={inputData.name}
                      name="name"
                      onChange={handleInputData}
                      className="w-full rounded-full border-2 border-gray-300  focus:outline-yellow-400 px-2 py-2 mt-3 "
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="w-1/2 ">
                    <p className="">Phone Number</p>
                    <PhoneInput
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      defaultCountry="PK"
                      className="mt-3"
                    />
                  </div>
                </div>
                {/* show addres here if availble  */}
                <div className="w-1/4 my-5 ">
                  <p>Your Address</p>{" "}
                  <p className="text-gray-500 my-2">{area + ", " + city}</p>
                  <button
                    onClick={handleAddressBox}
                    className="w-full rounded-full py-2 font-bold bg-red-500 text-white hover:bg-yellow-400 hover:text-black"
                  >
                    Add/Change Address
                  </button>
                </div>
                {/* if no address then show address adding link/button */}
                <div className=" w-full my-10 hidden">
                  <p className="text-center text-lg">
                    You don't have a saved address.
                  </p>
                  <p
                    onClick={handleAddressBox}
                    className="text-center text-yellow-500 text-lg cursor-pointer"
                  >
                    + Add new Address
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-lg py-5 my-5 px-3">
                <p className="text-lg my-2">
                  Special Instructions ( Optional )
                </p>
                <textarea
                  onChange={handleInputData}
                  value={inputData.instructions}
                  name="instructions"
                  className="w-full rounded-2xl h-[100px]  py-1 px-3 border border-gray-300  outline-yellow-400"
                  placeholder="Add any comment, e.g. about allergies, or delivery instructions here."
                ></textarea>
              </div>
              <div className="w-full bg-gray-100 rounded-lg py-5 my-5 px-3">
                <p className="text-lg my-2">Select Payment method</p>
                <div className="flex rounded-full border-2 border-yellow-400 cursor-pointer py-2 px-5 gap-2  w-1/4">
                  <BsCash size={25} className="text-green-700" />{" "}
                  <p className="text-sm ">Cash on delivery</p>
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className="w-1/3 bg-gray-100 ">
              {/* if data is avalbe in cart the show it otherwise show empty cart */}
              {cartItems && cartItems?.length > 0 ? (
                <div className=" h-[63%] mx-3 overflow-y-auto">
                  <div className="w-full border-b py-2  ">
                    <p className="text-xl">Your cart</p>
                  </div>
                  {cartItems.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 py-2 my-3 border-b "
                      >
                        <div className=" w-[100px] h-[50px] relative">
                          <img src={item.img} className="w-full h-full" />
                          <div className="bg-yellow-400 h-5 w-5 rounded px-1 left-0 top-0 absolute">
                            {item.quantity}
                          </div>
                        </div>
                        <div>
                          <div className="px-1">
                            <p className="font-medium text-lg  ">
                              {" "}
                              {item.title}
                            </p>
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // if cart is empty then show this
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
                <button className="bg-red-500 text-white font-bold hover:bg-yellow-400 hover:text-black w-full rounded-full py-3 my-1">
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
