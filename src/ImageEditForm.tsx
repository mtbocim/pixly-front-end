import React, { useState, useEffect } from 'react';
import './ImageEditForm.css';

interface imageDataI{
    data:any;
    colorSpace:any;
    height: number;
    width: number;

}
/**
 * Renders an ImageEditForm component
 * 
 * State: isLoading: (bool)
 *        editedPixelData: pixel data on the canvas element 
 *              as [r1,g1,b1,s1, ...]
 *        originalImage: <HTMLImageElement> once loaded
 */

function ImageEditForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [editedPixelData, setEditedPixelData] = useState<imageDataI>(
        {
            data:undefined,
            colorSpace:undefined,
            height:0,
            width:0,
        }
    );
    const [originalImage, setOriginalImage] = useState<HTMLImageElement|undefined>(undefined);

    //console.log("what is editedPixelData", editedPixelData);
    // console.log("what is originalImage", originalImage?.naturalWidth);
    const nWidth = originalImage?.naturalWidth || 0
    const nHeight = originalImage?.naturalHeight || 0;
    
    useEffect(function setCanvasImageOnMount() {
        async function setCanvasImage() {
            if (originalImage !== undefined && editedPixelData.data === undefined) {
                const canvas = document.getElementById("edit-canvas") as HTMLCanvasElement;
                const context = canvas.getContext('2d') as CanvasRenderingContext2D;
                context.scale(originalImage.clientWidth / nWidth, originalImage.clientHeight / nHeight);
                context.drawImage(originalImage, 0, 0);
                let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                setEditedPixelData(imgData)
            }
            setIsLoading(false);
        }
        setCanvasImage();
    }, [originalImage])

    function imageIsLoaded() {
        let image = document.getElementById("original-image")
        console.log(image);
        setOriginalImage(document.getElementById("original-image") as HTMLImageElement);
    }

    function makeImageGreyScale() {
        // console.log("make grey");
        // console.log("editPixelData.data", editedPixelData.data)
        for (let i = 0; i < editedPixelData.data.length; i += 4) {
        // editedPixelData.data[i] = 0;

            let greyScaleVal =
                
                editedPixelData.data[i] +
                editedPixelData.data[i + 1] +
                editedPixelData.data[i + 2];
            greyScaleVal = Math.floor(greyScaleVal / 3);
            
            
            for (let j = 0; j < 3; j++) {
                editedPixelData.data[i + j] = greyScaleVal;
            }
        }
        console.log(editedPixelData);
        // console.log("change canvas data", editedPixelData.data)
        const canvas = document.getElementById("edit-canvas") as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(editedPixelData, 0, 0);
        setEditedPixelData(editedPixelData);
        setIsLoading(true);
    }
    //function to convert to greyscale
    //reset function back to original state (bring in as prop)

    //get dimension of source file
    //apply one time scale to canvas img display width/actual width

    return (
        <div className='ImageEditForm'>
            <button onClick={makeImageGreyScale}>Grey!</button>
            <div className='ImageEditForm-original'>
                <img
                    id="original-image"
                    // src='./martkov-tacocat.jpg'
                    src = "https://r28-pixly-app.s3.amazonaws.com/6x997o5ef868e4-c1d4-4049-bfb0-cb5734fca8ad.jpg"
                    onLoad={imageIsLoaded}
                    // must be set before image loads
                    crossOrigin="anonymous"
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