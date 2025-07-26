"use client";
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { storage, db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const SetupPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("User not logged in");
    console.log("Submitting for user:", user);

    let imageUrl = "";
    if (image) {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const data = {
      uid: user.uid,
      name,
      email,
      phone: user.phoneNumber || "",
      image: imageUrl,
      provider: user.providerData[0]?.providerId || "phone",
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), data, { merge: true });
    router.push("/dashboard");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>

      {/* Main form container */}
      <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
        <div className="lg:w-[40%] md:w-[50%] w-[95%] flex flex-col gap-1.5 bg-amber-200 p-6 justify-center items-center rounded-lg shadow-xl">
          <h1 className="text-2xl font-semibold text-center w-full">
            Set Up Your Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-4 mt-4"
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-[90%] font-semibold bg-white rounded-lg p-2 outline-none"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] font-semibold bg-white rounded-lg p-2 outline-none"
            />

            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="flex flex-row gap-2">
              <label
                htmlFor="image"
                className="p-3 rounded-md bg-white text-gray-500 font-bold cursor-pointer hover:bg-gray-100 transition-all"
              >
                {image ? image.name : "Upload profile image"}
              </label>
              <button
                type="button"
                disabled={!previewUrl}
                onClick={() => setPreview(true)}
                className={`p-3 rounded-md font-bold transition-all ${
                  previewUrl
                    ? "text-black hover:text-slate-600"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Preview
              </button>
            </div>

            <button
              type="submit"
              className="w-auto p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-slate-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Image Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <img
              src={previewUrl}
              alt="Image Preview"
              className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <button
              onClick={() => setPreview(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupPage;
