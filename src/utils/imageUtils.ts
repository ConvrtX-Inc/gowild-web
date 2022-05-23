export const imageFileToB64 = (file: File) => {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("OBJ SRC & DATA ", {
          src: file,
          data: reader.result,
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
