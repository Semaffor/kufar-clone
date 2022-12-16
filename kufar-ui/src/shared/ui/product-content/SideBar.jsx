import React from 'react';
import cl from "./SideBar.module.scss";
import VendorInfo from "../vendor-info/VendorInfo";
import {Button} from "@mui/material";

const SideBar = ({post, vendorId}) => {
  return (
    <div className={cl.SideBar}>
      <div>
        {post.price === 0 || post.price === 'free'
          ? <span className={cl.PriceElem}>Бесплатно</span>
          : <span className={cl.PriceElem}>{post.price} р.</span>
        }

        <h1 className={cl.Title}>{post.name}</h1>
        <span className={cl.UnderTitle}>Минск</span>
        <div className={cl.UnderTitle}>{post.created}</div>
        <div className={cl.Label}>Доступно в рассрочку</div>
      </div>
      <hr/>
      <Button
        variant="contained"
        color="success"
        sx={{mb: 9, fontSize: 14, height: 40, width: "100%", borderRadius: 2}}
      >
        Написать
      </Button>
      <VendorInfo vendorId={vendorId}/>
    </div>
  );
};

export default SideBar;