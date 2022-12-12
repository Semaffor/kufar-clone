import React, {useEffect, useState} from 'react';
import cl from './VendorInfo.module.scss'
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../../API/UserService";
import Loader from "../loader/Loader";
import {Button} from "@mui/material";

const VendorInfo = ({vendorId}) => {
  const [vendor, setVendor] = useState();
  const [advCount, setAdvCount] = useState(0);

  const [fetching, isLoading, error] = useFetching(async () => {
    const response = await UserService.findUserById(vendorId);
    setVendor(response.data);
  })

  const [fetching_1, loading_1, errors_1] = useFetching(async () => {
    const response = await UserService.getAdvCount(vendorId)
    setAdvCount(response.data)
  })
  useEffect(() => {
    fetching();
    fetching_1();
  }, [])

  const content = vendor ? <View vendor={vendor} advCount={advCount}/> : <Loader/>

  return (
    // <a className={cl.VendorInfo} onClick={() => router(`/user/${post.id}`)}>
    <div>
      {content}
    </div>
  )
}

const View = ({vendor, advCount}) => {
  {
    console.log(vendor)
  }

  return (
    <div className={cl.VendorInfo}>
      <div className={cl.VendorHead}>
        <img height={64}
             width={64}
             src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpVA58zfTIxYXdPbqzTHMYthftsevu3feT1wIEpvVgg&s"}
             alt={"avater"}
        />
        <div className={cl.VendorTitles}>
          <h3>{vendor.login}</h3>
          <span>Последний визит: {vendor.lastVisit}</span>
        </div>
      </div>
      <span className={cl.TotalCount}>Объявлений: {advCount}</span>
      <Button
        variant="outlined"
      >
        Подписаться
      </Button>
    </div>
  )
}
export default VendorInfo;