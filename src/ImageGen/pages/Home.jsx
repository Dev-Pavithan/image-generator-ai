// Home.jsx
import React, { useState, useEffect } from "react";
import ImageBox from "../componentsImage/ImageBox";
import { fetchImages } from "../services/model-api";
import { getRandom, loaderMessages, promptIdeas } from "../utilities/utils";
import RecentResults from "../componentsImage/RecentResults";
import './ImageHome.css';

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [promptQuery, setPromptQuery] = useState("");
  const [radioValue, setRadioValue] = useState("20");
  const [dropDownValue, setDropDownValue] = useState("DDIM");
  const [seedValue, setSeedValue] = useState(17123564234);
  const [loaderMessage, setLoaderMessage] = useState(loaderMessages[0]);

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderMessage(getRandom(loaderMessages));
    }, 3000);
    return () => {
      clearInterval(loaderInterval);
    };
  }, [loaderMessage]);

  const handleSearch = (event) => {
    setPromptQuery(event.target.value);
  };

  const handleChange = (event) => {
    if (event.target.name === "radio") {
      setRadioValue(event.target.value);
    } else if (event.target.name === "dropdown") {
      setDropDownValue(event.target.value);
    } else {
      setSeedValue(event.target.value);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      setShowLoader(true);

      const imageBlob = await fetchImages(
        promptQuery,
        seedValue,
        dropDownValue,
        radioValue
      );

      if (!imageBlob) {
        throw new Error("Image Blob is null or undefined. Cannot read as Data URL.");
      }

      const fileReaderInstance = new FileReader();
      fileReaderInstance.onload = () => {
        let base64data = fileReaderInstance.result;
        setImageResult(base64data);
      };

      fileReaderInstance.readAsDataURL(imageBlob);
    } catch (error) {
      console.error("Error fetching images from API:", error.message);
      alert(`Error fetching images: ${error.message}`);
    } finally {
      setShowLoader(false);
    }
  };

  const handleSurpriseMe = () => {
    const surprisePrompt = getRandom(promptIdeas);
    setPromptQuery(surprisePrompt);
  };

  const handleAvailOptions = (option) => {
    setPromptQuery(option);
  };

  return (
    <div className="homeContainer">
      <div className="surpriseBox">
        <label>Bring your imaginations into reality!</label>
      </div>
      <div className="promptInputContainer">
        <input
          type="text"
          id="prompt"
          value={promptQuery}
          onChange={handleSearch}
          placeholder="A plush toy robot sitting against a yellow wall"
          className="promptInput"
        />
        <button onClick={handleSurpriseMe} className="primaryButton">
          Surprise Me
        </button>
      </div>
      <div className="generateButton">
        <button onClick={handleGenerate} className="primaryButton">
          Generate the Image
        </button>
      </div>

      {showLoader ? (
        <div className="loaderMessage">Blazing fast results... ⚡️⚡️⚡️</div>
      ) : (
        <ImageBox promptQuery={promptQuery} imageResult={imageResult} />
      )}
<RecentResults
  promptQuery={promptQuery}
  imageResult={imageResult}
  onSelect={handleAvailOptions}
/>

      <div className="slideShowMessage">{loaderMessage}</div>
    </div>
  );
};

export default Home;
