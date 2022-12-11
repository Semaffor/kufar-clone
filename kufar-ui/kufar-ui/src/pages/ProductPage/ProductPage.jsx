import React, {useEffect, useState} from 'react';
import {useFetching} from "../../shared/hooks/useFetching";
import ProductService from "../../API/ProductService";
import {useParams, useSearchParams} from "react-router-dom";
import Loader from "../../shared/ui/loader/Loader";
import cl from "./ProductPage.module.scss"
import MainContent from "../../shared/ui/content/MainContent";
import SideBar from "../../shared/ui/content/SideBar";

const ProductPage = () => {
  const [post, setPost] = useState(null)
  const [vendorId, setVendorId] = useState()

  const {id} = useParams();

  const [fetching, isLoading, error] = useFetching(async () => {
    const response = await ProductService.findProductById(id)
    setPost(response.data);
    setVendorId(response.data.creator.id)
  })

  useEffect(() => {
    fetching();
  }, [])

  const content = post ? <View post={post} vendorId={post?.creator?.id}/> : <Loader/>

  return (
    <div>
      {content}
    </div>
  )
};

const View = ({post, vendorId}) => {
  return (
    <div className={cl.Product}>
      <MainContent post={post}/>
      <SideBar post={post} vendorId={vendorId} />
    </div>
  );
}

export default ProductPage;