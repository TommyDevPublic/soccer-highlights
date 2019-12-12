import api from '../apis/sportbat';

import {
    FETCH_VIDEOS
} from './types';

export const fetchVideos = () => async dispatch => {

    const response = await api.get();
    dispatch({ type: FETCH_VIDEOS, payload: response.data });
};

export const searchVideos = (formValues, videos) => async dispatch => {

    console.log('formvalues and videos',formValues, videos);

};


