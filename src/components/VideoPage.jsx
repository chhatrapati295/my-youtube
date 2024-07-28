import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  API_KEY,
  CHANNLE_DATA_API,
  channle_info_api,
  suggested_video_api,
  video_comments_api,
  VIDEO_DETAILS_API,
  video_info_api,
  videoCategory_api,
  videoPlayer_api,
} from "../utils";
import SmallVideoCard from "./SmallVideoCard";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDistanceToNow } from "date-fns";

const VideoPage = () => {
  const { id } = useParams();
  const [videoInfo, setVideoInfo] = useState({});
  const [categoryItems, setCategoryItems] = useState(null);
  const [suggestData, setSuggestData] = useState(null);
  const [categoryId, setCategoryId] = useState(1);
  const [videoDetails, setVideoDetails] = useState(null);
  const [videoComments, setVideoComments] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelId, setChannelId] = useState("");
  const [viewFullDes, setViewFullDes] = useState(false);
  const [showSingleComment, setShowSingleComment] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [subscribe, setSubscribe] = useState("");
  const subscribeRef = useRef(false);
  const containerRef = useRef(null);
  const theme = useSelector((state) => state.theme.dark);

  // const {data , isLoading , isError} = useQuery({ queryKey: ['videoDetail'], queryFn: getVideoDetails })
  // console.log(data)

  useEffect(() => {
    getCategories();
    getVideoDetails();
  }, []);

  useEffect(() => {
    getVideoInfo();
    getVideoComments();
    // getSuggestedVideoData(id);
  }, [id]);

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

  const getVideoComments = async () => {
    try {
      const url = await fetch(video_comments_api + id);
      const data = await url.json();
      setVideoComments(data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoInfo = async () => {
    try {
      const apiUrl = await fetch(video_info_api + id);
      const data = await apiUrl.json();
      console.log(data);
      setChannelId(data?.items && data?.items[0]?.snippet?.channelId);
      setVideoInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

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
  const getSuggestedVideoData = async (id) => {
    const url = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${API_KEY}`
    );
    const data = await url.json();
    console.log("data", data);
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
      // console.log(data);
      setVideoDetails(data?.items);
      setChannelId(data?.items && data?.items[0]?.snippet?.channelId);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const getChannelData = async (channel) => {
    try {
      const url = await fetch(channle_info_api + channel);
      if (!url.ok) {
        throw new Error("Failed to fetch channel details");
      }
      const data = await url.json();
      console.log("maindata", data);
      setChannelDetails(data?.items && data?.items[0]);
    } catch (error) {
      console.error("Error fetching channel details:", error);
    }
  };

  const description =
    videoInfo?.items?.[0]?.snippet?.localized?.description || "";
  const descriptionLines = description.split("\n");
  const publishedAtString = videoInfo?.items?.[0]?.snippet?.publishedAt;
  let timeAgo = "";
  if (publishedAtString) {
    const publishedAt = new Date(publishedAtString);
    timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true });
  }

  return (
    <div
      className={`lg:px-0 px-4 md:pt-16 pt-16  overflow-y-scroll flex flex-col  lg:flex-row items-start md:gap-8 gap-4 h-screen ${
        theme ? "bg-white" : "bg-[#0f0f0f] text-white"
      } `}
    >
      <div className="w-full  lg:w-[67%] md:pl-6 flex flex-col gap-4   ">
        <iframe
          width="100%"
          // style={{ minHeight: "380px" }}
          className="rounded-xl md:h-[65vh] h-[200px]"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&si=ChLSfIsfR848SCc6`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold md:text-xl text-base">
            {videoInfo?.items && videoInfo?.items[0]?.snippet?.localized?.title}
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center whitespace-nowrap">
              <img
                src={
                  channelDetails?.snippet?.thumbnails?.high?.url ??
                  "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1710611958~exp=1710612558~hmac=482083950f742fec41e69c51ab7e7bdaac4b5119dad82c2d9bc782a8037a3032"
                }
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col md:text-base text-sm">
                <span className="font-bold ">
                  {videoInfo?.items &&
                    videoInfo?.items[0]?.snippet?.channelTitle}
                </span>
                {channelDetails?.statistics?.subscriberCount && (
                  <span className="text-xs text-gray-500">
                    {channelDetails?.statistics?.subscriberCount % 1000000 === 0
                      ? (
                          channelDetails?.statistics?.subscriberCount / 1000000
                        )?.toFixed(0)
                      : (
                          channelDetails?.statistics?.subscriberCount / 1000000
                        )?.toFixed(1)}
                    M subscribers
                  </span>
                )}
              </div>
              <button
                className={`py-2 px-6 md:text-sm text-xs font-[400] rounded-full ${
                  subscribeRef.current
                    ? "bg-gray-300 text-black"
                    : "bg-gray-800 text-white"
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
            <div
              className={`hidden md:flex gap-3 items-center  ${
                theme ? "text-black bg-gray-100" : "bg-gray-800 text-white"
              }  rounded-full py-2 px-4`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:like"
                  width="1.2em"
                  height="1.2em"
                  style={{ color: theme ? "black" : "white" }}
                />
                <span className="text-sm">
                  {videoInfo?.items &&
                    (
                      videoInfo?.items[0]?.statistics?.likeCount / 1000
                    )?.toFixed(1) + "k"}
                </span>
                <div className="border-[0.3px] border-gray-400 h-6 "></div>
                <Icon
                  icon="iconamoon:dislike-thin"
                  width="1.2em"
                  height="1.2em"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            theme ? "bg-gray-100 text-gray-600" : "bg-gray-800 text-gray-300"
          }   h-auto overflow-y-scroll text-sm p-4 rounded-2xl `}
        >
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">
              {videoInfo?.items &&
                (videoInfo?.items[0]?.statistics?.viewCount / 1000)?.toFixed(
                  1
                ) + "k views"}
            </span>
            <span className="text-sm font-medium">{timeAgo}</span>
          </div>
          {description && (
            <div className="flex flex-col mt-2">
              {!viewFullDes
                ? description.split("\n")[0]
                : descriptionLines.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
            </div>
          )}
          {description && (
            <p
              className="mt-1 font-bold cursor-pointer"
              onClick={() => setViewFullDes(!viewFullDes)}
            >
              {!viewFullDes ? " ... more" : "Show less"}
            </p>
          )}
        </div>

        <ul
          className={` hidden lg:flex flex-col gap-0 border  rounded-2xl ${
            theme ? "border-gray-200" : "border-gray-700"
          }  p-3`}
        >
          <div className="font-bold md:text-xl text-sm mb-4">
            {videoInfo?.items &&
              (videoInfo?.items[0]?.statistics?.commentCount / 1000)?.toFixed(
                1
              ) + "k Comments"}
          </div>
          {videoComments?.map((comment) => {
            return (
              <li
                className=" py-2 rounded-md flex gap-3 text-sm"
                key={comment?.id}
              >
                <img
                  src={
                    comment?.snippet?.topLevelComment?.snippet
                      ?.authorProfileImageUrl
                  }
                  className="rounded-full h-[40px] w-[40px]"
                  alt="author img"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-medium text-xs">
                    {
                      comment?.snippet?.topLevelComment?.snippet
                        ?.authorDisplayName
                    }
                  </h2>
                  <p className={`${theme ? "text-gray-800" : "text-gray-300"}`}>
                    {comment?.snippet?.topLevelComment?.snippet?.textDisplay}
                  </p>
                  {comment?.snippet?.topLevelComment?.snippet?.likeCount >
                    0 && (
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="iconamoon:like-thin"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: theme ? "black" : "white" }}
                      />
                      {
                        <span
                          className={`text-[13px] ${
                            theme ? "text-gray-600" : "text-gray-300"
                          }`}
                        >
                          {comment?.snippet?.topLevelComment?.snippet
                            ?.likeCount > 1000
                            ? (
                                comment?.snippet?.topLevelComment?.snippet
                                  ?.likeCount / 1000
                              )?.toFixed(2) + "k"
                            : comment?.snippet?.topLevelComment?.snippet
                                ?.likeCount}
                        </span>
                      }
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full lg:w-[30%] flex lg:gap-0 flex-col md:gap-4 sm:gap-2 gap-0">
        {categoryItems && (
          <div className="flex items-center pb-2">
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
                  className={` ${
                    theme
                      ? "bg-[#f2f2f2] text-black"
                      : "bg-[#FFFFFF1A] text-white"
                  } py-[6px] px-4 rounded-md text-xs font-[600] min-w-fit`}
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
