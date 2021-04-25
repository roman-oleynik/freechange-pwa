export type Action = {
    type: string,
    body: any
};
export type Thing = {
    id: string,
    name: string,
    description: string,
    avatar: string | Blob,
    rel_Owner: string,
    price: number,
    currency: string,
    key: string
};
export type Owner = {
    id: string,
    key: string,
    name: string,
    email: string,
    location: string
    phoneNumber: string,
    avatar: string | Blob
};
export type Photo = {
    id: string,
    key: string,
    source: string | Blob,
    rel_Thing: string
};
export enum FormState {
    NotLoaded,
    Loading,
    NotSubmitted,
    Submitting,
    Submitted
}
export type SearchBarState = {
    inputValue: string,
    isChecked: boolean
};

export type SearchThingsQuery = {
    valueOfSearchInput: string,
    isFree: boolean
};
export type ThingsReduxState = {
    data: Thing[],
    pagesAmount: number,
    curPage: number,
}
export type SimpleFormData = {
    field: string,
    value: string
};
export type State = {
    loggedOwner: Owner | null,

    things: ThingsReduxState,
    freeThings: ThingsReduxState,
    foundThings: Thing[],
    
    thingsOfUser: Thing[],

    error: string,
    isOnline: boolean,
};
export type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;