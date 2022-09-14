import {FileEntity, useFilesControllerUploadFileMutation} from '../api/go-wild.api';

export function useUploadImgFile() {
    const [upload] = useFilesControllerUploadFileMutation();
    return async (file: File) => {
        const formData = new FormData();
        formData.set('file', file);

        const result = await upload({body: formData} as any);
        if ('data' in result) {
            return result.data as FileEntity;
        } else if ('error' in result) {
            throw result.error;
        }
        throw result;
    };
}
