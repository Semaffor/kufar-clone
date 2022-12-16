import React from 'react'
import cl from './Item.module.scss'
import sl from '../product-content/SideBar.module.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserService from "../../../API/UserService";

const Item = ({post}) => {
  const router = useNavigate();

  async function favouriteChanger() {
    const userId = 1;
      const response = await UserService.changeFavouriteStatus(post.id, userId);
    console.log(response.data);   //favourite
    post.isFavourite = true;
  }
  return (
    <div className={cl.ItemWrapper}>
    <a className={cl.Item} onClick={() => router(`/products/${post.id}`)}>
      {console.log(post)}
      <img
        src={"https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY5MDk1ODA3MTgxNTMxMDE4/25-american-christmas-traditions-gettyimages-487756624.jpg"}/>
      <div className={cl.Item__content}>
        <div className={cl.Line}>
          <div className={cl.Group}>
            <strong>{post.productName}</strong>
            {post.price === 0 || post.price === 'free'     //проверить
              ? <div>Бесплатно</div>
              : <div>{post.price} р.    ~ {post.priceUsd}$</div>
            }
          </div>
          <button className={cl.FavouriteButton}>
          {post?.isFavourite
            ? <FavoriteIcon onClick={() => favouriteChanger(post)}/>
            : <FavoriteBorderIcon onClick={() => favouriteChanger(post)}/>
          }
          </button>
        </div>
        <div className={cl.Line}>
          {post.exchanged
            ? <div className={sl.Label}>Доступно в рассрочку</div>
            : null
          }
        </div>
        <div className={cl.Line}>
          <div className={cl.Group}>
            <div>{post.category != null && post.category.name}</div>
            {/*<div>{post.location}</div>*/}
            <div>Минск</div>
          </div>
          <div>{post.created}</div>
        </div>
      </div>
    </a>
    </div>
  )
}
export default Item