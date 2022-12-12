import React, {useContext, useState} from 'react';

import cl from './Header.module.scss';
import {Button, TextField} from "@mui/material";

import fufar from '../../asserts/fufar.png';
import AvatarMenu from "./AvatarMenu";
import {useNavigate} from "react-router-dom";
import Entrance from "../../../pages/Entrance/Entrance";
import {AuthContext} from "../../context/globalContext";


const Header = ({callback}) => {
  const router = useNavigate();
  const {user, setUser} = useContext(AuthContext)

  return (
    <header className={cl.Header}>
      <nav>
        <a onClick={() => router('/products')}>
          <img src={fufar} alt={'main_icon'}/>
        </a>
        <TextField
          id="outlined-basic"
          label="Search..."
          size="small"
          variant="outlined"
          height={"10px"}
          onChange={e => e.target.value.length <= 20 ? callback(e) : null}
        />
        <div className={cl.ThirdElem}>
          <Button
            variant="contained"
            color="success"
            sx={{height: 40, borderRadius: 2}}
            onClick={() => router('/create')}
          >
            Подать объявление
          </Button>

          {user
            ? <AvatarMenu/>
            : <Entrance/>
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;