import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdGpsFixed } from "react-icons/md";
import circle_lazy_loading from "../assets/circle_lazy_loading.gif";
import cities from "../data/cities";

function LocationBox(props) {
  //for checking lazy load
  const [isLoading, setIsLoading] = useState(false);

  //for chaning or disbling button if location data is empty
  const [isEanbled, setEnabled] = useState(false);
  const [showLocationCloser, setShoLocationCloser] = useState(true);

  const [isCityListOpen, setIsCityListOpen] = useState(false);
  const handleOpenCityList = () => {
    setIsCityListOpen(!isCityListOpen);
  };
  // / for opening drop down list of areas in input field

  const [isCityAreasListOpen, setIsareasListOpen] = useState(false);
  const handleOpenAreasList = () => {
    setIsareasListOpen(!isCityAreasListOpen);
  };
  // For Getting city and area name from inputs fields
  const [locationData, setLocationData] = useState({
    city: "",
    area: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filtering and matching cities with input filed and aray list

  const filteredCity = cities.filter(
    (item) =>
      locationData.city &&
      item.city.toLowerCase().includes(locationData.city.toLowerCase())
  );
  // for adding selcted city and area  to input filed using spread operator and states
  const handleSelected = (name, value) => {
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "city") {
      setIsCityListOpen(false);
    } else if (name === "area") {
      setIsareasListOpen(false);
    }
  };

  // Getteing cites and area from Api using current Lat Long
  const handleClick = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Call reverse geocoding API to get location information
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5eb3fbaf3a644ac6bb4318fbd3077034`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data.results[0].components); // Inspect the response in the console

              const { county, suburb, city } = data.results[0].components;
              setIsLoading(false);
              if (city) {
                setLocationData({
                  city: city,

                  area: suburb,
                });
              } else {
                setLocationData({
                  city: county,

                  area: suburb,
                });
              }
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        },
        (error) => {
          console.log(error);
          setIsLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  };

  const handleLocation = () => {
    if (!locationData.city == "" && !locationData.area == "") {
      props.open(locationData);
    }
  };
  useEffect(() => {
    if (!locationData.city == "" && !locationData.area == "") {
      setEnabled(true);
    }
  });
  useEffect(() => {
    const storedCity = sessionStorage.getItem("city");
    const storedArea = sessionStorage.getItem("area");

    if (storedArea === null && storedCity === null) {
      setShoLocationCloser(false);
    } else {
      setShoLocationCloser(true);
    }
  }, []);

  return (
    <div className=" w-full  h-full py-[100px]  bg-black bg-opacity-50 backdrop-filter backdrop-blur-md fixed z-[10]">
      <div className="mx-auto w-[320px] sm:w-[500px] h-fit  rounded-3xl bg-white px-3  py-3 relative  ]">
        <div
          className={`w-1/7 ${
            showLocationCloser ? "show" : "hidden"
          } absolute right-3 top-2`}
        >
          <AiFillCloseSquare
            onClick={props.open}
            size={30}
            className="cursor-pointer"
          />
        </div>

        <div className="w-[20%] mx-auto">
          <img src={logo} alt="logo" className="w-full" />
        </div>

        <p className="text-center text-xl font-medium">
          Please select your location
        </p>

        {/* button for firing hndelclick function to get api and pgs data */}
        <div
          onClick={handleClick}
          className="cursor-pointer bg-gray-300 group hover:bg-red-500 w-[200px] mx-auto rounded-3xl py-2  px-4 my-2 flex"
        >
          <MdGpsFixed size={20} className="group-hover:text-white" />
          &nbsp;
          <p className="text-sm group-text-gray-600 group-hover:text-white">
            Use Current Location
          </p>
        </div>
        <input
          type="text"
          name="city"
          value={locationData.city}
          onChange={handleInputChange}
          onClick={handleOpenCityList}
          placeholder="select city"
          className="border border-gray-400 focus:border-yellow-400 focus:outline-none focus:border-b-[2px] rounded-3xl w-full px-3 py-2"
          autoFocus
        />

        {/* List of Cities from Aray [filtered}] */}
        <div
          className={`w-[95%] shadow-xl bg-white shadow-gray-800 rounded-3xl overflow-hidden py-3  absolute ${
            isCityListOpen ? "block" : "hidden"
          }`}
        >
          <ul>
            {filteredCity.map((item, index) => {
              return (
                <>
                  <ul>
                    {" "}
                    <li
                      key={index}
                      onClick={() => handleSelected("city", item.city)}
                      className="font-medium text-gray-500 border-b-2 py-1 px-3 hover:bg-gray-100"
                    >
                      {item.city}
                    </li>
                  </ul>
                </>
              );
            })}
          </ul>
        </div>
        <input
          type="text"
          name="area"
          value={locationData.area}
          onChange={handleInputChange}
          onClick={handleOpenAreasList}
          placeholder="select area"
          className=" mt-1 border border-gray-400 focus:border-yellow-400 focus:outline-none focus:border-b-[2px] rounded-3xl w-full px-3 py-2"
          autoFocus
        />
        {/* List of areases from Aray [filtered}] */}
        <div
          className={`w-[95%] shadow-xl bg-white shadow-gray-800 rounded-3xl overflow-hidden py-3  absolute ${
            isCityAreasListOpen ? "block" : "hidden"
          }`}
        >
          <ul>
            {filteredCity.map((item, index) =>
              item.areas.map((item) => {
                return (
                  <>
                    <li
                      key={index}
                      onClick={() => handleSelected("area", item)}
                      className="font-medium text-gray-500 border-b-2 py-1 px-3 hover:bg-gray-100"
                    >
                      {item}
                    </li>
                  </>
                );
              })
            )}
          </ul>
        </div>
        <div className="relative w-full">
          <div
            className={` ${
              isLoading ? "block" : "hidden"
            } top-4 left-[45%] absolute w-10`}
          >
            <img src={circle_lazy_loading} alt="Please Wait" />
          </div>
          <button
            className={`${
              isEanbled
                ? "bg-red-500 hover:bg-yellow-400 hover:text-black"
                : "bg-gray-300"
            } font-medium text-white  rounded-3xl w-full py-2 mt-3 `}
            onClick={handleLocation}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationBox;
