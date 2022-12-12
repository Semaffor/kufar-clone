import React from 'react';
import cl from "./MainContent.module.scss";

const MainContent = ({post}) => {
  console.log(post);
  return (
    <div className={cl.MainContent}>
      {/*<PhotoCarousel width={700} height={456} photos={post.photo}/>*/}
      <img width={700} height={456}
           src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpVA58zfTIxYXdPbqzTHMYthftsevu3feT1wIEpvVgg&s"}
           alt={"product_photo"}
      />
      <h2>Характеристики</h2>
      <div className={cl.Characteristics}>
        <div className={cl.Characteristics__params}>
          <div className={cl.Characteristics__params__param}>Категория_______</div>
          <div className={cl.Characteristics__params__param}>Состояние_______</div>
        </div>
        <div className={cl.Characteristics__values}>
          <div className={cl.Characteristics__value}>{post.category.name}</div>
          <div className={cl.Characteristics__value}>Б/у</div>
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