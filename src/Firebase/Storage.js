import { db } from "./FirebaseConfig.js";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

export default class Storage {
  getFileUrl = async (id, imageData) => {
    let result = { code: null, val: null };
    const storageRef = ref(db, id);

    await uploadBytes(storageRef, imageData)
      .then(async () => {
        await getDownloadURL(storageRef)
          .then((val) => {
            result = { code: 0, val: val };
          })
          .catch((err) => {
            result = { code: 1, val: err };
          });
      })
      .catch((err) => {
        result = { code: 1, val: err };
      });
    return result;
  };
}
