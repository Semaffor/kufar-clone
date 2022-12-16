import React from 'react';

import Item from "./Item";
import cl from "./ItemList.module.scss";
import Pagination from '@mui/material/Pagination';



const ItemList = ({posts, handlePagination, totalPages, currentPage}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center', marginTop:40, marginLeft:70, width: 800}}>Ничего не найдено</h1>
        )
    }

    return (
        <div className={cl.ItemList}>
            {posts.map((post) => <Item key={post.id} post={post} />)}
            <Pagination className={cl.Pagination} page={currentPage} count={totalPages} color="primary" onClick={handlePagination}/>
        </div>
    );
};

export default ItemList;