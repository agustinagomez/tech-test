import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { selectMovie, unselectMovie } from '../../redux/actions';
import s from './SearchBar.module.css';

const SearchBar = () => {
  const { movies, selected, voted } = useSelector(state => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    selected: false,
    unselected: false
  })

  const isSelected = (movie) => {
    return selected?.some(s => s.id === movie.id)
  };

  const canSelect = (movie) => {
    return !voted?.some(v => v.category === movie.category) && !selected?.some(s => s.category === movie.category)
  };

  const handleSelect = (item) => {
    if(!isSelected(item)){
        if(canSelect(item)){
            dispatch(selectMovie(item))
            setOpen({...open, selected: true})
        }
    } else {
        dispatch(unselectMovie(item))
        setOpen({...open, unselected: true})
    }
  };

  const handleClose = (alert) => {
    setOpen({...open, [alert]: false})
  };

  const formatResult = (item) => {
    return (
      <div className={`${s.resultWrapper} ${isSelected(item) ? s.resultSelected : !canSelect(item) && s.disabled}`}>
        <img className={s.resultPic} src={item.photoUrL} alt="not found" />
        <div className={s.resultInfo}>
          <span className={s.resultTitle}>{item.title}</span>
          <span className={s.resultCategory}>{`"${item.category}"`}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={s.container}>
         <ReactSearchAutocomplete
            items={movies}
            placeholder="Search a movie"
            fuseOptions={{ keys: ["title", "category"] }}
            resultStringKeyName="title"   
            showIcon={true}
            formatResult={formatResult}
            onSelect={handleSelect}
            styling={{
              height: "40px",
              border: "none",
              borderRadius: "15px",
              backgroundColor: "white",
              boxShadow: "none",
              hoverBackgroundColor: "rgba(255, 0, 119, 0.2)",
              color: "black",
              fontSize: "13px",
              fontFamily: "'Poppins', sans-serif",
              iconColor: "grey",
              lineColor: "var(--secondary-color)",
              placeholderColor: "grey",
              zIndex: 5,
            }}
           />
        <Snackbar key={Math.random()} open={open?.selected} autoHideDuration={4000} onClose={() => handleClose('selected')}>
            <Alert onClose={() => handleClose('selected')} severity="success" sx={{ width: '100%' }}>
                Selected!
            </Alert>
      </Snackbar>
      <Snackbar key={Math.random()} open={open?.unselected} autoHideDuration={4000} onClose={() => handleClose('unselected')}>
            <Alert onClose={() => handleClose('unselected')} severity="success" sx={{ width: '100%' }}>
                Unselected!
            </Alert>
      </Snackbar>
    </div>
  )
}

export default SearchBar