import React, {useMemo, useState} from 'react';

import ItemList from "../../shared/ui/catalog/ItemList";
import cl from "./MainPage.module.scss"
import {useFetching} from "../../shared/hooks/useFetching";
import ProductService from "../../API/ProductService";
import Loader from "../../shared/ui/loader/Loader";
import {useSearchParams} from "react-router-dom";
import {Alert} from "@mui/material";



const MainPage = ({searchValue}) => {

  let [posts, setPosts] = useState({});
  let [totalPages, setTotalPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  let [limit, setLimit] = useState(3);
  const [searchParams] = useSearchParams();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await ProductService.getAllProducts(limit, currentPage, searchValue);
    console.log(response.data.products)
    setPosts(response.data.products)
    setTotalPages(response.data.totalPages)
    setCurrentPage(response.data.currentPage)
  })


  const handlePagination = (e) => {
    setCurrentPage(parseInt(e.target.textContent) - 1)
  }

  useMemo(() => {
    fetchPosts()
  }, [currentPage, searchValue])

  let title = searchValue ? "Все объявления по запросу: " + searchValue : "Все объявления"
  return (
    <div className={cl.MainPage}>

      {searchParams.get('activation') !== null
        ? <MyAlert isActivationSuccessful={searchParams.get('activation')}/>
        : <div/>
      }

      <h1>{title}</h1>
      {isPostsLoading
        ? <Loader/>
        : posts.length &&
        <ItemList
          posts={posts}
          handlePagination={handlePagination}
          totalPages={totalPages}
          currentPage={currentPage + 1}/>
      }
    </div>
  );
};

const MyAlert = ({isActivationSuccessful}) => {
  return (
    <div>
      {isActivationSuccessful
        ? <Alert severity="success">Аккаунт активирован.</Alert>
        : <Alert severity="error">Аккаунт не активирован: неверный код.</Alert>
      }
    </div>
  )
}
export default MainPage;