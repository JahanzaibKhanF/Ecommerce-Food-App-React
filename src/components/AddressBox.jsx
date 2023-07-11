import { useState } from "react";
import circle_lazy_loading from "../assets/circle_lazy_loading.gif";
import { AiFillCloseCircle, AiFillCloseSquare } from "react-icons/ai";
import { closeAddressBox } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function AddressBox(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState();
  const dispatch = useDispatch();
  const handleAddressBox = () => {
    dispatch(closeAddressBox());
  };

  const handleAddress = () => {
    const city = sessionStorage.getItem("city");
    const area = sessionStorage.getItem("area");
    const fulladdress = { location: area + ", " + city, address: address };
    console.log(fulladdress);
    // dispatch(closeAddressBox());
  };
  const handleChange = (e) => {
    const address = e.target.value;
    setAddress(address);
  };
  const city = sessionStorage.getItem("city");
  const area = sessionStorage.getItem("area");
  return (
    <div
      onClick={handleAddressBox}
      className="w-full h-full  bg-black bg-opacity-50 backdrop-filter backdrop-blur-md fixed  z-[10]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-fit sm:h-fit sm:w-[500px] my-[4%]  mx-5 sm:mx-auto py-5 px-4   rounded-3xl bg-white  relative"
      >
        {/* closing icon */}
        <AiFillCloseSquare
          onClick={handleAddressBox}
          size={35}
          className="cursor-pointer absolute rounded-3xl top-0 right-2 z-20 text-gray-900/50"
        />
        <p className="font-bold">Add New Address</p>
        <p className="py-3">Address (with post code if applicable)</p>
        <input
          type="text"
          value={address}
          onChange={handleChange}
          className="w-full rounded-full border-2 border-gray-300  focus:outline-yellow-400 px-2 py-2 mt-3 "
        />
        <p className="py-3">Area/City</p>
        <div className="w-full rounded-full border-2 border-gray-300 bg-gray-100 h-10 px-2">
          <p className="text-gray-500 my-2">{area + ", " + city}</p>
        </div>
        <div className="relative w-full">
          <div
            className={` ${
              isLoading ? "block" : "hidden"
            } text-white absolute w-8 top-3 left-5`}
          >
            <img src={circle_lazy_loading} alt="Please Wait" />
          </div>
          <button
            onClick={handleAddress}
            className={` w-full rounded-full py-2 ${
              isLoading
                ? "bg-gray-200 text-white hover:bg-gray-200 hover:text-white"
                : "bg-red-500 text-white  hover:bg-yellow-400 hover:text-black"
            }  font-bold my-2`}
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressBox;
