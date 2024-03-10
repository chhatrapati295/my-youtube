import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  POPULAR_VIDEO_API,
  search_video_api,
  videoCategory_api,
  videoPlayer_api,
} from "../utils";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import plant from "../assets/plant.gif";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import loader from "../assets/loader.gif";

const PopularPage = () => {
  const searchSliceData = useSelector((state) => state.searchQuery);
  const [popularData, setPopularData] = useState(null);
  const [categoryItems, setCategoryItems] = useState(null);
  const [vidCategory, setVidCategory] = useState("");
  const containerRef = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    console.log(vidCategory);
    if (vidCategory) {
      getCategoryVideoData(vidCategory);
    } else {
      getPopularVideoData();
    }
    getCategories();
  }, []);

  useEffect(() => {
    if (searchSliceData === "") {
      return;
    }
    getSearchVideoData(searchSliceData);
  }, [searchSliceData]);

  const getSearchVideoData = async (query) => {
    setLoad(true);
    try {
      const url = await fetch(search_video_api + query);
      const data = await url.json();
      console.log("search data ", data);
      setPopularData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const getPopularVideoData = async () => {
    try {
      const popularDataUrl = await fetch(POPULAR_VIDEO_API);
      const mainData = await popularDataUrl.json();
      setPopularData(mainData);
    } catch (error) {
      console.error("Error fetching popular video data:", error);
      // toast.error("Daily quota limit exceeded!");
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
    <div className=" h-full w-[95%] m-auto md:m-0 md:w-[92%]  popular_page px-1 ">
      <ToastContainer
        position="bottom-left"
        autoClose={1900}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <div className="flex w-full items-center">
        <div
          className="flex gap-3 items-center overflow-x-scroll hide_scroll md:my-4 mt-1 mb-2 mr-1"
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
                className=" bg-[#f2f2f2] py-[6px] px-4 text-gray-900 rounded-lg text-xs font-[600] min-w-fit focus:bg-black focus:text-white"
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
          className="fa-solid fa-circle-chevron-right scroll-button cursor-pointer text-lg pl-4 bg-none"
          onClick={handleScrollRight}
        ></i>
      </div>
      {popularData === null && load ? (
        <div className="flex items-center justify-center w-full h-5/6">
          <img src={loader} className="h-8 w-8 rounded-full m-auto" alt="" />
        </div>
      ) : popularData && popularData?.length === 0 && !load ? (
        <div className="video_container flex flex-col gap-2 text-sm justify-center items-center">
          <img src={plant} className="h-24" alt="" />
          <span>Videos not available</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-12 gap-y-12 py-2 overflow-y-scroll justify-center md:justify-stretch video_container ">
          {popularData?.items?.map((videoObj, i) => (
            <Link
              to={
                videoObj?.id?.videoId
                  ? `watch/` + videoObj?.id?.videoId
                  : `watch/` + videoObj?.id
              }
              key={i}
            >
              <VideoCard videoObj={videoObj} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularPage;
