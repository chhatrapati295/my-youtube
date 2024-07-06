import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

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
  console.log(time); // Output: { hours: 0, minutes: 15, seconds: 23 }

  // console.log(momObj);
  return (
    <div className=" flex flex-col gap-3 cursor-pointer">
      <div className="w-full h-[208px] relative">
        <img
          src={
            videoObj?.snippet?.thumbnails?.maxres?.url ??
            videoObj?.snippet?.thumbnails?.high?.url
          }
          className="w-full h-full rounded-xl hover:rounded-none transition-all duration-200 ease-in-out"
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
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col text-sm">
          <p
            className={`flex flex-wrap font-[500] ${
              !theme ? "text-white" : "text-[#0f0f0f]"
            }`}
          >
            {videoObj?.snippet?.localized?.title ?? videoObj?.snippet?.title}
          </p>
          <div className="flex items-center  mt-1  text-gray-500">
            <span className="">{videoObj?.snippet?.channelTitle}</span>
            {Number(videoObj?.statistics?.likeCount) > 2000 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                focusable="false"
                style={{
                  pointerEvents: "none",
                  display: "block",
                  height: "0.8rem",
                }}
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"></path>
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2  text-gray-500">
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
