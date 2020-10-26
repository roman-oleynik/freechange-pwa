import { Photo } from "../types/types";

export async function readImagesFromFileInput(files: FileList | null, onSuccess: (reader: FileReader) => void) {
    if (files) {
        for (const file of files) {
            readAndPreview(file);
        }
    }

    async function readAndPreview(file: File) {
        const hasPictureFormat = /\.(jpe?g|png|gif)$/i.test(file.name);

        if ( hasPictureFormat ) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => onSuccess(reader);
            reader.onerror = function() {
                console.log(reader.error);
            };
        }
    }
}