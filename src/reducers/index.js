import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import videoReducer from './videoReducer';

export default combineReducers ({
    form: formReducer,
    videos: videoReducer

});