import { database } from "firebase";
import { axiosPhotos } from "../axios-instances/axios-instances";
import { isURL } from "../modules/isURL";
import { Photo } from "../types/types";
import { storage } from "./firebaseConfig";

interface IStorage {
    addAvatarOfThing: (key: string, src: string) => Promise<string>
    editAvatarOfThing: (key: string, src: string) => Promise<string>
    deleteAvatarOfThing: (key: string) => Promise<void>
    addAvatarOfOwner: (key: string, src: string) => Promise<string>
    deleteAvatarOfOwner: (key: string) => Promise<void>
    addPhotosOfThing: (photos: Photo[]) => Promise<Photo[] | undefined>
    deletePhoto: (key: string) => Promise<void>
    deletePhotosOfThing: (id: string) => Promise<void>
}

export const STORAGE: IStorage = {
    addAvatarOfThing: async (key, src) => {
        if ( isURL(src) ) {
            return src;
        }
        await storage.ref(`/avatars/${key}`).putString(src, "data_url");
        return storage.ref('avatars').child(key).getDownloadURL();
    },

    editAvatarOfThing: async (key, src) => {
        return await STORAGE.addAvatarOfThing(key, src);
    },

    deleteAvatarOfThing: async (key) => await storage.ref(`/avatars/${key}`).delete(),

    addAvatarOfOwner: async (key, src) => {
        if ( isURL(src) ) {
            return src;
        }
        
        await storage.ref(`/userAvatars/${key}`).putString(src, "data_url");
        return storage.ref('userAvatars').child(key).getDownloadURL();
    },

    deleteAvatarOfOwner: async (key) => await storage.ref(`/userAvatars/${key}`).delete(),

    addPhotosOfThing: async (photos) => {
        if ( !photos.length ) {
            return;
        }
        const uploadedPhotos: Photo[] = [];
        
        for (let photo of photos) {
            if ( !isURL(photo.source) ) {
                await storage.ref(`/photos/${photo.key}`).putString(photo.source, "data_url");
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