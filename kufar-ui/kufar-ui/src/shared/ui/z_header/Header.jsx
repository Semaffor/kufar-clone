import React from 'react';

import cl from './Header.module.scss';
import {Button, TextField} from "@mui/material";

import fufar from '../../asserts/fufar.png';
import * as PropTypes from "prop-types";
import AvatarMenu from "./AvatarMenu";
import {useNavigate} from "react-router-dom";

function PopupState(props) {
  return null;
}

PopupState.propTypes = {
  popupId: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.func
};
const Header = () => {
  const router = useNavigate();

  return (
    <header className={cl.Header}>
      <nav>
        <img src={fufar} alt={'main_icon'}/>
        <TextField
          id="outlined-basic"
          label="Search..."
          size="small"
          variant="outlined"
          height={"10px"}/>
        <div className={cl.ThirdElem}>
          <Button
            variant="contained"
            color="success"
            sx={{height: 40, borderRadius: 2}}
            onClick={() => router('create')}
          >
            Подать объявление
          </Button>
          <AvatarMenu/>
        </div>
      </nav>
    </header>
  );
};

export default Header;