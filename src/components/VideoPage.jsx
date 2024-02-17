import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CHANNLE_DATA_API,
  VIDEO_DETAILS_API,
  // CATEGORIES_DATA_API,
  videoCategory_api,
  videoPlayer_api,
} from "../utils";
import SmallVideoCard from "./SmallVideoCard";

const VideoPage = () => {
  const { id } = useParams();
  const [categoryItems, setCategoryItems] = useState(null);
  const [suggestData, setSuggestData] = useState(null);
  const [categoryId, setCategoryId] = useState(1);
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelId, setChannelId] = useState("");
  const [subscribe, setSubscribe] = useState("");

  const subscribeRef = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // getVideoPlayerData();
    getCategories();
    getVideoDetails();
  }, []);

  useEffect(() => {
    if (channelId === "") return;
    console.log("func called ", channelId);
    getChannelData(channelId);
  }, [channelId]);
  useEffect(() => {
    getCategoryVideoData(categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0; // Reset scroll position when categoryItems changes
    }
  }, [categoryItems]);

  // const getVideoPlayerData = async () => {
  //   const videoPlayerUrl = await fetch(videoPlayer_api);
  //   const vPlayerData = await videoPlayerUrl.json(); // await needed here
  //   // console.log(vPlayerData);
  // };

  const getCategories = async () => {
    try {
      const categoryUrl = await fetch(videoCategory_api);
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
    setSuggestData(data?.items);
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300; // You can adjust the scroll amount as needed
    }
  };

  const getVideoDetails = async () => {
    try {
      const url = await fetch(VIDEO_DETAILS_API + id);
      if (!url.ok) {
        throw new Error("Failed to fetch video details");
      }
      const data = await url.json();
      setVideoDetails(data?.items);
      setChannelId(data?.items && data?.items[0]?.snippet?.channelId);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };
  const getChannelData = async (channel) => {
    try {
      const url = await fetch(CHANNLE_DATA_API + channel);
      if (!url.ok) {
        throw new Error("Failed to fetch video details");
      }
      const data = await url.json();
      console.log(data);
      setChannelDetails(data?.items && data?.items[0]);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  return (
    <div className="px-8 pt-4 video_page flex items-start gap-8">
      <div className="w-8/12 flex flex-col gap-4 h-full overflow-y-scroll hide_scroll">
        <iframe
          width="100%"
          // height="75%"
          style={{ minHeight: "400px" }}
          className="rounded-xl"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&si=ChLSfIsfR848SCc6`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {videoDetails?.map((item, i) => {
          return (
            <div className="flex flex-col gap-4" key={i}>
              <h3 className="font-bold text-xl">
                {channelDetails?.snippet?.title}
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <img
                    src={channelDetails?.snippet?.thumbnails?.high?.url}
                    alt="img"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col text-base mr-2">
                    <span className="font-bold text-gray-500">
                      {item?.snippet?.channelTitle}
                    </span>
                    <span className="text-xs text-gray-500">
                      {channelDetails?.statistics?.subscriberCount % 1000000 ===
                      0
                        ? (
                            channelDetails?.statistics?.subscriberCount /
                            1000000
                          )?.toFixed(0)
                        : (
                            channelDetails?.statistics?.subscriberCount /
                            1000000
                          )?.toFixed(1)}
                      M subscribers
                    </span>
                  </div>
                  <button
                    className={
                      !subscribeRef.current
                        ? "py-2 px-6 text-base font-[400] rounded-full bg-black text-white"
                        : "py-2 px-6 text-base font-[400] rounded-full bg-gray-300 text-black"
                    }
                    onClick={() => {
                      subscribeRef.current = !subscribeRef.current;
                      setSubscribe(subscribeRef.current ? "Subscribed" : "");
                    }}
                  >
                    {subscribeRef.current ? (
                      <span className="flex gap-2 items-center">
                        <i className="fa-regular fa-bell"></i>Subscribed
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                <div className="flex items-center">
                  <div className=""></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-4/12 flex flex-col h-full overflow-y-scroll hide_scroll ">
        {categoryItems && (
          <div className="flex items-center">
            <div
              className="overflow-x-scroll flex gap-3 hide_scroll scroll-smooth"
              ref={containerRef}
            >
              {categoryItems?.items?.map((item, i) => (
                <button
                  key={i}
                  className="bg-[#f2f2f2] py-[6px] px-4 text-gray-900 rounded-md text-xs font-[600] min-w-fit focus:bg-black focus:text-white"
                  onClick={() => {
                    setCategoryId(item?.id);
                    getCategoryVideoData(item?.id);
                  }}
                >
                  {item?.snippet?.title}
                </button>
              ))}
            </div>
            <i
              className="fa-solid fa-circle-chevron-right scroll-button cursor-pointer text-lg px-4 bg-none"
              onClick={handleScrollRight}
            ></i>
          </div>
        )}
        {suggestData &&
          suggestData?.map((item, i) => {
            return (
              <Link to={`/watch/${item?.id}`} key={i}>
                <SmallVideoCard data={item} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default VideoPage;
