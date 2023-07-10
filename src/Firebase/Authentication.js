import { auth } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Firestore from "./Firestore";

export default class Auth {
  userSignIn = async (email, password) => {
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

  userSignUp = async (email, password) => {
    let result = { code: null, val: null };
    await createUserWithEmailAndPassword(auth, email, password)
      .then((val) => {
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };

  companyLogin = () => {};

  companySignUp = () => {};
}