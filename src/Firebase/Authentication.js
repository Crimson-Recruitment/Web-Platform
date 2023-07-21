import { auth } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification
} from "firebase/auth";
import Cookies from "universal-cookie";
import Firestore from "./Firestore";

export default class Auth {
  #cookie = new Cookies();
  signIn = async (email, password) => {
    let result = { code: null, val: null };
    await signInWithEmailAndPassword(auth, email, password)
      .then((val) => {
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  signUserUp = async (
    id,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    location
  ) => {
    let result = { code: null, val: null };
    let firestore = new Firestore();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await firestore
          .initUserDetails(
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            location
          )
          .then((val) => {
            if (val.code == 0) {
              result = { code: 0, val: val.val };
            } else {
              result = { code: 1, val: val.val };
            }
          });
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  signCompanyUp = async (
    id,
    companyName,
    phoneNumber1,
    phoneNumber2 = "",
    email,
    password,
    location
  ) => {
    let result = { code: null, val: null };
    let firestore = new Firestore();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await firestore
          .initCompanyDetails(
            id,
            companyName,
            phoneNumber1,
            phoneNumber2,
            email,
            location
          )
          .then(async (val) => {
            if (val.code == 0) {
              result = { code: 0, val: val.val };
            } else {
              result = { code: 1, val: val.val };
            }
          });
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };
  logout = async () => {
    let result = { code: null, val: null };
    await signOut(auth)
      .then((val) => {
        this.#cookie.remove("user-login", { path: "/" });
        this.#cookie.remove("company-login", { path: "/" });
        sessionStorage.removeItem("companyDetails");
        sessionStorage.removeItem("userDetails");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("companyEmail");
        sessionStorage.removeItem("companyId");
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 0, val: err };
      });
    return result;
  };

  verifyEmail = async () => {
    var result = {code:null, vall:null}
    await sendEmailVerification(auth.currentUser)
    .then(val => {
      result = {code:0, val:val}
    })
    .catch(err => {
      result = {code:1, val:err}
    })
    return result
  }
}
