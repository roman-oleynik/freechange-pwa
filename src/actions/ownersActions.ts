import { Action, Owner } from '../types/types';
import {
    SET_LOGGED_OWNER
} from '../constants/constants';
import { Dispatch } from 'redux';
import { database, storage } from '../firebase/firebaseConfig';
import { ThunkDispatch } from 'redux-thunk';
import { isURL } from '../modules/isURL';
import { getArrayFromObject } from '../modules/getArrayFromObject';
import { axiosOwners } from '../axios-instances/axios-instances';



export function setLoggedOwner(loggedOwner: Owner | null): Action {
    return {
        type: SET_LOGGED_OWNER,
        body: loggedOwner
    };
};


export function fetchLoggedOwner(loggedOwnerId: string) {
    return async (dispatch: Dispatch<Action>): Promise<void> => {
        try {
            const response = await axiosOwners(`?orderBy="id"&equalTo="${loggedOwnerId}"`, {
                transformResponse: [<T>(data: string): T[] => getArrayFromObject<T>(JSON.parse(data))],
            });
            dispatch(setLoggedOwner(response.data[0]));
        } catch (error) {
            console.log(error);
            dispatch(setLoggedOwner(null));
        }
    }
}
