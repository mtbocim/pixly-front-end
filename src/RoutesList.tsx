import { Route, Routes } from "react-router-dom";
import React, { useContext } from "react";

function RoutesList(){
    //TODO: context or state?

    return (
        <div className = "RoutesList">
            <Routes>
            <Route path="/images" element={''} />
            
            <Route path="/snacks" element={''} />

         </Routes>
        </div>
    )
    

}

export default RoutesList;