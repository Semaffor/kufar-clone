import React, {useState} from 'react';
import {Button, FormControl, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import Box from "@mui/material/Box";
import cl from "./Entrance.module.scss"
import KeyIcon from '@mui/icons-material/Key';
import Password from "../../shared/ui/button/Password";
import FieldWithIcon from "../../shared/ui/button/FieldWithIcon";
import {useNavigate} from "react-router-dom";

const LogIn = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const router = useNavigate()

  function logIn () {

  }

  return (
    <div className={cl.LogIn}>
      <form onSubmit={logIn}>
        <FieldWithIcon fieldTitle={"Логин/Почта"} fieldValue={login} onChangeField={setLogin}>
          <AccountCircle sx={{mr: 1, my: 0.5 }} color={'primary'} />
        </FieldWithIcon>
       <Password label={"Пароль"} password={password} onChangePassword={setPassword}/>
        <a style={{marginTop:10}}
           href={""}
           onClick={e => router('user/recovery')}
        >Забыли пароль</a>
        <Button sx={{mt: 2}}
                variant="contained"
                onClick={logIn}
        >Войти</Button>
      </form>
    </div>
  );
};

export default LogIn;