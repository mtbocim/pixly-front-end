import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                imagesData.map((i) =>
                    <div key={i.image_url} className="DisplayImageMini-image">
                        <label>
                            Title: {i.title}
                            <Link to='/edit-image' state={{url: i.image_url, title:i.title}}>
                                <img key={i.image_url} src={i.image_url} alt={i.title} />
                            </Link>
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