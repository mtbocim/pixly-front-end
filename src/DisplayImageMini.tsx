import React, { useState, useEffect } from 'react';
import './DisplayImageMini.css';

interface imagesI {
    image_url: string;
    title: string;
    description: string;
    uploaded_by: string;
    //TODO: FILL THIS OUT WITH WHAT MATCHES DB!!!!

}

/**
 * Renders a DisplayImageMini component
 * 
 * State: ?
 * Props: imageData: <imagesI>
 * 
 * App -> //TODO:
 */
function DisplayImageMini({ imagesData }: { imagesData: imagesI[] }) {
    return (
        <div className='DisplayImageMini'>
            {
                imagesData.map((i, idx) =>
                    <div className="DisplayImageMini-image">
                        <label>
                            Title: {i.title}
                            <img key={idx} src={i.image_url} />
                        </label>
                        <p>Description: {i.description}</p>
                        <p>Uploaded by: {i.uploaded_by}</p>
                    </div>
                )
            }
        </div>
    );
}

export default DisplayImageMini;