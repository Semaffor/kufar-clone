import React from 'react'
import cl from './Item.module.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserService from "../../../API/UserService";

const Item = ({post}) => {
  const router = useNavigate();

  async function favouriteChanger() {
    const userId = 1;
      const response = await UserService.changeFavouriteStatus(post.id, userId);
    console.log(response.data);
    post.isFavourite = true;
  }
  return (
    <a className={cl.Item} onClick={() => router(`/products/${post.id}`)}>
      <img
        src={"https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY5MDk1ODA3MTgxNTMxMDE4/25-american-christmas-traditions-gettyimages-487756624.jpg"}/>
      <div className={cl.Item__content}>
        <div className={cl.Line}>
          <div className={cl.Group}>
            {/*<strong>{post.id}</strong>*/}
            <strong>{post.productName}</strong>
            <div>{post.price} р.    ~ {post.priceUsd}$</div>
          </div>
          <button className={cl.FavouriteButton}>
          {post?.isFavourite
            ? <FavoriteIcon onClick={() => favouriteChanger(post)}/>
            : <FavoriteBorderIcon onClick={() => favouriteChanger(post)}/>
          }
          </button>
        </div>
        <div className={cl.Line}>
          labels
        </div>
        <div className={cl.Line}>
          <div className={cl.Group}>
            <div>{post.category != null && post.category.name}</div>
            {/*<div>{post.location}</div>*/}
            <div>Менск</div>
          </div>
          <div>{post.created}</div>
        </div>
      </div>
    </a>
  )
}
export default Item