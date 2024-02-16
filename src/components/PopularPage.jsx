import { useEffect } from "react";
import { useState } from "react";
import { POPULAR_VIDEO_API, videoCategory_api } from "../utils";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const PopularPage = () => {
  const [popularData, setPopularData] = useState(null);
  const [categoryItems, setCategoryItems] = useState(null);

  useEffect(() => {
    getPopularVideoData();
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

  return (
    <div className=" h-full popular_page px-1">
      <div className="flex gap-3 items-center overflow-x-scroll hide_scroll my-4 mr-1">
        {categoryItems?.items?.map((item, i) => {
          return (
            <button
              key={i}
              className=" bg-[#f2f2f2] py-[6px] px-4 text-gray-700 rounded-lg text-xs font-[500] min-w-fit focus:bg-black focus:text-white"
            >
              {item?.snippet?.title}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-12 py-2 overflow-y-scroll video_container">
        {popularData?.items?.map((videoObj, i) => (
          <Link to={`watch/` + videoObj?.id} key={i}>
            <VideoCard videoObj={videoObj} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPage;
