import {Accept, DropEvent, FileRejection, useDropzone} from "react-dropzone";
import {useField} from "formik";
import {useCallback, useMemo, useState} from "react";
import {FileEntity} from "../../../lib/api/go-wild.api";
import {useUploadImgFile} from "../../../lib/hooks/use-upload";
import {useMounted} from "../../../lib/hooks/use-mounted";
import {Box, Button, IconButton, Stack} from "@mui/material";
import CrossIcon from "../../icons/RouteListCross";
import {GilroyMediumTypography} from "../../font.text";

export interface FileFormProps {
    accept?: Accept;
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    name: string;
    multiple?: boolean;
}

/**
 * A form component
 *
 * @param multiple
 * @param name
 * @param accept
 * @param maxFiles
 * @param maxSize
 * @param minSize
 * @constructor
 */
export function FileForm({multiple, name, ...props}: FileFormProps) {
    const [field, meta, helper] = useField(name);
    const uploadImgFile = useUploadImgFile();
    const isMounted = useMounted();

    const [files, setFiles] = useState<FileEntity[] | FileEntity | undefined>(field.value);
    const handleDrop = useCallback(async (
        newFiles: File[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => {
        const uploadedFiles = await Promise.all(newFiles.map(uploadImgFile));
        if (!isMounted) {
            return;
        }

        if (multiple) {
            const tmp = [...((files ?? []) as any), ...uploadedFiles];
            setFiles(tmp);
            helper.setValue(tmp);
        } else {
            const tmp = uploadedFiles[0];
            setFiles(tmp);
            helper.setValue(tmp);
        }
    }, [files, helper, isMounted, multiple, uploadImgFile]);

    const onRemove = useCallback(async (file: FileEntity) => {
        if (multiple) {
            const tmp = (files as FileEntity[]).filter((f) => f.path !== file.path);
            setFiles(tmp);
            helper.setValue(tmp);
        } else {
            setFiles(undefined);
            helper.setValue(undefined);
            return;
        }
    }, [files, helper, multiple]);
    const onRemoveAll = useCallback(() => {
        setFiles(multiple ? [] : undefined);
        helper.setValue(undefined);
    }, [helper, multiple]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        ...props,
        onDrop: handleDrop,
    });
    const isEmpty = useMemo(() => {
        if (Array.isArray(files)) {
            return files.length === 0;
        } else {
            return !files;
        }
    }, [files]);
    const first = useMemo(() => {
        if (Array.isArray(files) && files.length > 0) {
            return files[0];
        } else {
            return files as FileEntity;
        }
    }, [files]);

    return (
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
                    cursor: `${isEmpty ? 'pointer' : 'auto'}`
                }
            }}
            {...getRootProps()}
        >
            {isEmpty && <input {...getInputProps()} />}
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
                {!isEmpty ? (
                    <Box sx={{position: 'relative'}}>
                        {first.size > 1000000 ? (
                            <Stack justifyContent='center' alignItems='center'>
                                <GilroyMediumTypography color='#f44336'>File must be 1MB size or less</GilroyMediumTypography>
                                <Button
                                    sx={{mt: 1, backgroundColor: '#f44336'}}
                                    onClick={() => onRemove && onRemove(first)}
                                    variant='outlined'
                                >
                                    Try again
                                </Button>
                            </Stack>
                        ) : (
                            <>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: '-21px',
                                        top: '-20px'
                                    }}
                                    onClick={() => onRemove && onRemove(first)}
                                >
                                    <CrossIcon fontSize='medium'/>
                                </IconButton>
                                <img
                                    height='90px'
                                    width='90px'
                                    src={!isEmpty ? first.path : ''}
                                    alt='route-img'
                                />
                            </>
                        )}
                    </Box>
                ) : (
                    <>
                        <img width='53.92px' height='38.56px' alt='Select file' src='/static/add_file.svg'/>
                        <GilroyMediumTypography>Attach images of thumbnail</GilroyMediumTypography>
                    </>
                )}
            </Box>
        </Box>
    );
}
