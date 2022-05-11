import { Box } from "@material-ui/core";
import { FC } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

const ImageDropzone: FC<DropzoneOptions> = (props) => {
  const { accept, maxFiles, maxSize, minSize, onDrop, children } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  });

  return (
    <>
      <Box {...getRootProps()} sx={{ cursor: "pointer" }}>
        <input {...getInputProps()} />
        {children}
      </Box>
    </>
  );
};

export default ImageDropzone;
