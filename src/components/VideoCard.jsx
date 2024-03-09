import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

const VideoCard = ({ videoObj }) => {
  // const momObj = moment(videoObj?.snippet?.publishedAt);
  const publishedAtString = videoObj?.snippet?.publishedAt;
  const publishedAt = new Date(publishedAtString);

  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true });

  // console.log(momObj);
  return (
    <div className="max-w-[340px] flex flex-col gap-3 cursor-pointer">
      <img
        src={
          videoObj?.snippet?.thumbnails?.maxres?.url ??
          videoObj?.snippet?.thumbnails?.high?.url
        }
        alt=""
        className="w-full h-[208px] rounded-xl hover:scale-105 transition-all duration-200 ease-in-out"
      />
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
          <p className="flex flex-wrap font-[500]">
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
