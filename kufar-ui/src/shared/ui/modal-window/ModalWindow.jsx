import React from 'react';
import {Button, Modal} from "@mui/material";

const ModalWindow = ({children}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={{ml:5, height:40, border: "3px solid grey"}}
        onClick={handleOpen}>Войти</Button>
      <Modal
        sx={{border: 0}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalWindow;