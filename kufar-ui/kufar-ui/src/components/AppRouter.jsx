import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import Profile from "../pages/Profile/Profile";
import Error_404 from "../pages/Error_404";
import ProductPage from "../pages/ProductPage/ProductPage";
import {routes} from "../router/Router";
import {Switch} from "@mui/material";
import CreateAdv from "../pages/CreateAdv/CreateAdv";

const AppRouter = () => {
  // const routeComponents = routes.map(({path, component, exact}, key) => {
  //   <Route key={key}
  //                 path={path}
  //                 render={component}
  //                 exact={exact}/>
  // })
  return (
    <Routes>
      {/*{routeComponents}*/}
      <Route path="/products" element={<MainPage/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/>
      <Route path="/about" element={<Profile/>}/>
      <Route path="/create" element={<CreateAdv/>}/>
      <Route path="/404" element={<Error_404/>}/>
      <Route path="*" element={<Navigate to={"/404"}/>}/>
    </Routes>
  );
};

export default AppRouter;