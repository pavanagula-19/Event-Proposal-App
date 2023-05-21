import React from "react";

export default function ImagePreview({preview}) {

    return <>
        <div id="preview-img-container">
            <img src={preview} alt="preview" />
        </div>
    </>
    
}