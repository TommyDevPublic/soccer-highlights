import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import videoReducer from './videoReducer';
import searchVideosReducer from './searchVideosReducer';

export default combineReducers ({
    form: formReducer,
    videos: videoReducer,
    searchVideos: searchVideosReducer

});