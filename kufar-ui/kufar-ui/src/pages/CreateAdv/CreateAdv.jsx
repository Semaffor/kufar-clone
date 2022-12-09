import React from 'react';
import cl from './CreateAdv.module.scss'

const CreateAdv = () => {
  return (
    <div className={cl.CreateAdv}>
        <div>
          <h1>Подача объявления</h1>
          <div className={cl.CreateAdv__param}>Название товара/услуги*</div>
        </div>
        <div className={cl.Side}></div>
    </div>
  )
    ;
};

export default CreateAdv;