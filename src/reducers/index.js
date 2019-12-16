import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import videoReducer from "./videoReducer";
import searchVideosReducer from "./searchVideosReducer";
import sortVideosReducer from "./sortVideosReducer";

export default combineReducers({
  form: formReducer,
  videos: videoReducer,
  searchVideos: searchVideosReducer,
  sortVideos: sortVideosReducer
});
