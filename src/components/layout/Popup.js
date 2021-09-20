import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

export default function Popup({children, ...rest}) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    !rest.inactive && setOpen(true)
  };
  const handleClose = () => {
  	rest.close();
  	setOpen(false)
  };

	return (
		<>
      <div onClick={handleOpen}>{rest.wrapper}</div>
      <Modal
        open={open}
        onClose={handleClose}
      >
      	{children}
      </Modal>
		</>
	);
}
