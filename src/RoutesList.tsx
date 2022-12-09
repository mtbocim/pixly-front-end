import { Route, Routes } from "react-router-dom";
import React, { useContext } from "react";

import Home from "./Home";
import UploadImageForm from "./UploadImageForm";
import ImageEditForm from './ImageEditForm'
/**
 * Renders RoutesList component
 * 
 * State: //TODO: ?
 * Props: //TODO: ?
 * 
 * App -> RoutesList -> TitleCard
 *                      DisplayImageMini
 */

function RoutesList({uploadPhoto}:{uploadPhoto:Function}) {
    //TODO: context or state?

    return (
        <div className="RoutesList">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/upload-image" 
                    element={<UploadImageForm onSubmit={uploadPhoto}/>} 
                />
                <Route path="/edit-image" element={<ImageEditForm/>} />

            </Routes>
        </div>
    )


}

export default RoutesList;