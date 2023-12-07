import React from "react";

const fondo =(props) => {
    const {foto} = props;
    return(
        <img src={foto}/>
    );
};

export default fondo;