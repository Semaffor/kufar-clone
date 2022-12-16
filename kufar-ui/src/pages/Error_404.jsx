import React from 'react';
import photo_404 from '../shared/asserts/404.png'
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const Error404 = () => {

  const router = useNavigate()
  return (
    <div style={{display:"flex", flexDirection: "column"}}>
      <img width={500} src={photo_404} alt={"404_error"}/>
      <Button variant="contained" color="success" onClick={() => router('/products')}>На главную</Button>
    </div>
  );
};

export default Error404;