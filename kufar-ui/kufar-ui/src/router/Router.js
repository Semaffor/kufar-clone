import MainPage from "../pages/MainPage/MainPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import Profile from "../pages/Profile/Profile";
import Error_404 from "../pages/Error_404";

export const routes = [
  {path:"/products", component: MainPage, exact:true},
  {path:"/products/:id", component: ProductPage, exact:true},
  {path:"/about", component: Profile, exact:true},
  {path:"/404", component: Error_404, exact:true},
]