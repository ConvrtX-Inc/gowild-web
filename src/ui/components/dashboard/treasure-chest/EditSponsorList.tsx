import XIcon from '../../../icons/X';
import ImageDropzone from '../ImageDropzone';
import { StyledElements } from './SponsorList';
import { Box, IconButton } from '@mui/material';
import { FC } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Refresh from 'src/ui/icons/Refresh';
import WebLink from 'src/ui/icons/WebLink';
import { getLogger } from 'src/utils/loggin';

const logger = getLogger('EditSponsorList');

export type SponsorState = {
  id?: string;
  link?: string;
  imageFile?: File;
  img_url: string;
  deleted?: boolean;
  updated?: boolean;
};
const createNewSponsor = (): SponsorState => {
  return {
    id: null,
    imageFile: null,
    link: '',
    img_url: ''
  };
};

interface EditSponsorListProps {
  sponsors: SponsorState[];
  setSponsors: React.Dispatch<React.SetStateAction<SponsorState[]>>;
}

const EditSponsorList: FC<EditSponsorListProps> = ({ sponsors: sponsorsState, setSponsors }) => {
  const handleLinkTextChange = (e, index: number) => {
    setSponsors((sponsors) =>
      sponsors.map((sponsor, i) => {
        if (i === index) {
          return {
            ...sponsor,
            link: e.target.value,
            updated: !!sponsor?.id
          };
        }
        return sponsor;
      })
    );
  };

  const handleDrop = async (fileArr: File[], index: number): Promise<void> => {
    try {
      const file: File = fileArr[0];
      if (file.size > 1000000) {
        toast.error('File must be 1MB size or less');
        return;
      }
      setSponsors((sponsors: SponsorState[]) =>
        sponsors.map((sponsor, i) => {
          if (i === index) {
            return {
              ...sponsor,
              imageFile: file,
              updated: !!sponsor?.id
            };
          }
          return sponsor;
        })
      );
    } catch (err) {
      logger.error(err);
    }
  };

  const handleRemove = (index): void => {
    setSponsors((sponsors) =>
      sponsors.map((sponsor, i) => {
        if (i === index) {
          return {
            ...sponsor,
            imageFile: null
          };
        }
        return sponsor;
      })
    );
  };

  const handleAddMore = () => {
    setSponsors((sponsors) => [...sponsors, createNewSponsor()]);
  };

  const removeSponsor = (index: number) => {
    if (sponsorsState[index]?.id) {
      setSponsors((sponsors) =>
        sponsors.map((s, i) => {
          if (i !== index) {
            return s;
          }
          return {
            ...s,
            deleted: true
          };
        })
      );
    } else {
      setSponsors((sponsors) =>
        sponsors.filter((_, i) => {
          return i !== index;
        })
      );
    }
  };

  return (
    <StyledElements.ListBox>
      {sponsorsState.map((s, i) => {
        return !s?.deleted ? (
          <StyledElements.SponsorBox key={i}>
            <IconButton
              sx={{
                position: 'absolute',
                right: '-21px',
                top: '-20px',
                zIndex: '100'
              }}
              onClick={() => removeSponsor(i)}
            >
              <XIcon fontSize='small' />
            </IconButton>
            {s?.imageFile || s.img_url ? (
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: '-21px',
                    top: '-20px'
                  }}
                  onClick={() => {
                    handleRemove(i);
                  }}
                >
                  {s?.imageFile ? (
                    <XIcon fontSize='small' />
                  ) : (
                    <ImageDropzone
                      accept='image/*'
                      onDrop={(file: File[]) => {
                        handleDrop(file, i);
                      }}
                    >
                      <Refresh fontSize='small' />
                    </ImageDropzone>
                  )}
                </IconButton>
                <StyledElements.SponsorLogo
                  component='img'
                  src={s.imageFile ? URL.createObjectURL(s.imageFile) : s.img_url}
                />
              </Box>
            ) : (
              <ImageDropzone
                accept='image/*'
                onDrop={(file: File[]) => {
                  handleDrop(file, i);
                }}
              >
                <StyledElements.SponsorPlaceHolder> add image </StyledElements.SponsorPlaceHolder>
              </ImageDropzone>
            )}
            <StyledElements.StyledTextField
              InputProps={{
                startAdornment: <WebLink />
              }}
              placeholder='link'
              value={s.link}
              onChange={(e) => handleLinkTextChange(e, i)}
            />
          </StyledElements.SponsorBox>
        ) : null;
      })}
      <StyledElements.AddMoreText onClick={handleAddMore}>
        {sponsorsState.length > 0 ? 'Add more' : 'Add sponsor'}
      </StyledElements.AddMoreText>
      <Toaster />
    </StyledElements.ListBox>
  );
};

export default EditSponsorList;
