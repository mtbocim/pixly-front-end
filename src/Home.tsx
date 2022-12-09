import React, {useContext} from 'react';

import TitleCard from './TitleCard';
import DisplayImageMini from './DisplayImageMini'
import imageDataContext from './imageDataContext';

function Home() {
    const imagesData = useContext(imageDataContext);
    console.log("What is home imagesData", imagesData)
    return (
        <div className="Home">
            <TitleCard></TitleCard>
            <DisplayImageMini imagesData={imagesData} />
        </div>
    )
}

export default Home;