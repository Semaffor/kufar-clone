import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../../API/UserService";
import {useFetching} from "../hooks/useFetching";
import Loader from "./loader/Loader";

const UserActivation = () => {
  const router = useNavigate()
  const {uuid} = useParams()
  const [isActivated, setActivated] = useState()

  const [fetching, isLoading, errors] = useFetching(async () => {
    const response = await UserService.activateUser(uuid);
    setActivated(response.data)
  })

  useEffect(() => {
    fetching();
  }, [])

  return (
    <div>
      {isLoading
      ? <Loader/>
      : router('/products?activation=' + isActivated)}
    </div>
  );
};

export default UserActivation;