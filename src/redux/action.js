'use client'; 
export const FETCH_HOME_DATA = 'FETCH_HOME_DATA';
export const FETCH_HOME_DATA_SUCCESS = 'FETCH_HOME_DATA_SUCCESS';
export const FETCH_HOME_DATA_FAILURE = 'FETCH_HOME_DATA_FAILURE';

export const fetcHomeData = (data) => ({
    type: FETCH_HOME_DATA,
    payload: data,
});

export const fetcHomeDataSuccess = (data) => ({
    type: FETCH_HOME_DATA_SUCCESS,
    payload: data,
});

export const fetcHomeDataFailure = (error) => ({
    type: FETCH_HOME_DATA_FAILURE,
    payload: error,
});