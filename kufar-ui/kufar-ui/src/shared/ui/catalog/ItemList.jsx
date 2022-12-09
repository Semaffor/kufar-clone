import React from 'react';

import Item from "./Item";
import cl from "./ItemList.module.scss";
import Pagination from '@mui/material/Pagination';



const ItemList = ({posts, title, favourite, handlePagination, totalPages, currentPage}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center', width: 800}}>Ничего не найдено</h1>
        )
    }
    return (
        <div className={cl.ItemList}>
            <h1>{title}</h1>
            {posts.map((post) => <Item key={post.id} post={post} remove={favourite} />)}
            <Pagination className={cl.Pagination} page={currentPage} count={totalPages} color="primary" onClick={handlePagination}/>
        </div>
    );
};

export default ItemList;