import React, { useState, useEffect } from 'react';
import './ImageEditForm.css';

function ImageEditForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [editedPixelData, setEditedPixelData] = useState([]);
    const [originalImage, setOriginalImage] = useState(undefined);
    console.log("what is editedPixelData", editedPixelData);


    useEffect(function setCanvasImageOnMount() {
        async function setCanvasImage() {
            if (originalImage !== undefined) {
                const canvas = document.getElementById("edit-canvas");
                const context = canvas.getContext('2d');
                
                context.drawImage(originalImage, 0, 0);

                let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                setEditedPixelData(imgData)
                setIsLoading(false);
            }
        }
        setCanvasImage();
    }, [originalImage])

    function imageIsLoaded(){
        setOriginalImage(document.getElementById("original-image"));
    }
    //state of original image currently in the canvas
    //state of what the edited image pixel data is

    //useEffect that populates the canvas with imagePixelData as
    //dependancy

    //function to convert to greyscale
    //reset function back to original state (bring in as prop)

    return (
        <div className='ImageEditForm'>
            <div className='ImageEditForm-original'>
                <img
                    id="original-image"
                    src='./martkov-tacocat.jpg'
                    onLoad={imageIsLoaded}
                >

                </img>
            </div>
            <div className='ImageEditForm-canvas' >
                <canvas id='edit-canvas'></canvas>
            </div>

        </div>
    );
}

export default ImageEditForm;