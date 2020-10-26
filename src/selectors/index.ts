import { createSelector } from "reselect";
import { Owner, State, Thing, ThingsReduxState } from "../types/types";

export function loggedOwnerSelector(state: State): Owner | null {
    return state.loggedOwner;
}
export function thingsOfUserSelector(state: State): Thing[] {
    return state.thingsOfUser;
}
export function stateOfThingsSelector(state: State): ThingsReduxState {
    return state.things;
}
export function stateOfFreeThingsSelector(state: State): ThingsReduxState {
    return state.freeThings;
}
export function foundThingsSelector(state: State): Thing[] {
    return state.foundThings;
}

export const amountOfPagesOfThingsSelector = createSelector(
    [stateOfThingsSelector],
    (thingsData: ThingsReduxState) => thingsData.pagesAmount
);
export const curPageOfThingsSelector = createSelector(
    [stateOfThingsSelector],
    (thingsData: ThingsReduxState) => thingsData.curPage
);
export const thingsPageDataSelector = createSelector(
    [stateOfThingsSelector],
    (thingsData: ThingsReduxState) => thingsData.data
);

export const amountOfPagesOfFreeThingsSelector = createSelector(
    [stateOfFreeThingsSelector],
    (thingsData: ThingsReduxState) => thingsData.pagesAmount
);
export const curPageOfFreeThingsSelector = createSelector(
    [stateOfFreeThingsSelector],
    (thingsData: ThingsReduxState) => thingsData.curPage
);
export const freeThingsPageDataSelector = createSelector(
    [stateOfFreeThingsSelector],
    (thingsData: ThingsReduxState) => thingsData.data
);