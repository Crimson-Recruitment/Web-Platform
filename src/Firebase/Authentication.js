import { auth } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Cookies from "universal-cookie";

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

  signUp = async (email, password) => {
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

  logout = async () => {
    let result = { code: null, val: null };
    await signOut(auth)
      .then((val) => {
        this.#cookie.remove("user-login", { path: "/" });
        this.#cookie.remove("company-login", { path: "/" });
        result = { code: 0, val: val };
      })
      .catch((err) => {
        result = { code: 0, val: err };
      });
    return result;
  };
}
