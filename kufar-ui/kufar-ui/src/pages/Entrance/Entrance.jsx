import React, {useContext, useState} from 'react';
import {Button, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {AuthContext} from "../../shared/context";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ModalWindow from "../../shared/ui/modal-window/ModalWindow";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import useScript from "../../shared/hooks/useScript";

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const Entrance = () => {
  const {user, setUser} = useContext(AuthContext)
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ModalWindow>
      <Box sx={style}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList centered onChange={handleChange}>
              <Tab label="Авторизация" value="1" />
              <Tab label="Регистрация" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={{padding: "30px 0 0 0"}} value="1"><LogIn/></TabPanel>
          <TabPanel sx={{padding: "30px 0 0 0"}} value="2"><SignUp/></TabPanel>
        </TabContext>
      </Box>
    </ModalWindow>
  );
};

export default Entrance;