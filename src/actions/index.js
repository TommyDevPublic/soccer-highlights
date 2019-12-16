import api from "../apis/sportbat";

import {
  FETCH_VIDEOS,
  SEARCH_VIDEOS,
  CLEAR_SEARCH,
  SORT_VIDEOS
} from "./types";

export const fetchVideos = () => async dispatch => {
  const response = await api.get();
  dispatch({ type: FETCH_VIDEOS, payload: response.data });
};

export const searchVideos = formValues => async dispatch => {
  dispatch({ type: SEARCH_VIDEOS, payload: formValues });
};

export const clearSearch = () => async dispatch => {
  const searchParams = { title: null, event: null, date: null, terms: null };
  dispatch({ type: CLEAR_SEARCH, payload: searchParams });
};

export const sortVideos = sort => async dispatch => {
  dispatch({ type: SORT_VIDEOS, payload: sort });
};
