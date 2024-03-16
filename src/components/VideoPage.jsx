import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CHANNLE_DATA_API,
  VIDEO_DETAILS_API,
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
    getCategories();
    getVideoDetails();
  }, []);

  useEffect(() => {
    getChannelData(channelId);
  }, [channelId, id]);

  useEffect(() => {
    getCategoryVideoData(categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [categoryItems]);

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
    setSuggestData(data?.items);
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200; // Adjust as needed
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
        throw new Error("Failed to fetch channel details");
      }
      const data = await url.json();
      setChannelDetails(data?.items && data?.items[0]);
    } catch (error) {
      console.error("Error fetching channel details:", error);
    }
  };

  return (
    <div className="md:px-0 px-4 md:pt-16 pt-16 video_page flex flex-col  md:flex-row items-start md:gap-8 gap-4">
      <div className="w-full md:w-8/12 md:pl-6 flex flex-col gap-4 md:h-full">
        <iframe
          width="100%"
          // style={{ minHeight: "380px" }}
          className="rounded-xl md:min-h-[380px] min-h-[250px]"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&si=ChLSfIsfR848SCc6`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {videoDetails?.map((item, i) => {
          return (
            <div className="flex flex-col gap-4" key={i}>
              <h3 className="font-bold md:text-xl text-base">
                {videoDetails[0]?.snippet?.title}
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center whitespace-nowrap">
                  <img
                    src={
                      channelDetails?.snippet?.thumbnails?.high?.url ??
                      "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1710611958~exp=1710612558~hmac=482083950f742fec41e69c51ab7e7bdaac4b5119dad82c2d9bc782a8037a3032"
                    }
                    alt="Img"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col md:text-base text-sm">
                    <span className="font-bold text-gray-500">
                      {item?.snippet?.channelTitle ?? item?.snippet.title}
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
                    className={`py-2 px-6 md:text-sm text-xs font-[400] rounded-full ${
                      subscribeRef.current
                        ? "bg-gray-300 text-black"
                        : "bg-black text-white"
                    }`}
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
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full md:w-4/12 flex md:gap-0 flex-col gap-4 h-full overflow-y-scroll ">
        {categoryItems && (
          <div className="flex items-center">
            <div
              className="overflow-x-scroll hide_scroll flex gap-3"
              ref={containerRef}
              style={{
                scrollBehavior: "smooth",
                transition: "transform 0.5s ease",
              }}
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
              <Link
                className="pr-4"
                to={`/watch/${item?.id}`}
                key={i}
                onClick={() => getChannelData(item?.snippet?.channelId)}
              >
                <SmallVideoCard data={item} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default VideoPage;
