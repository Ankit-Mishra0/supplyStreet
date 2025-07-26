"use client";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import Image from "next/image";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const LoginPage = () => {
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [showOtpInput, setShowOtpInput] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState(null);
  const router = useRouter();
  const sendOtp = async () => {
    if (!isValidPhoneNumber(phone)) {
      alert("Please enter a valid phone number in correct format");
      return;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("Recaptcha verified");
        },
      }
    );

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setShowOtpInput(true);
      console.log("OTP sent!");
    } catch (error) {
      console.error("Error during phone sign-in:", error);
      alert("Failed to send OTP");
    }
  };
  const verifyOtp = async () => {
    if (!otp || otp.length < 6) {
      alert("Please enter the 6-digit OTP");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      console.log("Phone login successful:", user);
      router.push("/dashboard"); // or home page
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP");
    }
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Login Successful for", user);
      router.push("/");
    } catch (error) {
      console.error("login error", error);
    }
  };
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>
      <div className="absolute xl:top-[350px] xl:left-[300px] md:top-[550px] md:left-[50px] top-[150px] left-[-50px]  -rotate-30 z-0 drop-shadow-xl ">
        <Image src="/fruits.png" alt="fruits" width={250} height={250}></Image>
      </div>
      <div className="hidden md:block absolute xl:bottom-[450px] xl:right-[450px] md:bottom-[650px] md:right-[100px]   z-0 drop-shadow-xl ">
        <Image src="/veggies.png" alt="fruits" width={300} height={300}></Image>
      </div>
      <div className="relative flex flex-col items-center justify-center h-screen w-[90%] z-10 m-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-2 items-center justify-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form className="w-[85%]">
            <div className="flex flex-col gap-3 mb-4">
              <div className="border rounded-lg p-1 w-full flex flex-row justify-between">
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="IN"
                  className="bg-white rounded-lg p-2 font-semibold w-[80%] lg:w-100 outline-none"
                  onChange={setPhone}
                  value={phone}
                />
                <span className="text-center">
                  <PhoneIcon className="text-gray-500 !size-5 mt-2" />
                </span>
              </div>
              <div id="recaptcha-container"></div>
              {showOtpInput && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-2 border rounded"
                />
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  showOtpInput ? verifyOtp() : sendOtp();
                }}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-all"
              >
                {showOtpInput ? "Verify OTP" : "Send OTP"}
              </button>
            </div>

            <div className="flex flex-row items-center h-max mt-5 p-2.5 justify-center">
              <div
                onClick={handleGoogleLogin}
                className="flex w-[85%] items-center justify-center px-3 py-2  hover:bg-slate-800 hover:text-white font-bold rounded-md shadow-md hover:shadow-lg bg-white transition-all duration-300 ease-in-out"
              >
                <button>
                  <GoogleIcon className="text-red-600 md:!size-8 mr-4 mb-1 " />{" "}
                  Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
