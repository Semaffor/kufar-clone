import React from 'react';
import photo_403 from '../shared/asserts/403.png'
import photo_404 from "../shared/asserts/404.png";
import {Button} from "@mui/material";


const Error403 = () => {
  return (
    <div style={{display:"flex", flexDirection: "column"}}>
      <img width={500} src={photo_403} alt={"403_error"}/>
      <div style={{margin:10, fontWeight:30}}>Доступ ограничен</div>
      <Button variant="contained" color="success" onClick={() => router('/products')}>На главную</Button>
    </div>
  );
};

export default Error403;