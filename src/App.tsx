import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';

import PixlyApi from "./Api.js"
import NavBar from "./NavBar";
import UploadImageForm from "./UploadImageForm";
import DisplayImageMini from "./DisplayImageMini";
import RoutesList from './RoutesList';
import imageDataContext from './imageDataContext';

interface imagesI {
  image_url: string;
  title: string;
  description: string;
  uploaded_by: string;
  //TODO: FILL THIS OUT WITH WHAT MATCHES DB!!!!

}

/**
 *  Renders the Pixly App component
 * 
 *  State: isLoading: (bool)
 *         imagesData: [{imageData}, ...]
 *         where imageData is:
 *            {
 *              image_url,
 *              title,
 *              description,
 *              uploadedBy
 *            }
 *  Props: none
 * 
 *  App -> RoutesList
 */

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imagesData, setImagesData] = useState<imagesI[]>([]);

  console.log("What is imagesData?", imagesData);

  useEffect(function getImagesDataOnMount() {
    async function getImagesData() {
      let allImageData = await PixlyApi.getImages();
      setImagesData(allImageData.images);
      setIsLoading(false)
    }
    getImagesData()
  }, [isLoading]);


  async function uploadPhoto(formData, selectedFile) {
    console.log(formData);
    console.log(selectedFile);

    const result = await PixlyApi.uploadImage(selectedFile, formData);
    console.log("what is result of submission", result);
    setIsLoading(true);
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <imageDataContext.Provider value={imagesData}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <main>
            <RoutesList uploadPhoto={uploadPhoto}/>
          </main>
        </BrowserRouter>
      </div>
    </imageDataContext.Provider>
  );
}

export default App;
