'use client'; 
import {FETCH_HOME_DATA_FAILURE, FETCH_HOME_DATA_SUCCESS } from "./action";

const initialState = {
    success: false,
    error: null,
    data: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_DATA_SUCCESS:
      return {
        ...state,
        success: true,
        error: null,
        data: action.payload,
      };
    case FETCH_HOME_DATA_FAILURE:
      return {
        ...state,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
