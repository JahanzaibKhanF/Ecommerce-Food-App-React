import React, { useContext, useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import logo from "../assets/logo.webp";
import SearchBox from "../components/SearchBox";
import { Outlet } from "react-router-dom";
import LocationBox from "../components/LocationBox";
import { useNavigate } from "react-router-dom";
import AddToCart from "../components/AddToCart";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../components/Cart";
import { addItemToCart, openCart, openLoginBox } from "../actions";
import Login from "../components/Login";
import LazyLoading from "../components/LazyLoading";
import AddressBox from "../components/AddressBox";

function Navbar(props) {
  const navigate = useNavigate();

  const [isLocationBoxOpen, setIsLocationBoxOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [locationData, setLocationData] = useState({ city: "", area: "" });
  const handelLocationBox = (data) => {
    setIsLocationBoxOpen(!isLocationBoxOpen);

    if (!data.city == "" && !data.area == "") {
      setLocationData({
        city: data.city,
        area: data.area,
      });
      sessionStorage.setItem("city", data.city);
      sessionStorage.setItem("area", data.area);
    }
  };

  useEffect(() => {
    const storedCity = sessionStorage.getItem("city");
    const storedArea = sessionStorage.getItem("area");
    setLocationData({
      city: storedCity,
      area: storedArea,
    });
    if (storedArea === null && storedCity === null) {
      setIsLocationBoxOpen(true);
    }
  }, []);
  const myLocation = locationData.area + " " + locationData.city;
  // making location text limites and ... etc
  const shortLocation =
    myLocation.length > 15 ? `${myLocation.slice(0, 15)}...` : myLocation;

  const handelSearchBox = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // here for closeing/opening cartBox
  const { isOpen } = useSelector((state) => state.switchCartBox);

  const dispatch = useDispatch();

  // for getting total items number of cart
  const cartItems = useSelector((state) => state.AdditemToCart.cartItems);
  const calculateTotalItemNumbers = () => {
    let totalItemNumbers = 0;
    cartItems.map((item) => {
      totalItemNumbers += item.quantity;
    });
    return totalItemNumbers;
  };
  // for opeing/closing login box
  const switchLoginBox = useSelector((state) => state.handleLoginBox);

  // for handling login/ checking login
  const handleLogin = () => {
    dispatch(openLoginBox());
  };
  // for lazy loading full screen
  const switchLazyLoading = useSelector((state) => state.handleLazyLoading);
  // for address box
  const switchAddressBox = useSelector((state) => state.handleAddressBox);

  return (
    <>
      <div className=" w-full bg-yellow-400 fixed z-[2] ">
        <div className="max-w-[1280px] mx-auto h-[80px] px-3 md:px-[100px] ">
          <div className="flex justify-between  ">
            <div
              className="flex justify-between py-[15px] cursor-pointer"
              onClick={() => {
                handelLocationBox();
              }}
            >
              <div
                onClick={() => navigate("/")}
                className="block sm:hidden w-[60px]"
              >
                <a href="#">
                  <img src={logo} className="w-full" />
                </a>
              </div>
              <MdLocationPin size="30" className="text-red-600" />
              <div className="text-sm">
                <p>Deliver to </p>

                <p className="block sm:hidden">{shortLocation}</p>
                <p className="hidden sm:block">{myLocation}</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/")}
              className="hidden sm:block py-0 w-[80px]"
            >
              <a href="#">
                <img src={logo} className="w-full" />
              </a>
            </div>

            <div className="flex justify-between w-[150px] py-5 ">
              <div className=" py-[8px]">
                <HiSearch
                  onClick={() => {
                    handelSearchBox();
                  }}
                  size={30}
                  className="cursor-pointer text-red-600"
                />
              </div>
              <div
                onClick={() => {
                  handleLogin();
                }}
                className="px-4 py-[10px]  border border-red-600 border-b-0 border-t-0 cursor-pointer"
              >
                <FaUserCircle size={25} className="text-red-600" />
              </div>
              <div
                onClick={() => dispatch(openCart())}
                className=" py-[8px] cursor-pointer relative"
              >
                <div className="text-sm font-bold text-center bg-white h-6 w-6  rounded-full border border-black   -right-3 -top-1 absolute">
                  {calculateTotalItemNumbers()}
                </div>
                <HiShoppingCart size={30} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSearchOpen && <SearchBox open={handelSearchBox} />}
      {isLocationBoxOpen && <LocationBox open={handelLocationBox} />}
      {isOpen && <AddToCart />}
      <Cart />

      {switchLoginBox && <Login />}
      {switchLazyLoading && <LazyLoading />}
      {switchAddressBox && <AddressBox />}

      <Outlet />
    </>
  );
}

export default Navbar;
