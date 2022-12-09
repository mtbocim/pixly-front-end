import React, { useState, useEffect } from 'react';
import './ImageEditForm.css';

function ImageEditForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [editedPixelData, setEditedPixelData] = useState([]);
    const [originalImage, setOriginalImage] = useState(undefined);
    console.log("what is editedPixelData", editedPixelData);
    console.log("what is originalImage", originalImage?.naturalWidth);
    const nWidth = originalImage?.naturalWidth || 0
    const nHeight = originalImage?.naturalHeight || 0;
    useEffect(function setCanvasImageOnMount() {
        async function setCanvasImage() {
            if (originalImage !== undefined) {
                const canvas = document.getElementById("edit-canvas");
                const context = canvas.getContext('2d');
                context.scale(originalImage.clientWidth/nWidth, originalImage.clientHeight/nHeight);
                context.drawImage(originalImage, 0, 0);

                let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                setEditedPixelData(imgData)
                setIsLoading(false);
            }
        }
        setCanvasImage();
    }, [originalImage])

    function imageIsLoaded(){
        let image = document.getElementById("original-image")
        console.log(image);
        setOriginalImage(document.getElementById("original-image"));
    }

    //function to convert to greyscale
    //reset function back to original state (bring in as prop)

    //get dimension of source file
    //apply one time scale to canvas img display width/actual width

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
                <canvas id='edit-canvas' width={nWidth} height={nHeight}></canvas>
            </div>

        </div>
    );
}

export default ImageEditForm;