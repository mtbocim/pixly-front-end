import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';

import PixlyApi from "./Api.js"

interface imagesI {
  image_url: string;
  //FILL THIS OUT WITH WHAT MATCHES DB!!!!

}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<imagesI[]>([]);

  console.log("What is imageData?", imageData);

  useEffect(function getImagesDataOnMount() {
    async function getImagesData() {
      let allImageData = await PixlyApi.getImages();
      setImageData(allImageData.images);
      setIsLoading(false)
    }
    getImagesData()
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }


  return (
    <div className="App">
      <BrowserRouter>
      {imageData.map(i=><img src={i.image_url}/>)}
      </BrowserRouter>
    </div>
  );
}

export default App;
