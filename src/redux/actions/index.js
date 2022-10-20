import axios from 'axios';

export const GET_ALL_MOVIES = 'GET_ALL_MOVIES';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const UNSELECT_MOVIE = 'UNSELECT_MOVIE';
export const SUBMIT_VOTES = 'SUBMIT_VOTES';
export const SET_MODAL_OPEN ='SET_MODAL_OPEN';
export const RESET = 'RESET'

export const getAllMovies = () => {
    return function(dispatch){
        return axios.get('/')
        .then(r => {
            dispatch({
                type: GET_ALL_MOVIES,
                payload: r.data.movies
            })
        })
        .catch(e => alert(e.message))
    };
};

export const selectMovie = (movie) => {
    return function(dispatch){
        dispatch({
            type: SELECT_MOVIE,
            payload: movie
        })
    };
};

export const unselectMovie = (movie) => {
    return function(dispatch){
        dispatch({
            type: UNSELECT_MOVIE,
            payload: movie
        })
    };
};

export const submitVotes = () => {
    return function(dispatch){
        dispatch({
            type: SUBMIT_VOTES
        })
    };
};

export const setModalOpen = (boolean) => {
    return function(dispatch){
        dispatch({
            type: SET_MODAL_OPEN,
            payload: boolean
        })
    };
};

export const reset = () => {
    return function(dispatch){
        dispatch({
            type: RESET
        })
    };
};
