import { firestore } from "./FirebaseConfig";
import {
  getDocs,
  getDoc,
  doc,
  query,
  where,
  collection,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import uniqid from "uniqid";

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
      lastName: lastname,
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
    logo = "",
    type,
    overview,
    isLicensed,
    license
  ) => {
    let result = { code: null, val: null };
    await setDoc(doc(firestore, "Company", id), {
      companyName: companyName,
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

  getUserDetails = async (email) => {
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "User"),
      where("emailAddress", "==", email)
    );

    await getDocs(q)
      .then((res) => {
        res.forEach((doc) => {
          result = { code: 0, val: doc };
        });
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  getCompanyDetails = async (email) => {
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "Company"),
      where("emailAddress", "==", email)
    );

    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 1, val: "No docs found!" };
    } else {
      res.forEach((doc) => {
        result = { code: 0, val: doc };
      });
    }
    return result;
  };

  createJobPost = async (
    jobTitle,
    jobField,
    jobDescription,
    location,
    requirements,
    skills,
    minSalary,
    maxSalary,
    benefits,
    timestamp
  ) => {
    let companyDetails = JSON.parse(sessionStorage.getItem("companyDetails"));
    let result = { code: null, val: null };
    let jobId = uniqid("","-"+companyDetails.companyName)
    await setDoc(doc(firestore, "Jobs", jobId), {
      companyName: companyDetails.companyName,
      companyId: JSON.parse(sessionStorage.getItem("companyId")),
      companyOverview: companyDetails.overview,
      jobTitle: jobTitle,
      jobField: jobField,
      jobDescription: jobDescription,
      location: location,
      requirements: requirements,
      skills: skills,
      minSalary: minSalary,
      maxSalary: maxSalary,
      benefits: benefits,
      timestamp: timestamp
    })
      .then((val) => {
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  } 

  getCompanyJobPosts = async(companyId) => {
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "Jobs"),
      where("companyId", "==", companyId)
    );

    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 1, val: "No docs found!" };
    } else {
      result = { code: 0, val: res };
    }
    return result;
  }

  getJobs = async() => {
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "Jobs")
    );

    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 1, val: "No docs found!" };
    } else {
      result = { code: 0, val: res };
    }
    return result;
  }

  checkUserEmail = async (email) => {
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "User"),
      where("emailAddress", "==", email)
    );
    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 0, val: true };
    } else {
        result = { code: 0, val: false };
    }
    return result;
  }
  checkCompanyEmail = async (email) => {
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "Company"),
      where("emailAddress", "==", email)
    );
    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 0, val: true };
    } else {
        result = { code: 0, val: false };
    }
    return result;
  }
  updateUserDetails = () => {};

  updateCompanyDetails = () => {};
}
