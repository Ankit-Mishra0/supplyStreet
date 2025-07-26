"use client";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import Image from "next/image";
import { auth, provider, db } from "@/lib/firebase";
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { storeUser } from "@/lib/user";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [showOtpInput, setShowOtpInput] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  const sendOtp = async () => {
    setErrorMessage("");

    if (!isValidPhoneNumber(phone)) {
      setErrorMessage("Please enter a valid phone number in correct format.");
      return;
    }

    setLoading(true);

    try {
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

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setShowOtpInput(true);
      setOtpSent(true);
    } catch (error) {
      console.error("Error during phone sign-in:", error);
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setErrorMessage("");

    if (!otp || otp.length < 6) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        router.push("/dashboard");
      } else {
        router.push("/setup");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    if (otpSent) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await storeUser(user);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        router.push("/dashboard");
      } else {
        router.push("/setup");
      }
    } catch (error) {
      console.error("Google login error", error);
      setErrorMessage("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>
      <div className="absolute xl:top-[350px] xl:left-[300px] md:top-[550px] md:left-[50px] top-[150px] left-[-50px] -rotate-30 z-0 drop-shadow-xl">
        <Image src="/fruits.png" alt="fruits" width={250} height={250} />
      </div>
      <div className="hidden md:block absolute xl:bottom-[450px] xl:right-[450px] md:bottom-[650px] md:right-[100px] z-0 drop-shadow-xl">
        <Image src="/veggies.png" alt="veggies" width={300} height={300} />
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
                  disabled={loading}
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
                  disabled={loading}
                />
              )}

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  showOtpInput ? verifyOtp() : sendOtp();
                }}
                disabled={loading}
                className={`bg-blue-600 text-white p-2 rounded transition-all ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Please wait..."
                  : showOtpInput
                  ? "Verify OTP"
                  : "Send OTP"}
              </button>
            </div>

            <div className="flex flex-row items-center h-max mt-5 p-2.5 justify-center">
              <div
                onClick={!loading && !otpSent ? handleGoogleLogin : undefined}
                className={`flex w-[85%] items-center justify-center px-3 py-2 font-bold rounded-md shadow-md transition-all duration-300 ${
                  loading || otpSent
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-slate-800 hover:text-white"
                }`}
              >
                <button disabled={loading || otpSent}>
                  <GoogleIcon className="text-red-600 md:!size-8 mr-4 mb-1" /> Google
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
