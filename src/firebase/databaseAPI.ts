import { axiosPhotos } from "../axios-instances/axios-instances";
import { generateId } from "../modules/generateId";
import { Owner, Photo, Thing } from "../types/types";
import { database } from "./firebaseConfig";

interface IDatabase {
    addThing: (payload: Thing) => Promise<void>
    editThing: (key: string, payload: Thing) => Promise<void>,
    deleteThing: (key: string) => Promise<void>,

    addOwner: (payload: Owner) => Promise<void>
    editOwner: (key: string, payload: Owner) => Promise<void>,

    addPhotos: (photos: Photo[]) => Promise<void>,
    deletePhoto: (key: string) => Promise<void>,
    deletePhotosOfThing: (id: string) => Promise<void>,
}

export const DATABASE: IDatabase = {
    addThing: async (payload) => {
        const newThingKey = database.ref().child('things').push().key;
        payload.key = newThingKey as string;
        await database.ref(`/things/${newThingKey}`).update(payload);
    },
    
    editThing: async (key, payload) => await database.ref(`/things/${key}`).update(payload),
    
    addOwner: async (payload) => {
        const newOwnerKey = database.ref().child('owners').push().key;
        payload.key = newOwnerKey as string;
        await database.ref(`/owners/${newOwnerKey}`).update(payload);
    },
    
    editOwner: async (key, payload) => await database.ref(`/owners/${key}`).update(payload),
    
    deleteThing: async (key) => await database.ref(`/things/${key}`).remove(),

    addPhotos: async (photos) => {
        if ( !photos.length ) {
            return;
        }
        for await (let photo of photos) {
            const key = database.ref().child('photos').push().key;
            photo.key = key || generateId();
            await database.ref(`/photos/${key}`).update(photo);
        }
    },
    
    deletePhoto: async (key) => await database.ref(`/photos/${key}`).remove(),

    deletePhotosOfThing: async (id) => {
        const { data } = await axiosPhotos.get(`?orderBy="rel_Thing"&equalTo="${id}"`);

        for await (const photo of data) {
            database.ref(`/photos/${photo.key}`).remove();
        }
    }
};