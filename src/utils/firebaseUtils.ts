import { storage } from '../firebase';
import { getLogger } from './loggin';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const firebaseUtilLogger = getLogger('Firebase Utils');

export const uploadImgToFirebase = async (file: File): Promise<string | null> => {
  if (!file) {
    firebaseUtilLogger.error('No Image File Attached');
    return null;
  }

  return new Promise<string>((resolve, reject): void => {
    const storageRef = ref(storage, `web/storageTest/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      () => {
        // const prog = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
      },
      (err) => {
        firebaseUtilLogger.error('FIREBASE ERROR: ', err);
        reject(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
      }
    );
  });
};
