import {
   SORT_VIDEOS
} from '../actions/types';


export default ( state = {}, action) => {
    switch (action.type) {
        case SORT_VIDEOS:
            return {...state, ...action.payload};
        default:
            return state;
    }
}