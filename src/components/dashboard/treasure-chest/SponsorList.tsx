import {
  Box,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { FC } from "react";
import WebLink from "src/icons/WebLink";
import styled from "styled-components";
import ImageDropzone from "../ImageDropzone";
import XIcon from "../../../icons/X";
import toast, { Toaster } from "react-hot-toast";

export type SponsorState = {
  link?: "";
  imageFile?: File;
};
const createNewSponsor = (): SponsorState => {
  return {
    imageFile: null,
    link: "",
  };
};

interface SponsorListProps {
  sponsors: SponsorState[];
  setSponsors: React.Dispatch<React.SetStateAction<SponsorState[]>>;
}

const SponsorList: FC<SponsorListProps> = ({ sponsors, setSponsors }) => {
  const handleLinkTextChange = (e, index: number) => {
    setSponsors((sponsors) =>
      sponsors.map((sponsor, i) => {
        if (i === index)
          return {
            ...sponsor,
            link: e.target.value,
          };
        return sponsor;
      })
    );
  };

  const handleDrop = async (fileArr: File[], index: number): Promise<void> => {
    try {
      const file: File = fileArr[0];
      if (file.size > 1000000) {
        toast.error("File must be 1MB size or less");
        return;
      }
      setSponsors((sponsors: SponsorState[]) =>
        sponsors.map((sponsor, i) => {
          if (i === index)
            return {
              ...sponsor,
              imageFile: file,
            };
          return sponsor;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = (index): void => {
    setSponsors((sponsors) =>
      sponsors.map((sponsor, i) => {
        if (i === index)
          return {
            ...sponsor,
            imageFile: null,
          };
        return sponsor;
      })
    );
  };

  const handleAddMore = () => {
    setSponsors((sponsors) => [...sponsors, createNewSponsor()]);
  };
  const removeSponsor = (index: number) => {
    setSponsors((sponsors) =>
      sponsors.filter((_, i) => {
        return i !== index;
      })
    );
  };

  return (
    <ListBox>
      {sponsors.map((s: SponsorState, i) => (
        <SponsorBox key={i}>
          <IconButton
            sx={{
              position: "absolute",
              right: "-21px",
              top: "-20px",
              zIndex: "100",
            }}
            onClick={() => removeSponsor(i)}
          >
            <XIcon fontSize="small" />
          </IconButton>
          {s?.imageFile ? (
            <Box sx={{ position: "relative" }}>
              <IconButton
                sx={{ position: "absolute", right: "-21px", top: "-20px" }}
                onClick={() => handleRemove(i)}
              >
                <XIcon fontSize="small" />
              </IconButton>
              <SponsorLogo
                component="img"
                src={URL.createObjectURL(s.imageFile)}
              />
            </Box>
          ) : (
            <ImageDropzone
              accept="image/*"
              onDrop={(file: File[]) => {
                handleDrop(file, i);
              }}
            >
              <SponsorPlaceHolder> add image </SponsorPlaceHolder>
            </ImageDropzone>
          )}
          <StyledTextField
            InputProps={{
              startAdornment: <WebLink />,
            }}
            placeholder="link"
            value={s.link}
            onChange={(e) => handleLinkTextChange(e, i)}
          />
        </SponsorBox>
      ))}
      <AddMoreText onClick={handleAddMore}>
        {sponsors.length > 0 ? "Add more" : "Add sponsor"}
      </AddMoreText>
      <Toaster />
    </ListBox>
  );
};

export default SponsorList;

const ListBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 1rem 0;
    color: #000000;

    && .MuiIconButton-root {
      color: #2995a8;
    }
  }
`;

const AddMoreText = styled(Typography)`
  && {
    cursor: pointer;
    font-size: 12px;
    font-family: Gilroy Medium;
    line-height: 15.6px;
  }
`;
const SponsorBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.25rem 0;
    position: relative;
  }
`;

const SponsorLogo = styled(Box)`
  && {
    border-radius: 22.2px;
    min-width: 67px;
    min-height: 67px;
    height: 67px;
    width: 67px;
  }
`;

const SponsorPlaceHolder = styled(SponsorLogo)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    font-family: Gilroy Regular;
    border: 2px dashed #f3f3f3;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-left: 0.5rem;
    background: #ffffff;
    color: #22333b;
    font-family: "Gilroy Medium";
    font-size: 18px;
    line-height: 27px;
    border-radius: 22.1951px;
    && .MuiSvgIcon-root {
      color: #525252;
    }
    && .Mui-focused fieldset {
      min-height: 67px;
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
    }
    && input {
      height: 67px;
      padding: 20px 33px 20px 5px;
      font-family: "Gilroy Semibold";
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: #242426;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      &::placeholder {
        font-family: "Gilroy Semibold";
        font-weight: 500;
        font-size: 12px;
        line-height: 15.6px;
        color: #000000;
        opacity: 0.4;
        display: flex;
      }
    }
    && fieldset {
      border-radius: 22.1951px;
      border: 2px solid #f3f3f3;
    }
  }
`;
