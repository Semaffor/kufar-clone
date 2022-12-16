import React, {useState} from 'react';
import KeyIcon from "@mui/icons-material/Key";
import {FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Box from "@mui/material/Box";

const Password = ({password, onChangePassword, label}) => {
  const [isShowPassword, setShowPassword] = useState(false)

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 260, mb:1}}>
      <KeyIcon sx={{mr: 1, my: 0.5 }} color={'primary'}/>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
        <Input
          type={isShowPassword ? 'text' : 'password'}
          value={password}
          onChange={e => onChangePassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!isShowPassword)}
                onMouseDown={handleMouseDownPassword}
              >
                {isShowPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default Password;