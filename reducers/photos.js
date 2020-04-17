import { ADD_PHOTO, ADD_PHOTOS, REMOVE_PHOTO } from "../actions/types";

const initialState = {
  photos: []
};

export default function photos(state = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO: {
      console.log("add photo");
      return {
        photos: [...state.photos, action.payload]
      };
    }
    case ADD_PHOTOS: {
      console.log("add photos");
      return {
        ...state,
        photos: [...state.photos, action.payload]
      };
    }
    case REMOVE_PHOTO: {
      console.log("remove photo");
      return {
        ...state,
        photos: state.photos.filter(photo => photo !== action.payload)
      };
    }
    default:
      return state;
  }
}
