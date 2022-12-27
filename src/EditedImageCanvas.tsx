import React, { useState, useEffect } from 'react';

function EditedImageCanvas(
    { width, height }: {

        width: number,
        height: number
    }
) {

    return (
        <div className='EditedImageCanvas'>
            <canvas
                id='EditedImageCanvas-canvas'
                width={width}
                height={height}
            >

            </canvas>
        </div>
    )

}

export default EditedImageCanvas;