import React from 'react';
import cl from "./MainContent.module.scss";
import photo from "../../asserts/123.jpg"

const MainContent = ({post}) => {
  return (
    <div className={cl.MainContent}>
      {/*<PhotoCarousel width={700} height={456} photos={post.photo}/>*/}
      <img width={700} height={456}
           src={photo}
           alt={"product_photo"}
      />
      <h2>Характеристики</h2>
      <div className={cl.Characteristics}>
        <div className={cl.Characteristics__params}>
          <div className={cl.Characteristics__params__param}>Категория_______</div>
        </div>
        <div className={cl.Characteristics__values}>
          <div>{post.category.name} </div>
        </div>
      </div>
      <hr/>
      <h2>Описание</h2>
      <div className={cl.Description}>
        {post.description}
      </div>
    </div>
  );
};

export default MainContent;