import React from 'react';
import cl from "./MyButton.module.scss";

const MyButton = ({isActive, text, callback}) => {
  return (
    <button
      className={cl.MyButton}
      style={{
        backgroundColor: isActive ? 'green' : '',
        color: isActive ? 'white' : '',
      }}
      onClick={callback}
    >{text}
    </button>
  );
};

export default MyButton;