import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import Profile from "../pages/Profile/Profile";
import Error_404 from "../pages/Error_404";
import ProductPage from "../pages/ProductPage/ProductPage";
import CreateAdv from "../pages/CreateAdv/CreateAdv";
import UserActivation from "../shared/ui/UserActivation";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";

const AppRouter = ({searchValue}) => {
  // const routeComponents = routes.map(({path, component, exact}, key) => {
  //   <Route key={key}
  //                 path={path}
  //                 render={component}
  //                 exact={exact}/>
  // })
  return (
    <Routes>
      {/*{routeComponents}*/}
      <Route path="/products" element={<MainPage searchValue={searchValue}/>}/>
      <Route path="/products/:id" element={<ProductPage />}/>
      <Route path="/activate/user/:uuid" element={<UserActivation />}/>
      <Route path="/user/recovery" element={<ForgotPassword />}/>
      <Route path="/about" element={<Profile/>}/>
      <Route path="/create" element={<CreateAdv/>}/>
      <Route path="/404" element={<Error_404/>}/>
      <Route path="*" element={<Navigate to={"/404"}/>}/>
    </Routes>
  );
};

export default AppRouter;