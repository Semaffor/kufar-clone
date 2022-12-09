import React from 'react'
import cl from './Item.module.scss'
import {useNavigate} from "react-router-dom";

const Item = ({post, favourite}) => {
  const router = useNavigate();

  return (
    <a className={cl.Item} onClick={() => router(`/products/${post.id}`)}>
      <img
        src={"https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY5MDk1ODA3MTgxNTMxMDE4/25-american-christmas-traditions-gettyimages-487756624.jpg"}/>
      <div className={cl.Item__content}>
        <div className={cl.Line}>
          <div className={cl.Group}>
            {/*<strong>{post.id}</strong>*/}
            <strong>{post.name}</strong>
            <div>{post.price} р.</div>
          </div>
          <button onClick={() => favourite(post)}>+</button>
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