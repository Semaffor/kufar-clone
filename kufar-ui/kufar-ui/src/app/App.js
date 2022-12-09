import Header from "../shared/ui/z_header/Header";
import Container from "../shared/ui/container/Container";
import Footer from "../shared/ui/zz_footer/Footer";
import MainPage from "../pages/MainPage/MainPage";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import "./index.scss";
import AppRouter from "../components/AppRouter";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Container>
        <AppRouter/>
      </Container>
      <Footer/>
      <Link to={"/products"}>Main</Link>
      <Link to={"/about"}>About</Link>
    </BrowserRouter>
  );
}

export default App;
