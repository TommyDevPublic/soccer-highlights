import api from '../apis/sportbat';
import { reduxForm, reset } from 'redux-form';

export const fetchVideos = () => async dispatch => {
    const response = await api.sportbat.get();

    dispatch({ type: "FETCH_VIDEOS", payload: response.data });
};