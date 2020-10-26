import { generateId } from "../modules/generateId";
import { Thing } from "../types/types";

export const SET_THINGS_OF_USER = "SET_THINGS_OF_USER";
export const ADD_THING_OF_USER = "ADD_THING_OF_USER";
export const EDIT_THING_OF_USER = "EDIT_THING_OF_USER";

export const SET_LOGGED_OWNER = "SET_LOGGED_OWNER";
export const ADD_OWNER = "ADD_OWNER";
export const SET_IS_ONLINE = "SET_IS_ONLINE";



export const SET_ERROR = "SET_ERROR";

export const THINGS_ON_PAGE = 10;

export const SET_THINGS = "SET_THINGS";
export const SET_PAGES_AMOUNT_OF_THINGS = "SET_PAGES_AMOUNT_OF_THINGS";
export const SET_CUR_PAGE_OF_THINGS = "SET_CUR_PAGE_OF_THINGS";

export const SET_FREE_THINGS = "SET_FREE_THINGS";
export const SET_PAGES_AMOUNT_OF_FREE_THINGS = "SET_PAGES_AMOUNT_OF_FREE_THINGS";
export const SET_CUR_PAGE_OF_FREE_THINGS = "SET_CUR_PAGE_OF_FREE_THINGS";

export const SET_FOUND_THINGS = "SET_FOUND_THINGS";


export const EMPTY_OWNER = {
    id: generateId(),
    key: "",
    name: "",
    email: "",
    location: "",
    phoneNumber: "",
    avatar: ""
};