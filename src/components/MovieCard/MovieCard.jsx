import React from 'react'
import s from './MovieCard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectMovie, unselectMovie } from '../../redux/actions';

const MovieCard = ({movie}) => {
    const { selected, voted } = useSelector(state => state);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.target.checked
        ? dispatch(selectMovie(movie))
        : dispatch(unselectMovie(movie))
    };
    const isSelected = (movie) => {
        return selected?.some(s => s.id === movie.id)
    };
    const canSelect = (movie) => {
        return !voted?.some(v => v.category === movie.category) && !selected?.some(s => s.category === movie.category)
    }
    return (
        <div className={s.container}>
            <img src={movie.photoUrL} alt="not found" />
            <div className={s.titleContainer}>
                <h4>{movie.title}</h4>
                <input
                    type='checkbox'
                    name={movie.category}
                    checked={isSelected(movie)}
                    onChange={e => handleChange(e)}
                    disabled={
                        !isSelected(movie)
                        && selected?.some(s => s.category === movie.category)
                    }
                    id={movie.id}
                    className={s.checkbox}
                    />
                <label htmlFor={movie.id} className={`${s.selectBtn} ${!isSelected(movie) && !canSelect(movie) && s.displayNone}`}>
                    {isSelected(movie)
                        ? 'Selected'
                        : 'Select'
                    }
                </label>
            </div>
        </div>
    )
}

export default MovieCard