import {Action, Thing, SearchThingsQuery, Photo} from '../types/types';
import {
    SET_THINGS,
    THINGS_ON_PAGE,
    SET_THINGS_OF_USER,
    SET_IS_ONLINE,
    SET_PAGES_AMOUNT_OF_THINGS,
    SET_FREE_THINGS,
    SET_PAGES_AMOUNT_OF_FREE_THINGS,
    SET_FOUND_THINGS,
    SET_CUR_PAGE_OF_THINGS,
    SET_CUR_PAGE_OF_FREE_THINGS,
    ADD_THING_OF_USER,
    EDIT_THING_OF_USER
} from '../constants/constants';
import { ThunkDispatch } from 'redux-thunk';
import { getArrayFromObject } from '../modules/getArrayFromObject';
import { axiosThings } from '../axios-instances/axios-instances';
import { STORAGE } from '../firebase/storageAPI';
import { DATABASE } from '../firebase/databaseAPI';


export function setThingsOfUser(things: Thing[]): Action {
    return {
        type: SET_THINGS_OF_USER,
        body: things,
    };
};
export function addThingOfUser(thing: Thing): Action {
    return {
        type: ADD_THING_OF_USER,
        body: thing,
    };
};
export function editThingOfUser(thing: Thing): Action {
    return {
        type: EDIT_THING_OF_USER,
        body: thing,
    };
};


export function fetchThingsOfUser(userId: string) {
    return async (dispatch: ThunkDispatch<{}, {}, Action>): Promise<void> => {
        const response = await axiosThings.get(`?orderBy="rel_Owner"&equalTo="${userId}"`, {
            transformResponse: [<T>(data: string): T[] => {
                return getArrayFromObject<T>(JSON.parse(data));
            }],
        })
        dispatch(setThingsOfUser(response.data));
    }
};


export function requestAddingThing(payload: Thing, photosOfThing: Photo[]) {
    return async (dispatch: ThunkDispatch<{}, {}, Action>) => {
        if (payload.avatar) {
            const avatarUrl: string = await STORAGE.addAvatarOfThing(payload.id, payload.avatar);
            payload.avatar = avatarUrl;
        }
        await DATABASE.addThing(payload);
        dispatch(addThingOfUser(payload));
    }
}

export function requestEditingThing(payload: Thing, photosOfThing: Photo[]) {
    return async (dispatch: ThunkDispatch<{}, {}, Action>) => {
        if (payload.avatar) {
            const avatarUrl: string = await STORAGE.editAvatarOfThing(payload.id, payload.avatar);
            payload.avatar = avatarUrl;
        }
        await DATABASE.editThing(payload.key, payload);
        dispatch(editThingOfUser(payload));
    }
}







export function setDataOfThings(things: Thing[]): Action {
    return {
        type: SET_THINGS,
        body: things,
    };
};
export function setCurPageOfThings(curPage: number): Action {
    return {
        type: SET_CUR_PAGE_OF_THINGS,
        body: curPage,
    };
};
export function setPagesAmountOfThings(pagesAmount: number): Action {
    return {
        type: SET_PAGES_AMOUNT_OF_THINGS,
        body: pagesAmount,
    };
};

export function setDataOfFreeThings(things: Thing[]): Action {
    return {
        type: SET_FREE_THINGS,
        body: things,
    };
};
export function setPagesAmountOfFreeThings(pagesAmount: number): Action {
    return {
        type: SET_PAGES_AMOUNT_OF_FREE_THINGS,
        body: pagesAmount,
    };
};
export function setCurPageOfFreeThings(curPage: number): Action {
    return {
        type: SET_CUR_PAGE_OF_FREE_THINGS,
        body: curPage,
    };
};
export function setFoundThings(things: Thing[]): Action {
    return {
        type: SET_FOUND_THINGS,
        body: things,
    };
};





export function fetchPageOfThings(page: number) {
    return async (dispatch: ThunkDispatch<{}, {}, Action>): Promise<void> => {
        const response = await axiosThings.get('?shallow=true');
        const keysOfThings: string[] = Object.keys(response.data).sort();
        dispatch(setPagesAmountOfThings(Math.ceil(keysOfThings.length / THINGS_ON_PAGE)));
        dispatch(setCurPageOfThings(page));

        const indexOfFirstThingOnPage = THINGS_ON_PAGE * (page - 1);
        const fromKey: string = keysOfThings[indexOfFirstThingOnPage];

        const thingsOnCurPage = await axiosThings.get(`?orderBy="key"&startAt="${fromKey}"&limitToFirst=${THINGS_ON_PAGE}`, {
            transformResponse: [<T>(data: string): T[] => getArrayFromObject<T>(JSON.parse(data))],
        });
        dispatch(setDataOfThings(thingsOnCurPage.data));
        
    }
};

export function fetchPageOfFreeThings(page: number) {
    return async (dispatch: ThunkDispatch<{}, {}, Action>): Promise<void> => {
        const response = await axiosThings.get(`?&orderBy="price"&equalTo="0"`, {
            transformResponse: [<T>(data: string): T[] => getArrayFromObject<T>(JSON.parse(data))],
        });
        const sortedByKeyFreeThings: Thing[] = response.data.sort((a: Thing, b: Thing) => a.key < b.key);
        dispatch(setPagesAmountOfFreeThings(Math.ceil(sortedByKeyFreeThings.length / THINGS_ON_PAGE)));
        dispatch(setCurPageOfFreeThings(page));

        const indexOfFirstThingOnPage = THINGS_ON_PAGE * (page - 1);

        dispatch(setDataOfFreeThings(sortedByKeyFreeThings.slice(indexOfFirstThingOnPage, indexOfFirstThingOnPage + THINGS_ON_PAGE)));
    }
};

export function fetchThingsByQuery(query: SearchThingsQuery) {
    return async (dispatch: ThunkDispatch<{}, {}, Action>): Promise<void> => {
        const firstLetter = query.valueOfSearchInput[0];
        let followingLetter = "";
        if (Boolean(firstLetter)) {
            followingLetter = String.fromCharCode(firstLetter.charCodeAt(0) + 1);
        }
        const response = await axiosThings.get(`?orderBy="name"&startAt="${firstLetter}"&endAt="${followingLetter}"`, {
            transformResponse: [<T>(data: string): T[] => getArrayFromObject<T>(JSON.parse(data))],
        });
        let result: Thing[] = response.data.filter((thing: Thing) => thing.name.indexOf(query.valueOfSearchInput) !== -1);
        if (query.isFree) {
            result = response.data.filter((thing: Thing) => Number(thing.price) === 0);
        }
        dispatch(setFoundThings(result));
    }
}

export function setOnlineStatus(isOnline: boolean = navigator.onLine) {
    return {
        type: SET_IS_ONLINE,
        body: isOnline,
    };
}







