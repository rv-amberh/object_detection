import React from "react";
import Papa from "papaparse";
import { useState, useEffect, useRef } from "react";
import ImageData from "../../train_labels.csv";
import { getImageSize } from "react-image-size";
import darkLogo from "../../images/0x0-Tesla_T_Black.png";
import whiteLogo from "../../images//0x0-Tesla_T_White.png";

import {
  GalleryContainer,
  FilterContainer,
  FilterWrapper,
  MainImageWrapper,
  MainImage,
  ThumbnailWrapper,
  ThumbnailContainer,
  MainContainer,
  DrawButton,
  ThemeButton
} from "./MainContent";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../../theme";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  console.log(images, "images")
  return images;
};

const images = importAll(
  require.context("../../../public/images", false, /\.(png|jpe?g|svg)$/)
);

const imagePaths = Object.values(images);

const getKeyHolder = (filePathStr) => {
  return filePathStr.slice(14).slice(0, 14) + ".jpg";
};

//loop through images
//look up in dictionary using the spliced path
//if for that key the value of obj.label == selected
//filter

const MainContent = () => {
  const [imageData, setImageData] = useState([]);
  const [visibleImagesEnd, setVisibleImagesEnd] = useState(21);
  const [setImage, setImageIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(imagePaths[1]);
  const [imgInfo, setImgInfo] = useState({});
  const [labels, setLabels] = useState([]);
  const [labelFilters, setLabelFilters] = useState(new Set());
  const [checkedState, setCheckedState] = useState(new Array(6).fill(false));
  const [cover, setCover] = useState("initial");
  const [visibleImagesStart, setVisibleImagesStart] = useState(0);
  const [theme, setTheme] = useState("light");
  const canvasRef = useRef();
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  const imgDict = {};
  const labelSet = [];

  const formatData = async (data, images) => {
    for (const objs of data) {
      labelSet.push(objs.Label);
      imgDict[objs.Img_Name] = objs;
      if (images[objs.Img_Name]) {
        imgDict[objs.Img_Name]["Img_Path"] = images[objs.Img_Name];
        const dim = await getImageSize(imgDict[objs.Img_Name]["Img_Path"]);
        imgDict[objs.Img_Name]["Img_Width"] = dim.width;
        imgDict[objs.Img_Name]["Img_Height"] = dim.height;
        // console.log(dim)
      }
    }
    setImageData(imgDict);
    setLabels([...new Set(labelSet)]);
  };

  const parseFiles = async () => {
    Papa.parse(ImageData, {
      header: true,
      download: true,
      complete: (results) => {
        const data = results.data;
        formatData(data, images);
      },
    });
  };

  useEffect(() => {
    parseFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickPrev = () => {
    if(labelFilters.size === 0) {
      if (visibleImagesEnd >21 && visibleImagesStart > 0) {
        setVisibleImagesStart(visibleImagesStart - 5);
        setVisibleImagesEnd(visibleImagesEnd - 5);
      } else {
        setVisibleImagesStart(0);
        setVisibleImagesEnd(21);
      }
    }
  };

  const onClickNext = () => {
    if(labelFilters.size === 0) {
      if(visibleImagesEnd >= 197) {
        setVisibleImagesStart(0);
        setVisibleImagesEnd(21);
      } else {
        setVisibleImagesStart(visibleImagesStart + 5);
        setVisibleImagesEnd(visibleImagesEnd + 5);
      }
    }
  };


  const loadImage = (e, index, image) => {
    console.log(imageData);

    setCover("");
    clearRectangle();
    setImageIndex(index);
    setImgSrc(image);

    const keyH = getKeyHolder(image);
    const keyHolder = imageData[keyH];

    console.log("keyH", keyHolder);

    if (keyHolder === undefined) {
      console.log("no key");
      setImgInfo({ Top: "0", Left: "0", Height: "0", Width: "0" });
      setCover("active");
    } else {
      setImgInfo(keyHolder);
    }
  };

  const clearRectangle = (e) => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const drawRectangle = (e) => {
    const context = canvasRef.current.getContext("2d");
    console.log(context, "canvasRef");
    context.strokeStyle = "red";
    context.lineWidth = 0;
    context.fillStyle = "rgba(200,0,0,0.4)";
    context.fillRect(
      parseInt(imgInfo.Left),
      parseInt(imgInfo.Top),
      parseInt(imgInfo.Width),
      parseInt(imgInfo.Height)
    );
    context.strokeRect(
      parseInt(imgInfo.Left),
      parseInt(imgInfo.Top),
      parseInt(imgInfo.Width),
      parseInt(imgInfo.Height)
    );
  };

  const handleOnChange = (position, label) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    const updatedLabels = labelFilters;

    updatedCheckedState.forEach((check) => {
      if (updatedCheckedState[position] === true) {
        updatedLabels.add(label);
      } else {
        updatedLabels.delete(label);
      }
    });
    console.log(updatedLabels, updatedCheckedState, "updated values");
    setCheckedState(updatedCheckedState);
    setLabelFilters(updatedLabels);

    if (updatedLabels.size > 0) {
      setVisibleImagesStart(0);
      setVisibleImagesEnd(imagePaths.length);
    } else {
      setVisibleImagesStart(0);
      setVisibleImagesEnd(21);
    }
  };

  const slicedImages = imagePaths.slice(visibleImagesStart, visibleImagesEnd);

  const imageComponents = slicedImages.map((image, index) => {
    if (labelFilters.size > 0) {
      const keyH = getKeyHolder(image);
      if (imageData[keyH]) {
        const label = imageData[keyH].Label;
        console.log(labelFilters.size, "size");
        if (labelFilters.has(label)) {
          return (
            <img
              alt=""
              className="images_main"
              onClick={(e) => loadImage(e, index, image)}
              key={index}
              width={75}
              height={75}
              src={encodeURI(image)}
            />
          );
        }
      }
    } else {
      return (
        <div className="imageHolder">
        <img
          alt=""
          className="images_main"
          onClick={(e) => loadImage(e, index, image)}
          key={index}
          src={encodeURI(image)}
        />
        </div>
      );
    }
  });

  const labelComponents = labels.map((label, index) => {
    if (label === undefined) console.log("");
    else {
      return (
        // <InputWrapper>
        // onClick={(e) => filterC(e, label)} somsthing like this

        <div className="checkboxHolder">
          <input
            className="checkbox"
            key={index}
            checked={checkedState[index]}
            onChange={() => handleOnChange(index, label)}
            value={label}
            type="checkbox"
          />
          <h4>{label}</h4>
        </div>
        // </InputWrapper>
      );
    }
  });

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <MainContainer>
          <FilterContainer>
            <ThemeButton
              onClick={toggleTheme}
              className="themeButton"
              theme={theme}
            >
              {" "}
              {isDarkTheme ? "Light Theme" : "Dark Theme"}{" "}
            </ThemeButton>

            <FilterWrapper className="filterWrapper">
              <h3 className="filter"> Filter</h3> {labelComponents}
            </FilterWrapper>
            <DrawButton onClick={(e) => drawRectangle(e)}>
              Detect Object
            </DrawButton>
          </FilterContainer>
          <GalleryContainer className="mainContainer">
            <MainImageWrapper>
              <div className={`cover ${cover}`}>{cover === 'active' ? 'There is no Data Found' : 'Click an image to begin detection.'}</div>
              <MainImage
                width={parseInt(imgInfo.Img_Width)}
                height={parseInt(imgInfo.Img_Height)}
                src={imgSrc}
              />
              <canvas
                id="canvas"
                ref={canvasRef}
                width={parseInt(imgInfo.Img_Width)}
                height={parseInt(imgInfo.Img_Height)}
                style={{ position: "absolute", border: "solid 3px red", }}
              ></canvas>
            </MainImageWrapper>

            <ThumbnailWrapper className="thumbnailWrapper">
              <i
                onClick={(e) => onClickPrev(e)}
          
                className="button prev fa-solid fa-circle-arrow-left"
              ></i>
              <ThumbnailContainer>{imageComponents}</ThumbnailContainer>
              <i
                onClick={(e) => onClickNext(e)}
                className="button next fa-solid fa-circle-arrow-right"
              ></i>
            </ThumbnailWrapper>
          </GalleryContainer>
          {isDarkTheme ? (
            <img className="logo" src={whiteLogo} alt="" />
          ) : (
            <img className="logo" src={darkLogo} alt="" />
          )}
        </MainContainer>
      </>
    </ThemeProvider>
  );
};

export default MainContent;
