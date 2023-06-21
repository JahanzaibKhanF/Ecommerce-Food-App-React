import { useEffect, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import "react-phone-number-input/style.css";
import circle_lazy_loading from "../assets/circle_lazy_loading.gif";
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
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Profile(props) {
  const navigate = useNavigate();
  const [showUpdateForm, setShowshowUpdateForm] = useState(true);
  const [showOTPForm, setShowOTPform] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    setInputData({
      name: profileData.name,
      email: profileData.email,
    });
    setPhoneNumber(profileData.phoneNumber);
  }, [profileData]);

  const [otp, setOTP] = useState();
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");
  const [isUserExist, setIsUserExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Getting user data from Firebase to show here in profile and changing title of page
  const titleRef = useRef();
  useEffect(() => {
    document.title = titleRef.current.textContent;
    const userID = localStorage.getItem("userId");
    console.log(userID, "here user id is coming from localStorage storage");
    const getProfileData = async () => {
      setIsLoading(true);
      console.log("function running");
      try {
        const userID = localStorage.getItem("userId");
        if (userID) {
          console.log("user id yes");
          const userDocRef = doc(firestore, "users", userID);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setProfileData((prevState) => ({
              ...prevState,
              ...userDocSnap.data(),
            }));

            console.log("doc exist", userDocSnap.data());
            console.log("here profile data", profileData);
          } else {
            console.log("user data not found");
          }
        }
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        console.error("Error fetching user data:", error.message);
      }
    };

    getProfileData();
  }, []);

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
  //  handle updata // phoneNumber verification / user exist or not
  const hendleUpdate = () => {
    if (phoneNumber.length < 10) {
      setError("Please Enter Vaild Phone Number");
    } else if (phoneNumber !== profileData.phoneNumber) {
      console.log(
        "phone number is different now otp will be send to new",
        phoneNumber,
        "and ",
        profileData.phoneNumber
      );
      setIsLoading(true);

      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;

          setIsLoading(false);
          setShowOTPform(true);
          setShowshowUpdateForm(false);
          setSentTo(phoneNumber);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);

          setError("Phone number is invaild or somthing went wrong");
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      console.log(
        "phone number is same no data will be updated on this same profile"
      );
      upDateData();
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
          console.log("user verified and may profile is updated");
          const userId = result.user.uid;
          localStorage.setItem("userId", userId);
          upDateData();
          setIsLoading(false);
          setError("");
        })
        .catch((error) => {
          setError("Please enter correct OTP sent to your Phone number");
        });
    }
  };

  // function to updata data in firebase
  const upDateData = () => {
    console.log("update data function running");
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    const userProfileCollection = collection(firestore, "users");
    const userProfileDocRef = doc(userProfileCollection, userId);

    const UpdatedData = {
      name: inputData.name,
      email: inputData.email,
      phoneNumber: phoneNumber,
    };
    setDoc(userProfileDocRef, UpdatedData);
    setIsLoading(false);
    navigate("/user/profile");

    scrollTo(0, 0);
    alert("Profile Updated");
  };
  // goto home page if user is not logged in
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      console.log("user id found user may be logged");
    } else {
      console.log("no user id user may not be logged");
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="max-w-[1280px] mx-[5%] sm:mx-[10%] md:mx-[20%]   py-10 pt-[185px]">
        <h4 className="text-lg font-bold" ref={titleRef}>
          Profile
        </h4>

        <div className="my-5 w-full bg-white border border-gray-200 rounded-xl py-10 px-[20px] md:px-[40px] lg:px-[50px]">
          <div id="reCAPTCHAContainer"></div>
          {/* // update profile fileds fields */}
          {showUpdateForm && (
            <div className="w-full">
              {isUserExist && (
                <div className="w-full px-3 py-1 rounded-3xl bg-red-100  my-5 flex">
                  <MdErrorOutline
                    size={50}
                    className="text-red-400 -translate-y-2"
                  />
                  <p className="text-center text-red-900 text-md">
                    A user with this phone number already exists, please use
                    another phone number and try again.
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
                  onClick={hendleUpdate}
                  className={` w-full rounded-full py-2 ${
                    isLoading
                      ? "bg-gray-200 text-white hover:bg-gray-200 hover:text-white"
                      : "bg-red-500 text-white  hover:bg-yellow-400 hover:text-black"
                  }  font-bold my-2`}
                >
                  Update
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
                  className={` w-full rounded-full py-2 ${
                    isLoading
                      ? "bg-gray-200 text-white hover:bg-gray-200 hover:text-white"
                      : "bg-red-500 text-white  hover:bg-yellow-400 hover:text-black"
                  }  font-bold my-2`}
                >
                  Verify
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
