// import DuplicateIcon from "../icons/Duplicate";
import CrossIcon from '../icons/RouteListCross';
import { Box, IconButton, List, ListItem } from '@mui/material';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

// import XIcon from "../icons/X";
// import bytesToSize from "../utils/bytesToSize";

interface FileDropzoneHistoricalProps extends DropzoneOptions {
  files?: any[];
  onRemove?: (file: any) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
}

const FileDropzoneHistorical: FC<FileDropzoneHistoricalProps> = (props) => {
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

  // We did not add the remaining props to avoid component complexity
  // but you can simply add it if you need to.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop
  });

  return (
    <Box {...other} sx={{ ml: 'auto' }}>
      <Box
        sx={{
          mr: '30px',
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
            cursor: 'pointer'
            // opacity: 0.5,
          }
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
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
          <img width='53.92px' height='38.56px' alt='Select file' src='/static/add_file.svg' />
          <CaptionTypo>Attach images</CaptionTypo>
        </Box>
        {/* <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="h6">
            {`Select file${maxFiles && maxFiles === 1 ? "" : "s"}`}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography color="textPrimary" variant="body1">
              {`Drop file${maxFiles && maxFiles === 1 ? "" : "s"}`}{" "}
              <Link color="primary" underline="always">
                browse
              </Link>{" "}
              through your machine
            </Typography>
          </Box>
        </Box> */}
      </Box>

      <Box>
        <List>
          {files.map((file) => (
            <ListItem
              key={file.path}
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  right: '55px',
                  top: '-15px'
                }}
                onClick={() => onRemove && onRemove(file)}
              >
                <CrossIcon fontSize='medium' />
              </IconButton>
              <img height='50%' width='50%' src={URL.createObjectURL(file)} alt='sample' />
              {/* <img
                height="157.17px"
                width="234"
                src={URL.createObjectURL(file)}
                alt="sample"
              /> */}
            </ListItem>
          ))}
        </List>
      </Box>
      {/* {files.length > 0 && (
        <Box>
          <List>
            {files.map((file) => (
              <ListItem
                key={file.path}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  "& + &": {
                    mt: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <DuplicateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "subtitle2",
                  }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="Remove">
                  <IconButton
                    edge="end"
                    onClick={() => onRemove && onRemove(file)}
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              color="primary"
              onClick={onRemoveAll}
              size="small"
              type="button"
              variant="text"
            >
              Remove All
            </Button>
            <Button
              color="primary"
              onClick={onUpload}
              size="small"
              sx={{ ml: 2 }}
              type="button"
              variant="contained"
            >
              Upload
            </Button>
          </Box>
        </Box>
      )} */}
    </Box>
  );
};

FileDropzoneHistorical.propTypes = {
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  disabled: PropTypes.bool,
  files: PropTypes['array'],
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool
};

FileDropzoneHistorical.defaultProps = {
  files: []
};

export default FileDropzoneHistorical;

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
