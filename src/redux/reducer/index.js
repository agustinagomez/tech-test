import { createReducer } from "@reduxjs/toolkit";
import { GET_ALL_MOVIES, RESET, SELECT_MOVIE, SET_MODAL_OPEN, SUBMIT_VOTES, UNSELECT_MOVIE } from "../actions";

const initialState = {
    movies: [],
    selected: [],
    voted: [],
    categories: [],
    modalOpen: false
}

const rootReducer = createReducer(initialState, builder => {
    builder
        .addCase(GET_ALL_MOVIES, (state, action) => {
            const movies = action.payload.sort((a, b) => 
                a.title.toLowerCase() < b.title.toLowerCase()
                    ? -1
                    : a.title.toLowerCase() > b.title.toLowerCase()
                    ? 1
                    : 0
                );
            movies.forEach(e => {
                !state.categories.includes(e.category) && state.categories.push(e.category)
            });
            state.movies = movies
        })
        .addCase(SELECT_MOVIE, (state, action) => {
            state.selected.push(action.payload);
        })
        .addCase(UNSELECT_MOVIE, (state, action) => {
            state.selected = state.selected.filter(m => m.id !== action.payload.id);
        })
        .addCase(SUBMIT_VOTES, state => {
            state.voted = state.selected.slice();
            state.selected = [];
        })
        .addCase(SET_MODAL_OPEN, (state, action) => {
            state.modalOpen = action.payload;
        })
        .addCase(RESET, state => {
            state.voted = [];
        })
});

export default rootReducer;