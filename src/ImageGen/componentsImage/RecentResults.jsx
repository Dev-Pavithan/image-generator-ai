// RecentResults.jsx
import React, { useEffect, useState } from "react";
import historyIcon from "../images/history.png";
import './RecentResults.css'; // Ensure the CSS file is imported for styling

const RecentResults = (props) => {
  const recentImages = JSON.parse(localStorage.getItem("genAIRecentKey"));
  const [recentImagesStored, setRecentImagesStored] = useState([]);

  const handleClick = (value) => {
    props.onSelect(value);
  };

  useEffect(() => {
    if (recentImages) {
      setRecentImagesStored(recentImages);
    }

    if (
      props.promptQuery &&
      props.imageResult &&
      recentImages &&
      !recentImages.some((local) => local.src === props.imageResult)
    ) {
      if (recentImages.length === 5) {
        recentImages.shift();
      }
      recentImages.push({
        src: props.imageResult,
        name: props.promptQuery,
      });
      localStorage.setItem("genAIRecentKey", JSON.stringify(recentImages));
      setRecentImagesStored(recentImages);
    } else if (props.promptQuery && props.imageResult && !recentImages) {
      recentImagesStored.push({
        src: props.imageResult,
        name: props.promptQuery,
      });
      localStorage.setItem(
        "genAIRecentKey",
        JSON.stringify(recentImagesStored)
      );
      setRecentImagesStored(recentImagesStored);
    }
  }, [props.promptQuery, props.imageResult]);

  return (
    <>
      {recentImagesStored.length > 0 ? (
        <>
          <div className="recentHeader">
            Recent <img src={historyIcon} width={15} height={15} alt="History Icon" />
          </div>
          <div className="recentResultsContainer">
            {recentImagesStored.map((value) => (
              <div
                key={value.src}
                className="recentImageWrapper"
                onClick={() => handleClick(value.name)}
              >
                <img
                  className="recentImage"
                  src={value.src}
                  alt={value.name}
                  loading="lazy"
                />
                <div className="imageLabel">{value.name}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default RecentResults;
