import CrossIcon from '../icons/RouteListCross';
import { Box, Button, IconButton, styled } from '@mui/material';
import type { FC } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps extends DropzoneOptions {
  files?: any[];
  onRemove?: (file: any) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
}

export const FileDropzone: FC<FileDropzoneProps> = (props) => {
  const {
    accept,
    disabled,
    files,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    ...other
  } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop
  });

  return (
    <div {...(other as any)}>
      <Box
        sx={{
          alignItems: 'center',
          border: 0,
          borderRadius: 1,
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 0,
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5
          }),
          '&:hover': {
            // backgroundColor: "action.hover",
            cursor: `${files.length < 1 ? 'pointer' : 'auto'}`
            // opacity: 0.5,
          }
        }}
        {...getRootProps()}
      >
        {files.length < 1 && <input {...getInputProps()} />}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mb: '20px',
            '& img': {
              width: 100
            }
          }}
        >
          {files.length > 0 ? (
            <Box sx={{ position: 'relative' }}>
              {files[0].size > 1000000 ? (
                <ImgBoxError>
                  <ErrorMsg>File must be 1MB size or less</ErrorMsg>
                  <TryAgainButton
                    sx={{ mt: 1 }}
                    onClick={() => onRemove && onRemove(files[0])}
                    variant='outlined'
                  >
                    Try again
                  </TryAgainButton>
                </ImgBoxError>
              ) : (
                <>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: '-21px',
                      top: '-20px'
                    }}
                    onClick={() => onRemove && onRemove(files[0])}
                  >
                    <CrossIcon fontSize='medium' />
                  </IconButton>
                  <img
                    height='90px'
                    width='90px'
                    src={files.length > 0 ? URL.createObjectURL(files[0]) : ''}
                    alt='route-img'
                  />
                </>
              )}
            </Box>
          ) : (
            <>
              <img width='53.92px' height='38.56px' alt='Select file' src='/static/add_file.svg' />
              <CaptionTypo>Attach images of thumbnail</CaptionTypo>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

FileDropzone.defaultProps = {
  files: []
};

const CaptionTypo = styled(Box)`
  && {
    margin-top: 15.45px;
    font-family: 'Gilroy Medium';
    font-size: 0.875rem;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: rgba(0, 0, 0, 0.2);
  }
`;

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
    font-family: 'Gilroy Medium';
    font-style: normal;
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
