import { firestore } from "./FirebaseConfig";
import {
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export default class Firestore {
  createUserDetails = async (
    id,
    firstName,
    lastname,
    emailAddress,
    phoneNumber,
    location,
    image = "",
    skills = [],
    resume = "",
    about,
    profession
  ) => {
    let result = { code: null, val: null };
    await setDoc(doc(firestore, "User", id), {
      firstName: firstName,
      lastname: lastname,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      profileImage: image,
      location: location,
      profession: profession,
      about: about,
      skills: skills,
      resume: resume,
    })
      .then((val) => {
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });

    return result;
  };

  createCompanyDetails = async (
    id,
    companyName,
    phoneNumber1,
    phoneNumber2 = "",
    email,
    location,
    logo="",
    type,
    overview,
    isLicensed,
    license
    ) => {
      let result = { code: null, val: null };
      await setDoc(doc(firestore, "Company", id), {
        companyName:companyName,
        phoneNumber1: phoneNumber1,
        phoneNumber2: phoneNumber2,
        emailAddress: email,
        logo: logo,
        location: location,
        type: type,
        overview: overview,
        isLicensed: isLicensed,
        license: license,
      })
        .then((val) => {
          result = { code: 0, val: val };
        })
        .catch((err) => {
          result = { code: 1, val: err };
        });
  
      return result;
    };

  updateUserDetails = () => {};

  updateCompanyDetails = () => {};
}
