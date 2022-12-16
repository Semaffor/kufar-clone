import React from 'react';

import cl from './Footer.module.scss';

import footer from "../../asserts/footer.png"

const Footer = () => {
    return (
        <footer className={cl}>
           <img width={1920} height={252} alt={""} src={footer}/>
        </footer>
    );
};

export default Footer;