import React, {useContext, useEffect, useState} from 'react';

import cl from './Header.module.scss';
import {Button, TextField} from "@mui/material";

import fufar from '../../asserts/fufar.png';
import AvatarMenu from "./AvatarMenu";
import {useLocation, useNavigate} from "react-router-dom";
import Entrance from "../../../pages/Entrance/Entrance";
import {AuthContext} from "../../context/globalContext";


const Header = ({callback}) => {
  const router = useNavigate();
  const {user, setUser} = useContext(AuthContext)
  const location = useLocation();

  const validUrl = location.pathname === '/products'

  return (
    <header className={cl.Header}>
      <nav>
        <a onClick={() => router('/products')}>
          <img src={fufar} alt={'main_icon'}/>
        </a>

        {validUrl
          ? <TextField
            sx={{width: 400}}
            id="outlined-basic"
            label="Search..."
            size="small"
            variant="outlined"
            height={"10px"}
            onChange={e => e.target.value.length <= 20 ? callback(e) : null}
          />
          : null
        }
          <div className={cl.ThirdElem}>
            {localStorage.getItem("login") ?
              <Button
              variant="contained"
              color="success"
              sx={{height: 40, borderRadius: 2}}
              onClick={() => router('/create')}
            >
              Подать объявление
            </Button>
            : null
            }
            {localStorage.getItem("login")
              ? <AvatarMenu
                login={localStorage.getItem("login")}
                isAdmin={localStorage.getItem("isAdmin")}/>
              : <Entrance/>
            }
          </div>
          </nav>
          </header>
          );
        };

        export default Header;