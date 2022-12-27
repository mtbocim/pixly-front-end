
class Martkov {

   /** Accept an array of items and randomly choose and return one. */
   static choice(items) {
      try {
         return items[Math.floor(Math.random() * items.length)]
      }
      catch (err) {
         console.log(items);
      }
   }

   /**
    * Accepts imgData from an image. Creates a chain of values of 
    * [r,g,b,a] x chainFactor # of pixels
    * (r,g,b,a) creates a string to use as a key value 'rgbargba'
    * 
    * Returns and object { rgba: [rgba],...}
    */
   static getPixelChains(imgData, chainFactor = 2) {
      console.log("start time is: ", new Date());
      let data = Uint8ClampedArray.from(imgData.data);

      let pixelChain = {};

      for (let i = 0; i < data.length - (4 * chainFactor); i += 4) {
         let current = data.slice(i, i + (4 * chainFactor)).join(',');
         let value = data
            .slice(i + (4 * chainFactor), i + (4 * chainFactor) + 4)
            .join(',')

         if (pixelChain[current] === undefined) {
            pixelChain[current] = [value];
         } else {
            pixelChain[current].push(value);
         }
      }



      //console.log("what is pixelChain?", pixelChain);
      return pixelChain;
   }

   /**Accepts image data.
    * Rewrites the image data based on the randomly selected chain values
    * and then returns the data.
    */
   static changePixelValues(imgData, pixelChain, chainFactor = 2) {
      let data = Uint8ClampedArray.from(imgData.data);
      let key = data.slice(0, 4 * chainFactor).join(',')
      
      for (let i = 0; i < data.length - 4; i += 4) {
         let nextPixel = this.choice(pixelChain[key]);
         // if (i < 20) {
         //    console.log("what is key ", key, "and next pixel?", nextPixel);
         // }
         if (nextPixel === undefined) {
            console.log("reached the end at: ", i);
            break;
         }

         if (key.split(',').length > 4) {
            key = key.split(',').slice(4).join(',') + ',' + nextPixel;
         } else {
            key = nextPixel;
         }
         
         for (let j = 0; j < 4; j++) {
            data[i + j] = Number(nextPixel.split(',')[j]);
         }
      }
      console.log("end time is: ", new Date())
      return data;


   }
}

export default Martkov;
/*
Things to play around with/ideas:

Which way to read the image data (backward, forward, up, down)
Should the end of the line denote the start of a new chain?
Is there a clean algorithmic way to extend the number of pixels used
    as the base? (instead of bi, tri, quad, etc)


*/


// Original version of making the chains, written for 2 at a time
      // for (let i = 0; i < data.length - 4; i += 4) {

      //    let pixelOne = `${data[i + 0]}`;
      //    let pixelTwo = `${data[i + 4]}`;
      //    let pixelThree = `${data[i + 8]}`;
      //    for (let j = 1; j < 4; j++) {
      //       pixelOne += `,${data[i + 0 + j]}`;
      //       pixelTwo += `,${data[i + 4 + j]}`;
      //       if (pixelThree !== undefined) {
      //          pixelThree += `,${data[i + 8 + j]}`;
      //       }
      //    }
      //    // if(i<10){
      //    //     console.log(pixelOne,pixelTwo,pixelThree);
      //    // }
      //    let pixelBigram = `${pixelOne},${pixelTwo}`;
      //    let nextPixel = pixelThree;

      //    if (pixelBigram in pixelChain) {
      //       pixelChain[pixelBigram].push(nextPixel);
      //    } else {
      //       pixelChain[pixelBigram] = [nextPixel];
      //    }
      // }

      //Then:

      // for (let i = 0; i < data.length - 4; i += 4) {
      //    let vals = key.split(",");
      //    let nextPixel = this.choice(pixelChain[key]);
      //    if (nextPixel === undefined) {
      //       console.log("reached the end at: ", i);
      //       break;
      //    }
      //    let pixelOne = `${vals[4]},${vals[5]},${vals[6]},${vals[7]}`
      //    key = `${pixelOne},${nextPixel}`
      //    data[i] = Number(vals[0]);

      //    data[i + 1] = Number(vals[1]);

      //    data[i + 2] = Number(vals[2]);

      //    data[i + 3] = Number(vals[3]);
      // }
      // return data;