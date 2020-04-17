import { ADD_PHOTO, ADD_PHOTOS, REMOVE_PHOTO } from "./types";

export const addPhoto = photo => dispatch => {
  dispatch({
    type: ADD_PHOTO,
    payload: photo
  });
};

export const removePhoto = photo => dispatch => {
  dispatch({
    type: REMOVE_PHOTO,
    payload: photo
  });
};
