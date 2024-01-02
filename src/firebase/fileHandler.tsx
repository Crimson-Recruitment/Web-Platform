import { db } from "./config";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";

interface StorageResult {
  code: number | null;
  val: any;
}

export default class FirebaseStorage {
  static getFileUrl = async (
    id: string,
    imageData: any,
  ): Promise<StorageResult> => {
    let result: StorageResult = { code: null, val: null };
    const storageRef = ref(db, id);

    try {
      await uploadBytes(storageRef, imageData);
      const downloadUrl = await getDownloadURL(storageRef);
      result = { code: 0, val: downloadUrl };
    } catch (err) {
      result = { code: 1, val: err };
    }

    return result;
  };

  static deleteFile = async (id: string): Promise<StorageResult> => {
    let result: StorageResult = { code: null, val: null };
    const storageRef = ref(db, id);

    try {
      await deleteObject(storageRef);
      result = { code: 0, val: "File deleted successfully" };
    } catch (err) {
      result = { code: 1, val: err };
    }

    return result;
  };
}
