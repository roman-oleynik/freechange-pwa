import axios from 'axios';
import { getArrayFromObject } from '../modules/getArrayFromObject';

export const axiosThings = axios.create({
    baseURL: `https://freechange.firebaseio.com/things.json`,
});

export const axiosPhotos = axios.create({
    baseURL: `https://freechange.firebaseio.com/photos.json`,
    transformResponse: [<T>(data: string): T[] => {
        return getArrayFromObject<T>(JSON.parse(data));
    }],
});

export const axiosOwners = axios.create({
    baseURL: `https://freechange.firebaseio.com/owners.json`,
    transformResponse: [<T>(data: string): T[] => {
        return getArrayFromObject<T>(JSON.parse(data));
    }],
});