import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";

const VideoCard = ({ videoObj }) => {
  const theme = useSelector((state) => state.theme.dark);
  // const momObj = moment(videoObj?.snippet?.publishedAt);
  const publishedAtString = videoObj?.snippet?.publishedAt;
  const publishedAt = new Date(publishedAtString);

  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true });

  function convertISO8601DurationToTime(duration) {
    const matches = duration?.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!matches) return;

    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // const hoursPart = Math.floor(totalSeconds / 3600);
    const minutesPart = Math.floor((totalSeconds % 3600) / 60);
    const secondsPart = totalSeconds % 60;

    return `${
      minutesPart < 10 ? String(minutesPart).padStart(2, "0") : minutesPart
    }:${secondsPart < 10 ? String(secondsPart).padStart(2, "0") : secondsPart}`;
  }

  const time = convertISO8601DurationToTime(videoObj?.contentDetails?.duration);
  return (
    <div className=" flex flex-col gap-3 cursor-pointer">
      <div className="w-full  min-[1200px]:flex-1 min-[1200px] md:max-h-[178.5px] h-auto relative">
        <img
          src={
            videoObj?.snippet?.thumbnails?.maxres?.url ??
            videoObj?.snippet?.thumbnails?.high?.url
          }
          className="w-full h-full md:max-h-[178px] rounded-xl hover:rounded-none transition-all duration-200 ease-in-out"
          alt=""
        />
        <span className="absolute bottom-2 right-2 bg-black text-white text-[0.7rem] font-semibold py-[2px] px-1 rounded-md">
          {time ?? ""}
        </span>
      </div>
      <div className="flex gap-3">
        <img
          src={
            videoObj?.snippet?.thumbnails?.maxres?.url ??
            videoObj?.snippet?.thumbnails?.high?.url
          }
          alt="image"
          className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col text-sm">
          <p
            className={`flex flex-wrap font-[500] ${
              !theme ? "text-white" : "text-[#0f0f0f]"
            }`}
          >
            {videoObj?.snippet?.localized?.title ?? videoObj?.snippet?.title}
          </p>
          <div
            className={`flex items-center gap-1  mt-1 ${
              theme ? "text-gray-500" : "text-gray-400"
            }  `}
          >
            <span className="text-xs md:text-sm font-medium md:font-normal">
              {videoObj?.snippet?.channelTitle}
            </span>
            {Number(videoObj?.statistics?.likeCount) > 2000 && (
              <Icon
                icon="mdi:tick-circle"
                width="1em"
                height="1em"
                style={{ color: !theme ? "gray" : "black" }}
              />
            )}
          </div>
          <div
            className={`flex items-center gap-2 text-xs md:text-sm ${
              theme ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {videoObj?.statistics?.viewCount ? (
              <span className="">
                {videoObj?.statistics?.viewCount > 1000000
                  ? (videoObj?.statistics?.viewCount / 1000000)?.toFixed(1) +
                    "M views"
                  : (videoObj?.statistics?.viewCount / 1000)?.toFixed(1) +
                    " K views"}
              </span>
            ) : (
              <span>{Math.floor(Math.random() * 999) + "K views"}</span>
            )}
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  videoObj: PropTypes.object.isRequired,
};

export default VideoCard;
