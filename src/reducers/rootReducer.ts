import {Action, State, ThingsReduxState} from '../types/types';
import {combineReducers} from 'redux';
import { Thing, Owner } from '../types/types';
import {
    SET_THINGS,
    SET_LOGGED_OWNER,
    SET_ERROR,
    SET_THINGS_OF_USER,
    SET_IS_ONLINE,
    SET_PAGES_AMOUNT_OF_THINGS,
    SET_CUR_PAGE_OF_THINGS,
    SET_FREE_THINGS,
    SET_CUR_PAGE_OF_FREE_THINGS,
    SET_PAGES_AMOUNT_OF_FREE_THINGS,
    SET_FOUND_THINGS, ADD_THING_OF_USER, EDIT_THING_OF_USER
} from '../constants/constants';


function loggedOwnerReducer(state: Owner | null = null, action: Action) {
    switch(action.type) {
        case SET_LOGGED_OWNER:
            return action.body;
        default:
            return state;
    }
};


function errorReducer(state: string = "", action: Action) {
    switch(action.type) {
        case SET_ERROR:
            return action.body;
        default:
            return state;
    }
}


const initialStateOfThings: ThingsReduxState = {
    data: [],
    pagesAmount: 1,
    curPage: 1,
}
function thingsReducer(state: ThingsReduxState = initialStateOfThings, action: Action) {
    switch(action.type) {
        case SET_THINGS:
            return {...state, data: action.body};
        case SET_PAGES_AMOUNT_OF_THINGS:
            return {...state, pagesAmount: action.body};
        case SET_CUR_PAGE_OF_THINGS:
            return {...state, curPage: action.body};
        default:
            return state;
    }
}

const initialStateOfFreeThings: ThingsReduxState = {
    data: [],
    pagesAmount: 1,
    curPage: 1,
}
function freeThingsReducer(state: ThingsReduxState = initialStateOfFreeThings, action: Action) {
    switch(action.type) {
        case SET_FREE_THINGS:
            return {...state, data: action.body};
        case SET_PAGES_AMOUNT_OF_FREE_THINGS:
            return {...state, pagesAmount: action.body};
        case SET_CUR_PAGE_OF_FREE_THINGS:
            return {...state, curPage: action.body};
        default:
            return state;
    }
}

function foundThingsReducer(state: Thing[] = [], action: Action) {
    switch(action.type) {
        case SET_FOUND_THINGS:
            return [...action.body];
        default:
            return state;
    }
}


function thingsOfUserReducer(state: Thing[] = [], action: Action) {
    switch(action.type) {
        case SET_THINGS_OF_USER:
            return [...action.body];
        case ADD_THING_OF_USER:
            return [...state, action.body];
        case EDIT_THING_OF_USER:
            const indexOfEditedThing = state.findIndex(el => el.id === action.body.id);
            const result = [...state];
            result[indexOfEditedThing] = action.body;
            return result;
        default:
            return state;
    }
}

function isOnlineReducer(state: boolean = false, action: Action) {
    switch(action.type) {
        case SET_IS_ONLINE:
            return action.body;
        default:
            return state;
    }
}


export const rootReducer = combineReducers<State>({
    loggedOwner: loggedOwnerReducer,
    things: thingsReducer,
    freeThings: freeThingsReducer,
    foundThings: foundThingsReducer,

    thingsOfUser: thingsOfUserReducer,

    error: errorReducer,
    isOnline: isOnlineReducer,
});