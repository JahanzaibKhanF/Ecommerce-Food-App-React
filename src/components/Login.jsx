import React, { useState } from "react";
import SignUp from "./SignUp";
import { closeLoginBox } from "../actions";
import { useDispatch } from "react-redux";
import { AiFillCloseSquare } from "react-icons/ai";
import circle_lazy_loading from "../assets/circle_lazy_loading.gif";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { authentication, firestore } from "../firebase_config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();
  const [showPhoneForm, setShowPhoneForm] = useState(true);
  const [showOTPform, setShowOTPform] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState();
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // captcha genration function
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "reCAPTCHAContainer",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };
  // phoneNumber verification / user exist or not
  const verifyPhone = () => {
    if (phoneNumber.length < 10) {
      setError("Please Enter Vaild Phone Number");
    } else {
      console.log(phoneNumber, "entered");
      setIsLoading(true);
      // calling user exist function
      checkUserExist(phoneNumber).then((exists) => {
        if (exists) {
          console.log("user exist");

          generateRecaptcha();
          let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;

              setShowPhoneForm(false);
              setIsLoading(false);
              setShowOTPform(true);
              setSentTo(phoneNumber);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);

              setError("Phone number is invaild or somthing went wrong");
            });
        } else {
          // if user not exist then goto signup form
          setShowSignupForm(true);
          setShowPhoneForm(false);
          console.log("user Not exists");
        }
      });
    }
  };
  // handleing otp code input field
  const handleOTP = (e) => {
    const inputOTP = e.target.value;
    setOTP(inputOTP);
  };
  // confirming otp now
  const verifyOTP = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log("user signed in succesfully");
          const userId = result.user.uid;
          localStorage.setItem("userId", userId);

          setIsLoading(false);
          setError("");
          navigate("/");
        })
        .catch((error) => {
          setError("Phone enter correct OTP sent to your phone");
          setIsLoading(false);
        });
    }
  };
  // Function to check if a user with the given phone number exists in Firestore
  const checkUserExist = async (phoneNumber) => {
    const usersCollection = collection(firestore, "users");
    const q = query(usersCollection, where("phoneNumber", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };
  return (
    <div className="w-full h-full  bg-black bg-opacity-50 backdrop-filter backdrop-blur-md fixed  z-[10]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-fit sm:h-fit sm:w-[395px] my-[4%]  mx-5 sm:mx-auto py-5 px-4   rounded-3xl bg-white  relative"
      >
        {/* closing icon */}
        <AiFillCloseSquare
          onClick={() => dispatch(closeLoginBox())}
          size={35}
          className="cursor-pointer absolute rounded-3xl top-0 right-2 z-20 text-gray-900/50"
        />
        <div id="reCAPTCHAContainer"></div>
        {/* Phone No Form */}
        {showPhoneForm && (
          <div className="w-full">
            <p className="text-xl font-bold mt-1">Enter your mobile number</p>
            <p className="text-gray-600 my-2">
              Please confirm your country code and enter your mobile number
            </p>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="PK"
              className="border border-blue-500"
            />
            <p className="text-red-500">{error}</p>
            <div className="relative w-full">
              <div
                className={` ${
                  isLoading ? "block" : "hidden"
                } text-white absolute w-8 top-3 left-5`}
              >
                <img src={circle_lazy_loading} alt="Please Wait" />
              </div>
              <button
                onClick={verifyPhone}
                className={` w-full rounded-full py-2 ${
                  isLoading
                    ? "bg-gray-200 text-white hover:bg-gray-200 hover:text-white"
                    : "bg-red-500 text-white  hover:bg-yellow-400 hover:text-black"
                }  font-bold my-2`}
              >
                Login
              </button>
            </div>
            <div className="flex text-gray-300 text-sm gap-1">
              <div className="border-b-2 border-gray-300 w-1/2 mb-2"></div>
              OR
              <div className="border-b-2 border-gray-300 w-1/2 mb-2"></div>
            </div>
            <button className="w-full rounded-full py-2 border-2 border-yellow-300 hover:border-yellow-400 text-yellow-300 font-bold my-2">
              Order as Guest
            </button>
          </div>
        )}
        {/* OTP Form */}
        {showOTPform && (
          <div className="w-full">
            <p className="text-xl font-bold mt-1">Login</p>
            <p className="  mt-1">
              Enter the code received on your phone ({sentTo}).
            </p>
            <input
              value={otp}
              onChange={handleOTP}
              type="number"
              className="w-full rounded-full border-2 border-gray-300  focus:outline-yellow-400 px-2 py-2 mt-3 "
              placeholder="Enter your code"
            />
            <p className="text-red-500">{error}</p>
            <div className="relative w-full">
              <div
                className={` ${
                  isLoading ? "block" : "hidden"
                } text-white absolute w-8 top-3 left-5`}
              >
                <img src={circle_lazy_loading} alt="Please Wait" />
              </div>
              <button
                onClick={verifyOTP}
                className={` w-full rounded-full py-2 ${
                  isLoading
                    ? "bg-gray-200 text-white hover:bg-gray-200 hover:text-white"
                    : "bg-red-500 text-white  hover:bg-yellow-400 hover:text-black"
                }  font-bold my-2`}
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {showSignupForm && <SignUp phone={phoneNumber} />}
      </div>
    </div>
  );
}

export default Login;
