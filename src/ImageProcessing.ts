//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray/Uint8ClampedArray

class ImageProcessing {


    /**
     * Accepts an image url, processes the data, and returns
     * an imageBitmap
     */
    static async createOriginalImageData(imgUrl) {
        //TODO: validate that url data is an image (image/'something')
        
        let imgFromUrl = await fetch(imgUrl);
        console.log("what is imgFromUrl", imgFromUrl)
        let imgBitmapBlob = await imgFromUrl.blob();
        console.log("what is imgBitmapBlob", imgBitmapBlob)
        let imgBitmap = await createImageBitmap(imgBitmapBlob)
        return imgBitmap;
    }

    static createImageDataFromBitmap() {
        const originalCanvas = document.getElementById('original-image') as HTMLCanvasElement;
        const context = originalCanvas.getContext('2d') as CanvasRenderingContext2D;
        const imgData = context.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
        return imgData;
    }

    static displayOriginalImage(imgData) {
        const canvas = document.getElementById('original-image') as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.scale(.5, .5)
        context.drawImage(imgData, 0, 0);

    }



    /**
     * Draw image on canvas from imgData
     */
    static displayEditedImage(imgData) {
        const canvas = document.getElementById('EditedImageCanvas-canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(imgData, 0, 0);

    }

    static changeColors(imgData, red, green, blue, contrast) {
        let data = Uint8ClampedArray.from(imgData.data);
        let redMin = 255;
        let redMax = 0;
        let greenMin = 255;
        let greenMax = 0;
        let blueMin = 255;
        let blueMax = 0;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i] > redMax) redMax = data[i];
            if (data[i] < redMin) redMin = data[i];
            if (data[i + 1] > greenMax) greenMax = data[i + 1];
            if (data[i + 1] < greenMin) greenMin = data[i + 1];
            if (data[i + 2] > blueMax) blueMax = data[i + 2];
            if (data[i + 2] < blueMin) blueMin = data[i + 2];
        }
        let redMedian = Math.floor((redMin + redMax) / 2);
        let greenMedian = Math.floor((greenMin + greenMax) / 2);
        let blueMedian = Math.floor((blueMin + blueMax) / 2);
        let contrastMod = contrast / 10

        for (let i = 0; i < data.length; i += 4) {
            let redV = data[i];
            let greenV = data[i + 1];
            let blueV = data[i + 2];

            if (redV >= redMedian) {
                data[i] = (redV + ((redV - redMedian) * contrastMod)) * (red / 100);
            } else {
                data[i] = (redV - ((redMedian - redV) * contrastMod)) * (red / 100);
            }
            if (greenV >= greenMedian) {
                data[i + 1] = (greenV + ((greenV - greenMedian) * contrastMod)) * (green / 100);
            } else {
                data[i + 1] = (greenV - ((greenMedian - greenV) * contrastMod)) * (green / 100);
            }
            if (blueV >= blueMedian) {
                data[i + 2] = (blueV + ((blueV - blueMedian) * contrastMod)) * (blue / 100);
            } else {
                data[i + 2] = (blueV - ((blueMedian - blueV) * contrastMod)) * (blue / 100);
            }
        }
        return data;
    }

    /**
     * Function to convert imgData to greyscale
     */
    static makeImageGreyScale(imgData) {
        console.log("make grey");
        console.log("what is imgData", imgData.data)
        let data = Uint8ClampedArray.from(imgData.data);
        for (let i = 0; i < data.length; i += 4) {
            let greyScaleVal =
                data[i] +
                data[i + 1] +
                data[i + 2];

            greyScaleVal = Math.floor(greyScaleVal / 3);

            for (let j = 0; j < 3; j++) {
                data[i + j] = greyScaleVal;
            }
        }
        return data;
    }

    /**
     * Function to convert imgData to sepia
     */
    static makeImageSepia(imgData) {
        console.log("make sepia");
        let data = Uint8ClampedArray.from(imgData.data)

        for (let i = 0; i < data.length; i += 4) {
            const currR = data[i];
            const currG = data[i + 1];
            const currB = data[i + 2];

            let targetR = (0.393 * currR) + (0.769 * currG) + (0.189 * currB);
            let targetG = (0.349 * currR) + (0.686 * currG) + (0.168 * currB);
            let targetB = (0.272 * currR) + (0.534 * currG) + (0.131 * currB);

            data[i] = targetR <= 255 ? targetR : 255;
            data[i + 1] = targetG <= 255 ? targetG : 255;
            data[i + 2] = targetB <= 255 ? targetB : 255;
        }

        return data;

    }
    static makeImageSorted(imgData) {
        console.log("sorting");
        let data = Uint8ClampedArray.from(imgData.data)
        let r = []
        let g = []
        let b = []
        for (let i = 0; i < data.length; i += 4) {
            r.push(data[i]);
            g.push(data[i + 1]);
            b.push(data[i + 2]);
        }
        r.sort((a, b) => a - b);
        g.sort((a, b) => a - b);
        b.sort((a, b) => a - b);
        for (let i = 0; i < data.length / 4; i++) {
            data[i * 4] = r[i];
            data[(i * 4) + 1] = g[i];
            data[(i * 4) + 2] = b[i];
        }
        console.log("what is sorted data",data);
        return data;
    }



    /**
     * Puts data of existing image in dom into the canvas element
     */
    static setInitialCanvasDisplay(originalImage: HTMLImageElement) {
        const nWidth = originalImage.naturalWidth;
        const nHeight = originalImage.naturalHeight;
        const cWidth = originalImage.clientWidth;
        const cHeight = originalImage.clientHeight;

        const canvas = document.getElementById('EditedImageCanvas-canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;

        context.scale(cWidth / nWidth, cHeight / nHeight);
        context.drawImage(originalImage, 0, 0);

        return context.getImageData(0, 0, canvas.width, canvas.height);
    }
}

export default ImageProcessing;