import React, {useCallback, useEffect, useMemo, useState} from 'react';

import ItemList from "../../shared/ui/catalog/ItemList";
import cl from "./MainPage.module.scss"
import {useFetching} from "../../shared/hooks/useFetching";
import ProductService from "../../API/ProductService";
import Loader from "../../shared/ui/loader/Loader";

const MainPage = () => {

  let [posts, setPosts] = useState([]);
  let [totalPages, setTotalPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  let [limit, setLimit] = useState(3);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await ProductService.getAllProducts(limit, currentPage);
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
  }, [currentPage])

  return (
    <div className={cl.MainPage}>
      {isPostsLoading
        ? <Loader/>
        : posts.length &&
        <ItemList
          posts={posts}
          title={"Все обяъявления"}
          handlePagination={handlePagination}
        totalPages={totalPages}
        currentPage={currentPage + 1}/>}
    </div>
  );
};

export default MainPage;