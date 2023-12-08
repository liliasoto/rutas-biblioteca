/*
--EQUIPO
- Lilia Soto Llamas 20460040
- Max Yahir Rodríguez González 20460278
- Ramses Patiño Cortés 20460181
*/

import React from "react";

const fondo =(props) => {
    const {foto} = props;
    return(
        <img src={foto}/>
    );
};

export default fondo;