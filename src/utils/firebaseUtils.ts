import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImgToFirebase = async (file: File): Promise<string> => {
  if (!file) {
    console.error("No Image File Attached");
    return;
  }

  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `web/storageTest/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const prog = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
      },
      (err) => {
        console.error("FIREBASE ERROR: ", err);
        reject(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
      }
    );
  });
};
