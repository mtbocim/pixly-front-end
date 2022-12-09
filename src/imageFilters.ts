
class ImageFilters {
    static makeImageGreyScale(pixelData) {
        console.log("make grey");

        for (let i = 0; i < pixelData.data.length; i += 4) {
            let greyScaleVal =
                pixelData.data[i] +
                pixelData.data[i + 1] +
                pixelData.data[i + 2];

            greyScaleVal = Math.floor(greyScaleVal / 3);

            for (let j = 0; j < 3; j++) {
                pixelData.data[i + j] = greyScaleVal;
            }
        }
        return pixelData;
    }


    static setCanvasDisplay(pixelData) {
        const canvas = document.getElementById("edit-canvas") as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(pixelData, 0, 0);

    }

    static setInitialCanvasDisplay(originalImage:HTMLImageElement) {
        const nWidth = originalImage.naturalWidth;
        const nHeight = originalImage.naturalHeight;
        const cWidth = originalImage.clientWidth;
        const cHeight = originalImage.clientHeight;

        const canvas = document.getElementById("edit-canvas") as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;

        context.scale(cWidth / nWidth, cHeight / nHeight);
        context.drawImage(originalImage, 0, 0);

        return context.getImageData(0, 0, canvas.width, canvas.height);
    }
}

export default ImageFilters;