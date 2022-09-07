import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const ImageDropzone: FC<DropzoneOptions & { children: ReactNode }> = (props) => {
  const { accept, maxFiles, maxSize, minSize, onDrop, children } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop
  });

  return (
    <ImageDropBox {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </ImageDropBox>
  );
};

export default ImageDropzone;

const ImageDropBox = styled(Box)`
  && {
    width: min-content;
    cursor: pointer;
    &:hover {
      background-color: rgba(243, 243, 243, 0.25);
      border-radius: 22.2px;
      transition: 0.25s ease-out;
    }
  }
`;
