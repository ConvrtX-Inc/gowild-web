import { Box, IconButton } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { TextFieldLabel } from "src/shared-styled-components/dashboard";
import styled from "styled-components";
import ImageDropzone from "../ImageDropzone";
import XIcon from "../../../icons/X";
import { StyledElements } from "./UploadImage";

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
      <StyledElements.FlexCenterBox>
        <ImageDropzone accept="image/*" onDrop={handleDrop}>
          <StyledElements.FlexCenterBox>
            <StyledElements.UploadBox>
              {!replaceImage ? (
                <>
                  <Box
                    component="img"
                    src={imgURL}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "22.2px",
                    }}
                  />
                  <ReUploadBox>
                    <StyledElements.StyledUploadIcon />
                  </ReUploadBox>
                </>
              ) : !imageFile && (sizeError || error) ? (
                <StyledElements.ImgBoxError>
                  {sizeError ? (
                    <>
                      <StyledElements.ErrorMsg>
                        File must be 1MB size or less
                      </StyledElements.ErrorMsg>
                      <StyledElements.TryAgainButton
                        sx={{ mt: 1 }}
                        onClick={(e) => setSizeError(false)}
                        variant="outlined"
                      >
                        Try again
                      </StyledElements.TryAgainButton>{" "}
                    </>
                  ) : (
                    <>
                      <StyledElements.ErrorMsg>{error}</StyledElements.ErrorMsg>
                      <StyledElements.TryAgainButton
                        sx={{ mt: 1 }}
                        variant="outlined"
                      >
                        Upload
                      </StyledElements.TryAgainButton>{" "}
                    </>
                  )}
                </StyledElements.ImgBoxError>
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
                      objectFit: "cover",
                      borderRadius: "22.2px",
                    }}
                  />
                </>
              ) : (
                <StyledElements.StyledUploadIcon />
              )}
            </StyledElements.UploadBox>
          </StyledElements.FlexCenterBox>
        </ImageDropzone>
      </StyledElements.FlexCenterBox>
    </>
  );
};

export default EditUploadImage;

const ReUploadBox = styled(Box)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
