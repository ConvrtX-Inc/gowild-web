import { getLogger } from './loggin';

export const imageFileToB64 = (file: File): Promise<string | ArrayBuffer> => {
  const imageLogger = getLogger('imageUtils');

  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        imageLogger.info('OBJ SRC & DATA ', {
          src: file,
          data: reader.result
        });

        resolve(reader.result);
      };
    } catch (err) {
      reject(err);
    }
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
