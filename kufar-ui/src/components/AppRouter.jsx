import React, {useContext, useDeferredValue, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import Profile from "../pages/Profile/Profile";
import Error_404 from "../pages/Error_404";
import ProductPage from "../pages/ProductPage/ProductPage";
import CreateAdv from "../pages/CreateAdv/CreateAdv";
import UserActivation from "../shared/ui/UserActivation";
import ForgotPassword from "../pages/ForgotPassword/forgotPassword";
import UserManagementList from "../pages/Management/UserManagement/UserManagementList";
import AdvsManagement from "../pages/Management/AdvsManagement/AdvsManagement";
import SavedQueries from "../pages/Management/SavedQueries";
import Favourites from "../pages/Management/Favorites";
import {AuthContext} from "../shared/context/globalContext";
import Error_403 from "../pages/Error_403";

const AppRouter = ({searchValue}) => {
  let {user, setUser} = useContext(AuthContext)

  const deferredValue = useDeferredValue(searchValue, {
    timeoutMs: 20000
  });

  const login = localStorage.getItem("login")

  return (
    <Routes>
      {/*{routeComponents}*/}
      <Route path="/products" element={<MainPage searchValue={deferredValue}/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/>
      <Route path="/404" element={<Error_404/>}/>
      <Route path="/403" element={<Error_403/>}/>
      <Route path="/user/recovery" element={<ForgotPassword/>}/>
      <Route path="/" element={<Navigate to={"/products"}/>}/>
      <Route path="*" element={<Navigate to={"/404"}/>}/>

      {login ? <Route path="/activate/user/:uuid" element={<UserActivation/>}/> :  <Route path="*" element={<Navigate to={"/403"}/>}/>}
      {login ? <Route path="/create" element={<CreateAdv/>}/> :  <Route path="*" element={<Navigate to={"/403"}/>}/>}
      {login ? <Route path="/management/user" element={<UserManagementList/>}/> :  <Route path="*" element={<Navigate to={"/403"}/>}/>}
      {login ? <Route path="/management/advs" element={<AdvsManagement/>}/> :  <Route path="*" element={<Navigate to={"/403"}/>}/>}
      {login ? <Route path="/queries" element={<SavedQueries/>}/> :  <Route path="*" element={<Navigate to={"/403"}/>}/>}
      {login ? <Route path="/favourite" element={<Favourites/>}/> :  <Route path="*" element={<Navigate to={"/403"}/>}/>}
      {login ? <Route path="/about" element={<Profile/>}/> :  <Route path="*" element={<Navigate to={"/403"}/>}/>}

    </Routes>
  );
};

export default AppRouter;