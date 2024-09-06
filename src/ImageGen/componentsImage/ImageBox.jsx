import React from "react";

const ImageBox = (props) => {
  return (
    <>
      {props.imageResult ? (
        <div>
          <div className="imageBox">
            <img src={props.imageResult} alt={props.promptQuery} loading="lazy"/>
          </div>
          <div>
           <button className="download" > <a  download={props.promptQuery} href={props.imageResult}>
              Download
            </a></button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ImageBox;
