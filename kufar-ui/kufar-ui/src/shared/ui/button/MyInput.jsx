import React from 'react';
import {InputAdornment, OutlinedInput, TextField} from "@mui/material";
import cl from "./MyInput.module.scss"

const MyInput = ({value = "", placeholder, callback}) => {
  return (
   <input
     className={cl.Input}
     placeholder={placeholder}
     onChange={e => callback(e.target.value)}
     value={value}
   />
  );
};

export default MyInput;