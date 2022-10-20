import React, {useState} from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
import s from './Selected.module.css'

export default function Selected() {
  const [anchorEl, setAnchorEl] = useState(null);
  const {selected, categories} = useSelector(state => state);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <button className={s.selectedBtn} disabled={!selected?.length} aria-describedby={id} variant="contained" onClick={handleClick}>
        Selected {`(${selected?.length || 0})`}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{'& .MuiPopover-paper': {backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)'}}}
      >
        <ul className={s.selectedContainer}>
            {selected?.map(s =>
                <li key={`li_${s.id}`}><strong>{s.category}: </strong>{s.title}</li>
            )}
        </ul>
      </Popover>
    </div>
  );
}
