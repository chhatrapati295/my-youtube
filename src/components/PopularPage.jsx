import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  POPULAR_VIDEO_API,
  videoCategory_api,
  videoPlayer_api,
} from "../utils";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import plant from "../assets/plant.gif";

const PopularPage = () => {
  const [popularData, setPopularData] = useState(null);
  const [categoryItems, setCategoryItems] = useState(null);
  const [vidCategory, setVidCategory] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    console.log(vidCategory);
    if (vidCategory) {
      getCategoryVideoData(vidCategory);
    } else {
      getPopularVideoData();
    }
    getCategories();
  }, []);

  const getPopularVideoData = async () => {
    try {
      const popularDataUrl = await fetch(POPULAR_VIDEO_API);
      const mainData = await popularDataUrl.json();
      setPopularData(mainData);
    } catch (error) {
      console.error("Error fetching popular video data:", error);
    }
  };

  const getCategories = async () => {
    const categoryUrl = await fetch(videoCategory_api);
    try {
      const categoryData = await categoryUrl.json();
      setCategoryItems(categoryData);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryVideoData = async (id) => {
    const url = await fetch(videoPlayer_api + id);
    const data = await url.json();
    // console.log(data);
    setPopularData(data);
  };
  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 400; // You can adjust the scroll amount as needed
      // Smooth scroll to the right
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "end",
      });
    }
  };

  return (
    <div className=" h-full popular_page px-1">
      <div className="flex w-full items-center">
        <div
          className="flex gap-3 items-center overflow-x-scroll hide_scroll my-4 mr-1"
          ref={containerRef}
          style={{
            scrollBehavior: "smooth",
            transition: "transform 0.5s ease",
          }}
        >
          {categoryItems?.items?.map((item, i) => {
            return (
              <button
                key={i}
                className=" bg-[#f2f2f2] py-[6px] px-4 text-gray-700 rounded-lg text-xs font-[500] min-w-fit focus:bg-black focus:text-white"
                onClick={() => {
                  setVidCategory(item?.id);
                  getCategoryVideoData(item?.id);
                }}
              >
                {item?.snippet?.title}
              </button>
            );
          })}
        </div>
        <i
          className="fa-solid fa-circle-chevron-right scroll-button cursor-pointer text-lg px-4 bg-none"
          onClick={handleScrollRight}
        ></i>
      </div>
      {popularData?.items?.length > 0 ? (
        <div className="flex flex-wrap gap-x-6 gap-y-12 py-2 overflow-y-scroll video_container">
          {popularData?.items?.map((videoObj, i) => (
            <Link to={`watch/` + videoObj?.id} key={i}>
              <VideoCard videoObj={videoObj} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="video_container flex flex-col gap-2 text-sm justify-center items-center">
          <img src={plant} className="h-24" alt="" />
          <span>Videos not available</span>
        </div>
      )}
    </div>
  );
};

export default PopularPage;
