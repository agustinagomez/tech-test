import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { reset, setModalOpen } from '../../redux/actions';
import s from './Modal.module.css'

export default function Modal() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { voted, modalOpen } = useSelector(state => state);
  const dispatch = useDispatch();  

  const handleClickOpen = () => {
    dispatch(setModalOpen(true));
  };

  const handleClose = () => {
    dispatch(setModalOpen(false));
  };

  const handleReset = () => {
    dispatch(reset())
    dispatch(setModalOpen(false));
  };

  return (
    <div>
      <button
        className={s.submittedBtn}
        onClick={handleClickOpen}
        disabled={!voted?.length}
      >
        Submitted {`(${voted?.length || 0})`}
      </button>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle 
            sx={{fontFamily: `'Poppins', sans-serif`, fontWeight: 700, fontSize: `calc(15px + 0.4vh + 0.4vw)`}}
            id="responsive-dialog-title"
        >
          Submitted Votes
        </DialogTitle>
        <DialogContent>
          <ul className={s.votedList}>
            {voted?.map(v =>
                <li key={`${v.id}li`}>
                    <strong>{v.category}: </strong>{v.title}
                </li>
            )}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
                onClick={handleClose}
                autoFocus
                sx={{color: 'var(--secondary-color)', fontWeight: 600, fontFamily: `'Poppins', sans-serif`}}
           >
            OK
          </Button>
          <Button
                onClick={handleReset}
                autoFocus
                sx={{color: 'var(--secondary-color)', fontWeight: 600, fontFamily: `'Poppins', sans-serif`}}
           >
            RESET VOTES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
