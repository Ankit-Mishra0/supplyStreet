import { setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const storeUser = async (user) => {
  if (!user || !user.uid) return;
  const data = {
    uid: user.uid,
    name: user.displayName||user.name||"",
    email: user.email,
    phone: user.phoneNumber || "",
    image: user.photoURL || "",
    provider: user.providerData[0]?.providerId || "",
    createdAt: new Date(),
  };
  await setDoc(doc(db,"users",user.uid),data,{merge:true});
};
