import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Category from '../../components/Category/Category'
import Selected from '../../components/Selected/Selected'
import { getAllMovies, setModalOpen, submitVotes } from '../../redux/actions'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import s from './Home.module.css'
import Modal from '../../components/Modal/Modal'
import SearchBar from '../../components/SearchBar/SearchBar'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
  const dispatch = useDispatch()
  const { categories, movies, selected } = useSelector(state => state)
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(submitVotes())
    dispatch(setModalOpen(true))
    setOpen(true)
  };

  useEffect(() => {
    dispatch(getAllMovies())
  }, []);
  
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.slider}>
          <div className={s.imgWrapper}>
            {movies?.map((m, i) => <img key={`photo_${i}`} src={m.photoUrL}/>)}
          </div>
        </div>
        <div className={s.title}>
          <h1>Movie <strong>Awards</strong></h1>
        </div>
      </div>

      <SearchBar/>
      <div className={s.popovers}>
        <Selected/>
        <Modal/>
      </div>

      <div className={s.categories}>
        {categories?.map(c => <Category key={c} category={c}/>)}
      </div>
      {selected?.length 
        ?
          <button
            className={s.submitBtn}
            onClick={handleSubmit}
          >
            Submit Votes {`(${selected.length}/${categories.length})`}
          </button>
        : ''
      }
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully submitted!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Home