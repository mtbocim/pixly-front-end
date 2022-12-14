import React, { useState, useEffect } from 'react';
import './ImageEditForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

import EditedImageCanvas from './EditedImageCanvas'
import ImageProcessing from './ImageProcessing';
import Martkov from './martkov';

/**
 * Renders an ImageEditForm component
 *
 * State: isLoading: (bool)
 *        editedPixelData: pixel data on the canvas element
 *              as [r1,g1,b1,s1, ...]
 *        originalImage: <HTMLImageElement> once loaded
 */

function ImageEditForm({ deleteImage }: { deleteImage: Function }) {

    // gets url passed as state from DisplayImageMini
    const location = useLocation();
    const { url, title } = location.state;
    const [originalImage, setOriginalImage] = useState<ImageBitmap | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [editedPixelData, setEditedPixelData] = useState<ImageData[]>([]);
    const [formData, setFormData] = useState({
        red: 100,
        green: 100,
        blue: 100,
        contrast: 0,
        chainFactor: 1
    });

    const [isClicked, setIsClicked] = useState({
        red: false,
        blue: false,
        green: false,
        contrast: false
    });


    const current = editedPixelData[editedPixelData.length - 1]
    // console.log("what is original image", originalImage);
    // console.log("what is edited data 0", editedPixelData[0])
    // console.log("what is width", originalImage?.width);
    console.log("what is edited data array", editedPixelData);
    console.log("What is isClicked", isClicked);
    const navigate = useNavigate();

    useEffect(function setOriginalImageDataOnLoad() {
        async function setOriginalImageData() {
            let result = await ImageProcessing.createOriginalImageData(url);
            //console.log(result);
            setOriginalImage(result);
            setIsLoading(false);
        }
        setOriginalImageData();
    }, []);

    useEffect(function pageLoaded() {
        if (!isLoading) {
            ImageProcessing.displayOriginalImage(originalImage);
            const imgData = ImageProcessing.createImageDataFromBitmap()
            ImageProcessing.displayEditedImage(imgData);
            setEditedPixelData([...editedPixelData, imgData]);
        }
    }, [isLoading]);

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    function handleClick(evt: React.MouseEvent<HTMLInputElement>) {
        const { name } = evt.currentTarget;
        console.log("In handleClick", isClicked[name], evt.currentTarget)
        setIsClicked((clicked) => ({
            ...clicked,
            [name]: !isClicked[name]
        }))

    }

    function resetImage() {
        ImageProcessing.displayEditedImage(editedPixelData[0]);
        setEditedPixelData([...editedPixelData, editedPixelData[0]]);
        setFormData({
            red: 100,
            green: 100,
            blue: 100,
            contrast: 0,
            chainFactor: 1
        });
    }

    //Uses original image data and converts to greyscale
    function makeImageGreyScale() {
        const newPixelData =
            ImageProcessing.makeImageGreyScale(current);
        updateEditImage(newPixelData);

    }

    //Uses original image data and converts the image to sepia
    function makeImageSepia() {
        const newPixelData =
            ImageProcessing.makeImageSepia(current);
        updateEditImage(newPixelData);
    }

    //Applies Markov algorithm with a given chain factor to the image
    function makeMartkov() {
        const chainFactor = Number(formData.chainFactor);

        const pixelChain = Martkov.getPixelChains(current, chainFactor);
        // console.log("what are the chainzzzzz", pixelChain)
        const newPixelData =
            Martkov.changePixelValues(current, pixelChain, chainFactor);
        updateEditImage(newPixelData);
        
    }

    /**
     * Uses current image data, gets modified data from 
     * ImageProcessing.makeImageSorted()
     * 
     * Returns updated image data
     */
    function makeSorted() {
        const newPixelData = ImageProcessing.makeImageSorted(current);
        updateEditImage(newPixelData);
    }

    function updateColors() {
        const { red, green, blue, contrast } = formData;
        const newPixelData =
            ImageProcessing.changeColors(current, red, green, blue, contrast);
        updateEditImage(newPixelData);
    }

    function updateEditImage(newPixelData) {
        const updatedImageData =
            new ImageData(newPixelData, originalImage.width, originalImage.height, { colorSpace: 'srgb' });
        ImageProcessing.displayEditedImage(updatedImageData);


        let canUpdate = true;
        for (let key in isClicked) {
            if (isClicked[key]) {
                canUpdate = false;
                break;
            }
        }
        if (canUpdate) {
            console.log("did I get here?????????")
            setEditedPixelData([...editedPixelData, updatedImageData]);
        }
    }

    async function handleDeleteImage() {

        try {
            const result = await deleteImage(url);
            navigate('/')
            console.log("success, result is: ", result)
        } catch (err: any) {
            console.log("delete error", err);
        }

    }
    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }


    return (
        <div className='ImageEditForm'>

            {/* <button onClick={handleDeleteImage}>Delete!</button> */}
            <button onClick={resetImage}>Reset</button>
            <button onClick={makeImageGreyScale}>Grey!</button>
            <button onClick={makeImageSepia}>Sepia!</button>
            <div>

                <button onClick={makeMartkov}>Martkov!</button>
                <label>
                    Chain factor:
                    <input
                        type="range"
                        min="1"
                        max="5"
                        name="chainFactor"
                        value={formData.chainFactor}
                        onChange={handleChange}
                        step="1"
                    >
                    </input>
                </label>
            </div>

            <button onClick={makeSorted}>Sorted Image!</button>

            <label>
                Red %:
                <input
                    type="range"
                    name="red"
                    value={formData.red}
                    onMouseDown={handleClick}
                    onMouseUp={handleClick}
                    onChange={handleChange}
                    onInput={updateColors}


                    step='5'
                />
            </label>
            <label>
                Green %:
                <input
                    type="range"
                    name="green"
                    value={formData.green}
                    onChange={handleChange}
                    onInput={updateColors}
                    onMouseDown={handleClick}
                    onMouseUp={handleClick}
                    step='5'
                />
            </label>
            <label>
                Blue %:
                <input
                    type="range"
                    name="blue"
                    value={formData.blue}
                    onChange={handleChange}
                    onInput={updateColors}
                    onMouseDown={handleClick}
                    onMouseUp={handleClick}
                    step='5'
                />
            </label>
            <label>
                Contrast:
                <input
                    type="range"
                    name="contrast"
                    value={formData.contrast}
                    min='-10'
                    max='10'
                    onChange={handleChange}
                    onInput={updateColors}
                    onMouseDown={handleClick}
                    onMouseUp={handleClick}
                />
            </label>
            <div className="imagesDisplay">
                <div className='ImageEditForm-original'>
                    <canvas
                        id="original-image"
                        width={Math.floor(originalImage.width)}
                        height={Math.floor(originalImage.height)}
                    />

                </div>
                <div className='ImageEditForm-edit'>
                    <EditedImageCanvas
                        width={Math.floor(originalImage.width)}
                        height={Math.floor(originalImage.height)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageEditForm;
