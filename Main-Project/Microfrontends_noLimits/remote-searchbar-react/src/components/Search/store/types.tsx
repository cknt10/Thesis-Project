import { SearchConstants } from './constants';

export interface MoviePayload {
    title: string;
    year: number;
}

export type SearchActionPayload = {
    term: string;
}

export type SearchActionType = {
    type: typeof SearchConstants.SEARCH;
}

export type SearchAction = SearchActionPayload & SearchActionType;

type SearchSuccessAction = {
    type: typeof SearchConstants.SEARCH_SUCCESS;
    results: MoviePayload[];
}

type SearchErrorAction = {
    type: typeof SearchConstants.SEARCH_ERROR;
    results: string[];
    error: string;
}

export type SearchActionTypes = SearchAction | SearchSuccessAction | SearchErrorAction;