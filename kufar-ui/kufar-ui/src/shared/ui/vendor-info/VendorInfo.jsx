import React, {useEffect, useState} from 'react';
import cl from './VendorInfo.module.scss'
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../../API/UserService";
import Loader from "../loader/Loader";
import {Button} from "@mui/material";

const VendorInfo = ({vendorId}) => {
  const [vendor, setVendor] = useState();

  const [fetching, isLoading, error] = useFetching(async () => {
    const response = await UserService.findUserById(vendorId);
    setVendor(response.data);
  })

  useEffect(() => {
    fetching();
  }, [])

  const content = vendor ? <View vendor={vendor}/> : <Loader/>

  return (
    // <a className={cl.VendorInfo} onClick={() => router(`/user/${post.id}`)}>
    <div>
      {content}
    </div>
  )
}

const View = ({vendor}) => {
  return (
    <div className={cl.VendorInfo}>
      <div className={cl.VendorHead}>
        <img height={64}
             width={64}
             src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpVA58zfTIxYXdPbqzTHMYthftsevu3feT1wIEpvVgg&s"}
             alt={"avater"}
        />
        <h3>{vendor.login}</h3>
      </div>
      <span className={cl.TotalCount}>Объявлений: 22{vendor.totalAdv}</span>
      <Button
        variant="outlined"
      >
        Подписаться
      </Button>
    </div>
  )
}
export default VendorInfo;