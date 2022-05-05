import { Box, Button, IconButton } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { default as UploadIcon } from "src/icons/Upload";
import { TextFieldLabel } from "src/shared-styled-components/dashboard";
import styled from "styled-components";
import ImageDropzone from "../ImageDropzone";
import XIcon from "../../../icons/X";

interface EditUploadImageProps {
  label: string;
  imageFile: File;
  onImgUpload: (file: File) => void;
  error?: any;
  imgURL: string;
  onReplaceImage: (replaced: boolean) => void;
  replaceImage: boolean;
}

const EditUploadImage: FC<EditUploadImageProps> = ({
  label,
  imageFile,
  onImgUpload,
  error,
  imgURL,
  replaceImage,
  onReplaceImage,
}) => {
  useEffect(() => {}, [imageFile, error]);
  const [sizeError, setSizeError] = useState(false);

  const handleDrop = async (fileArr: File[]): Promise<void> => {
    onReplaceImage(true);
    const file = fileArr[0];
    if (file.size > 1000000) {
      setSizeError(true);
      return;
    }
    try {
      onImgUpload(file);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = (e): void => {
    e.stopPropagation();
    onReplaceImage(false);
    onImgUpload(null);
  };

  return (
    <>
      <TextFieldLabel>{label}</TextFieldLabel>
      <ImageDropzone accept="image/*" onDrop={handleDrop}>
        <UploadBox>
          {!replaceImage ? (
            <>
              <Box
                component="img"
                src={imgURL}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              <ReUploadBox>
                <StyledUploadIcon />
              </ReUploadBox>
            </>
          ) : !imageFile && (sizeError || error) ? (
            <ImgBoxError>
              {sizeError ? (
                <>
                  <ErrorMsg>File must be 1MB size or less</ErrorMsg>
                  <TryAgainButton
                    sx={{ mt: 1 }}
                    onClick={(e) => setSizeError(false)}
                    variant="outlined"
                  >
                    Try again
                  </TryAgainButton>{" "}
                </>
              ) : (
                <>
                  <ErrorMsg>{error}</ErrorMsg>
                  <TryAgainButton sx={{ mt: 1 }} variant="outlined">
                    Upload
                  </TryAgainButton>{" "}
                </>
              )}
            </ImgBoxError>
          ) : imageFile ? (
            <>
              <IconButton
                sx={{
                  position: "absolute",
                  right: "-21px",
                  top: "-20px",
                }}
                onClick={handleRemove}
              >
                <XIcon fontSize="small" />
              </IconButton>
              <Box
                component="img"
                src={URL.createObjectURL(imageFile)}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </>
          ) : (
            <StyledUploadIcon />
          )}
        </UploadBox>
      </ImageDropzone>
    </>
  );
};

export default EditUploadImage;

const ImgBoxError = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ErrorMsg = styled(Box)`
  && {
    font-family: "Gilroy Regular";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #f44336;
  }
`;

const TryAgainButton = styled(Button)`
  && {
    color: #f44336;
    border-color: #f44336;
  }
`;

const ReUploadBox = styled(Box)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledUploadIcon = styled(UploadIcon)`
  && {
    color: #f3f3f3;
    font-size: 3rem;
  }
`;

const UploadBox = styled(Box)`
  && {
    height: 178px;
    border-radius: 22.2px;
    border: 2px solid #f3f3f3;
    margin-top: 6px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;

    &:hover {
      border-color: #2995a8;
      color: #2995a8;
      .MuiSvgIcon-root {
        color: #2995a8;
      }
    }
  }
`;
