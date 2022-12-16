import Header from "../shared/ui/z_header/Header";
import Container from "../shared/ui/container/Container";
import Footer from "../shared/ui/zz_footer/Footer";
import {BrowserRouter} from "react-router-dom";
import "./index.scss";
import AppRouter from "../components/AppRouter";
import {useState} from "react";
import {AuthContext} from "../shared/context/globalContext";

function App() {
  const [search, setSearch] = useState()
  const [user, setUser] = useState(null)

  //TODO timeout
  function onChangeSearch(e) {
    // setTimeout(8000)
    setSearch(e.target.value)
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
      <BrowserRouter>
        <Header callback={onChangeSearch} />
        <Container>
          <AppRouter searchValue={search}/>
        </Container>
        <Footer/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
