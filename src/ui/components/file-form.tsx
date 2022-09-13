import {FileDropzone} from "./file-dropzone";
import {Accept, DropEvent, FileRejection} from "react-dropzone";
import {useField} from "formik";
import {useCallback, useState} from "react";
import {FileEntity} from "../../lib/api/go-wild.api";
import {useUploadImgFile} from "../../lib/hooks/use-upload";
import {useMounted} from "../../lib/hooks/use-mounted";

export interface FileFormProps {
    accept?: Accept;
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    name: string;
    multiple?: boolean;
}

export function FileForm({multiple, name, accept, maxFiles, maxSize, minSize}: FileFormProps) {
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

    const handleRemove = useCallback(async (file: FileEntity) => {
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
    const handleRemoveAll = useCallback(() => {
        setFiles(multiple ? [] : undefined);
        helper.setValue(undefined);
    }, [helper, multiple]);

    return (
        <FileDropzone
            accept={accept}
            maxFiles={maxFiles}
            maxSize={maxSize}
            minSize={minSize}
            multiple={multiple}
            files={files}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
        />
    );
}
