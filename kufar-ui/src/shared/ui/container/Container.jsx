import React from 'react';

import cl from './Container.module.scss'

const Container = ({children}) => {
    return (
        <div className={cl.Container}>
            {children}
        </div>
    );
};

export default Container;