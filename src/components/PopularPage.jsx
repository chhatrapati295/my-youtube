import { useEffect, useRef } from "react";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
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
import Skeleton from "react-loading-skeleton";

const PopularPage = () => {
  const searchSliceData = useSelector((state) => state.searchQuery);
  const [popularData, setPopularData] = useState(null);
  const [categoryItems, setCategoryItems] = useState(null);
  const [vidCategory, setVidCategory] = useState("");
  const containerRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [cateLoad, setCateLoad] = useState(false);
  const theme = useSelector((state) => state.theme.dark);

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
      setLoad(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const popularDataUrl = await fetch(POPULAR_VIDEO_API);
      const mainData = await popularDataUrl.json();
      setPopularData(mainData);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error("Error fetching popular video data:", error);
      // toast.error("Daily quota limit exceeded!");
    }
  };

  const getCategories = async () => {
    try {
      setCateLoad(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const categoryUrl = await fetch(videoCategory_api);
      const categoryData = await categoryUrl.json();
      setCategoryItems(categoryData);
      setCateLoad(false);
    } catch (error) {
      setCateLoad(false);
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
    <div
      className={`h-full m-auto overflow-y-scroll md:m-0 popular_page ${
        theme ? "bg-white" : "bg-[#0f0f0f]"
      } `}
    >
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
      {
        <div className="flex items-center md:pr-6 gap-3 w-full md:pb-4 pb-3 md:pt-3 py-1">
          <div
            className="flex gap-3 items-center overflow-x-scroll hide_scroll"
            ref={containerRef}
            style={{
              scrollBehavior: "smooth",
              transition: "transform 0.5s ease",
            }}
          >
            {!cateLoad && categoryItems ? (
              categoryItems?.items?.map((item, i) => {
                return (
                  <button
                    key={i}
                    className={` ${
                      theme
                        ? "bg-[#f2f2f2] text-black"
                        : "bg-[#FFFFFF1A] text-white"
                    } py-[6px] px-4 text-gray-900 rounded-lg text-[0.85rem] font-[500] min-w-fit focus:bg-black focus:text-white`}
                    onClick={() => {
                      setVidCategory(item?.id);
                      getCategoryVideoData(item?.id);
                    }}
                  >
                    {item?.snippet?.title}
                  </button>
                );
              })
            ) : (
              <div className="flex gap-3">
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
                <Skeleton
                  baseColor={!theme && "#414040"}
                  highlightColor={!theme && "#666666"}
                  width={100}
                  className=" py-[8px] px-4  rounded-md"
                />
              </div>
            )}
          </div>
          <i
            className="fa-solid fa-circle-chevron-right scroll-button cursor-pointer text-lg  bg-none"
            onClick={handleScrollRight}
          ></i>
        </div>
      }
      {popularData && popularData?.length === 0 && !load && (
        <div className="video_container flex flex-col gap-2 text-sm justify-center items-center">
          <img src={plant} className="h-24" alt="" />
          <span>Videos not available</span>
        </div>
      )}
      {!load && popularData ? (
        <div className="grid overflow-y-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-12 md:pr-6 pb-8 video_container 2xl:w-11/12 3xl:w-8/12 ">
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
      ) : (
        <div className="grid overflow-y-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-12 md:pr-6 pb-8 video_container 2xl:w-11/12 3xl:w-8/12 ">
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full h-[210px] rounded-xl"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full h-[210px] rounded-xl"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full h-[210px] rounded-xl"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full h-[210px] rounded-xl"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full h-[210px] rounded-xl"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full h-[210px] rounded-xl"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-full"
            />
            <Skeleton
              baseColor={!theme && "#414040"}
              highlightColor={!theme && "#666666"}
              className="w-1/2"
            />
          </div>
        </div>
      )}

      {/* {!load && popularData && (
        <div className="flex justify-center items-center  py-4 text-sm font-medium w-screen text-gray-600 lg:transform lg:-translate-x-[79.5px] gap-1">
          Made with{" "}
          <span className="heart animate-bounce">
            <Icon icon="fluent-emoji:red-heart" width="1.2em" height="1.2em" />
          </span>
        </div>
      )} */}
    </div>
  );
};

export default PopularPage;
