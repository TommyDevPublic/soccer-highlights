
import {
   SEARCH_VIDEOS,
   CLEAR_SEARCH
} from '../actions/types';


export default ( state = {}, action) => {
    switch (action.type) {
        case SEARCH_VIDEOS:
            return {...state, ...action.payload};

        case CLEAR_SEARCH:
            return {...state, ...action.payload};

        default:
            return state;
    }
}