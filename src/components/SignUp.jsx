import React from "react";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import "react-phone-number-input/style.css";
import circle_lazy_loading from "../assets/circle_lazy_loading.gif";
import PhoneInput from "react-phone-number-input";
import { authentication, firestore } from "../firebase_config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp({ phone }) {
  const navigate = useNavigate;
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [showOTPForm, setShowOTPform] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [inputData, setInputData] = useState({ name: "", email: "" });

  const [otp, setOTP] = useState();
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");
  const [isUserExist, setIsUserExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  //  handleSignUp // phoneNumber verification / user exist or not
  const verifyPhone = () => {
    if (phoneNumber.length < 10) {
      setError("Please Enter Vaild Phone Number");
    } else {
      setIsLoading(true);
      // calling user exist function
      checkUserExist(phoneNumber).then((exists) => {
        if (exists) {
          console.log("user exist");
          setIsLoading(false);
          setIsUserExist(true);
          setError("");
        } else {
          setError("");
          // if user not exist verify its phone and make signup process further
          setIsLoading(true);
          setIsUserExist(false);
          generateRecaptcha();
          let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;

              setIsLoading(false);
              setShowOTPform(true);
              setShowSignupForm(false);
              setSentTo(phoneNumber);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);

              setError("Phone number is invaild or somthing went wrong");
            });

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
  // hanle  email & name input field
  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // confirming otp now
  const verifyOTP = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log("user verified and may be signup");
          const userId = result.user.uid;
          localStorage.setItem("userId", userId);
          const userProfileCollection = collection(firestore, "users");
          const userProfileDocRef = doc(userProfileCollection, userId);
          const userData = {
            name: inputData.name,
            email: inputData.email,
            phoneNumber: phoneNumber,
          };
          setDoc(userProfileDocRef, userData);
          setIsLoading(false);
          setError("");
          navigate("/");
        })
        .catch((error) => {
          setError("Please enter correct OTP sent to your Phone number");
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
    <>
      {/* // Signup fields */}
      <div id="reCAPTCHAContainer"></div>
      {showSignupForm && (
        <div className="w-full">
          <p className="text-center text-3xl font-bold"> Register</p>
          {isUserExist && (
            <div className="w-full px-3 py-1 rounded-3xl bg-red-100  my-5 flex">
              <MdErrorOutline
                size={50}
                className="text-red-400 -translate-y-2"
              />
              <p className="text-center text-red-900 text-md">
                A user with this phone number already exists, please use another
                phone number and try again.
              </p>
            </div>
          )}
          <p>Full Name</p>
          <input
            type="text"
            value={inputData.name}
            name="name"
            onChange={handleInputData}
            className="w-full rounded-full border-2 border-gray-300  focus:outline-yellow-400 px-2 py-2 mt-3 mb-2 "
            placeholder="Enter your name"
          />
          <p>Email Address</p>
          <input
            value={inputData.email}
            name="email"
            onChange={handleInputData}
            type="text"
            className="w-full rounded-full border-2 border-gray-300  focus:outline-yellow-400 px-2 py-2 mt-3 "
            placeholder="Enter your name"
          />
          <p className="mt-2">Phone Number</p>
          <PhoneInput
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="PK"
            className="border border-blue-500 my-3"
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
              Register
            </button>
          </div>
        </div>
      )}
      {/* // otp fileds */}
      {showOTPForm && (
        <div className="w-full">
          <p className="font-bold  mt-1">
            Please enter verification code sent to your mobile ({sentTo}).
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
              className="w-full rounded-full py-2 bg-red-500 hover:bg-yellow-400 hover:text-white font-bold my-2"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
