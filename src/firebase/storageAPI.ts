import { database } from "firebase";
import { axiosPhotos } from "../axios-instances/axios-instances";
import { isURL } from "../modules/isURL";
import { Photo } from "../types/types";
import { storage } from "./firebaseConfig";

interface IStorage {
    addAvatarOfThing: (key: string, src: string | Blob) => Promise<string>
    editAvatarOfThing: (key: string, src: string | Blob) => Promise<string>
    deleteAvatarOfThing: (key: string) => Promise<void>
    addAvatarOfOwner: (key: string, src: string | Blob) => Promise<string>
    deleteAvatarOfOwner: (key: string) => Promise<void>
    addPhotosOfThing: (photos: Photo[]) => Promise<Photo[] | undefined>
    deletePhoto: (key: string) => Promise<void>
    deletePhotosOfThing: (id: string) => Promise<void>
}

export const STORAGE: IStorage = {
    addAvatarOfThing: async (key, src) => {
        if ( !(src instanceof Blob) ) {
            return src;
        }
        await storage.ref(`/avatars/${key}`).put(src, {
            contentType: 'image/jpeg'
        });
        return storage.ref('avatars').child(key).getDownloadURL();
    },

    editAvatarOfThing: async (key, src) => {
        return await STORAGE.addAvatarOfThing(key, src);
    },

    deleteAvatarOfThing: async (key) => await storage.ref(`/avatars/${key}`).delete(),

    addAvatarOfOwner: async (key, src) => {
        if ( !(src instanceof Blob) ) {
            return src;
        }
        await storage.ref(`/userAvatars/${key}`).put(src, {
            contentType: 'image/jpeg'
        });
        return storage.ref('userAvatars').child(key).getDownloadURL();
    },

    deleteAvatarOfOwner: async (key) => await storage.ref(`/userAvatars/${key}`).delete(),

    addPhotosOfThing: async (photos) => {
        if ( !photos.length ) {
            return;
        }
        const uploadedPhotos: Photo[] = [];
        
        for (let photo of photos) {
            if ( photo.source instanceof Blob ) {
                console.log(photo);
                await storage.ref(`/photos/${photo.key}`).put(photo.source, {
                    contentType: 'image/jpeg'
                });
                const downloadURL = await storage.ref('photos').child(photo.key).getDownloadURL();
                photo.source = downloadURL;
                uploadedPhotos.push(photo);
            }
        }

        return uploadedPhotos;
    },

    deletePhoto: async (key) => await storage.ref(`/photos/${key}`).delete(),

    deletePhotosOfThing: async (id) => {
        const { data } = await axiosPhotos.get(`?orderBy="rel_Thing"&equalTo="${id}"`);

        for await (const photo of data) {
            storage.ref(`/photos/${photo.id}`).delete();
        }
    }
};