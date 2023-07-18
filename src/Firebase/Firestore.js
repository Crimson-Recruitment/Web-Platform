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
  initUserDetails = async (
    id,
    firstName,
    lastname,
    emailAddress,
    phoneNumber,
    location
  ) => {
    let result = { val: null, code: null };
    await setDoc(doc(firestore, "User", id), {
      firstName: firstName,
      lastName: lastname,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      location: location,
    })
      .then((val) => {
        result = { code: 0, val: val };
        sessionStorage.setItem("userId", id);
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  createUserDetails = async (
    image = "",
    skills = [],
    resume = "",
    about,
    profession
  ) => {
    let result = { code: null, val: null };
    let id = sessionStorage.getItem("userId");
    await updateDoc(doc(firestore, "User", id), {
      profileImage: image,
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

  initCompanyDetails = async (
    id,
    companyName,
    phoneNumber1,
    phoneNumber2 = "",
    email,
    location
  ) => {
    let result = { code: null, val: null };
    await setDoc(doc(firestore, "Company", id), {
      companyName: companyName,
      phoneNumber1: phoneNumber1,
      phoneNumber2: phoneNumber2,
      emailAddress: email,
      location: location,
    })
      .then((val) => {
        result = { code: 0, val: val };
        sessionStorage.setItem("companyId", id);
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });

    return result;
  };

  createCompanyDetails = async (
    logo = "",
    type,
    overview,
    isLicensed,
    license
  ) => {
    let result = { code: null, val: null };
    let id = sessionStorage.getItem("companyId");
    await updateDoc(doc(firestore, "Company", id), {
      logo: logo,
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

  getUserDetailsById = async (id) => {
    let result = { code: null, val: null };
    await getDoc(doc(firestore, "User", id))
      .then((val) => {
        if (val.exists() == true) {
          result = { code: 0, val: val };
        } else {
          result = { code: 1, val: "This user doesn't exist!" };
        }
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  getCompanyDetailsById = async (id) => {
    let result = { code: null, val: null };
    await getDoc(doc(firestore, "Company", id))
      .then((val) => {
        if (val.exists() == true) {
          result = { code: 0, val: val };
        } else {
          result = { code: 1, val: "This Company doesn't exist!" };
        }
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  getJobById = async (id) => {
    let result = { code: null, val: null };
    await getDoc(doc(firestore, "Jobs", id))
      .then((val) => {
        if (val.exists() == true) {
          result = { code: 0, val: val };
        } else {
          result = { code: 1, val: "This Job doesn't exist!" };
        }
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
    isVolunteer,
    jobType,
    location,
    requirements,
    skills,
    minSalary,
    maxSalary,
    benefits,
    hideSalary,
    requestCoverLetter,
    expiryDate,
    timestamp
  ) => {
    let companyDetails = JSON.parse(sessionStorage.getItem("companyDetails"));
    let result = { code: null, val: null };
    let jobId = uniqid("", "-" + companyDetails.companyName);
    await setDoc(doc(firestore, "Jobs", jobId), {
      companyName: companyDetails.companyName,
      companyId: JSON.parse(sessionStorage.getItem("companyId")),
      companyOverview: companyDetails.overview,
      jobTitle: jobTitle,
      jobField: jobField,
      jobDescription: jobDescription,
      isVolunteer: isVolunteer,
      jobType: jobType,
      location: location,
      requirements: requirements,
      skills: skills,
      minSalary: minSalary,
      maxSalary: maxSalary,
      benefits: benefits,
      hideSalary: hideSalary,
      requestCoverLetter: requestCoverLetter,
      expiryDate: expiryDate,
      timestamp: timestamp,
    })
      .then((val) => {
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  getCompanyJobPosts = async (companyId) => {
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
  };

  getJobs = async () => {
    let result = { code: null, val: null };
    const q = query(collection(firestore, "Jobs"));

    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 1, val: "No docs found!" };
    } else {
      result = { code: 0, val: res };
    }
    return result;
  };

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
  };

  checkUserCompletedRegistration = () => {
    let result = { code: null, val: null };
    let user = JSON.parse(sessionStorage.getItem("userDetails"));
    if (user.profession == undefined) {
      result = { code: 0, val: false };
    } else {
      result = { code: 0, val: true };
    }
    return result;
  };

  checkCompanyCompletedRegistration = () => {
    let result = { code: null, val: null };
    let company = JSON.parse(sessionStorage.getItem("companyDetails"));
    if (company.type == undefined) {
      result = { code: 0, val: false };
    } else {
      result = { code: 0, val: true };
    }
    return result;
  };
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
  };

  updateApplication = async (applicationId, status) => {
    let result = { code: null, val: null };
    await updateDoc(doc(firestore, "Applications", applicationId), {
      applicationStatus: status,
    })
      .then((val) => {
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  createApplication = async (jobId, jobName, companyId, coverLetter = "") => {
    let user = JSON.parse(sessionStorage.getItem("userDetails"));
    let userId = sessionStorage.getItem("userId");
    let applicationId = uniqid(
      user.firstName + "-" + user.lastName + "-",
      "-application"
    );
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "Applications"),
      where("jobId", "==", jobId),
      where("userId", "==", userId)
    );
    const res = await getDocs(q);
    if (res.empty == true) {
      await setDoc(doc(firestore, "Applications", applicationId), {
        fullNames: user.firstName + " " + user.lastName,
        userId: userId,
        jobId: jobId,
        companyId: companyId,
        jobName: jobName,
        resume: user.resume,
        timeOfApplication: new Date().toDateString(),
        applicationStatus: "Submitted",
        coverLetter: coverLetter,
      })
        .then((val) => {
          result = { code: 0, val: val };
        })
        .catch((err) => {
          result = { code: 1, val: err };
        });
    } else {
      result = { code: 1, val: "Already submitted an Application" };
    }
    return result;
  };

  getUserApplications = async () => {
    let userId = sessionStorage.getItem("userId");
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "Applications"),
      where("userId", "==", userId)
    );
    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 1, val: "No applications retrieved!" };
    } else {
      result = { code: 0, val: res };
    }
    return result;
  };

  getCompanyApplications = async () => {
    let companyId = sessionStorage.getItem("companyId");
    let result = { code: null, val: null };
    const q = query(
      collection(firestore, "Applications"),
      where("companyId", "==", companyId)
    );
    const res = await getDocs(q);
    if (res.empty == true) {
      result = { code: 1, val: "No applications retrieved!" };
    } else {
      result = { code: 0, val: res };
    }
    return result;
  };

  updateUserDetails = () => {};

  updateCompanyDetails = () => {};
}
