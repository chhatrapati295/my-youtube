import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
// import { formatDistanceToNow } from "date-fns";

const SmallVideoCard = ({ data }) => {
  if (!data) {
    return;
  }
  //   const publishedAtString = data?.snippet?.publishTime;
  //   const publishedAt = new Date(publishedAtString);

  //   const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true });
  return (
    <div className="flex gap-2 p-2 rounded-md text-xs cursor-pointer">
      <img
        src={data?.thumbnail && data?.thumbnail[0]?.url}
        alt="video"
        className="lg:w-5/12 lg:h-24 w-32 h-20 rounded-xl"
      />
      <div className="flex flex-col gap-1 w-7/12">
        <p className="text-wrap font-medium">
          {data?.title?.length > 100
            ? data?.title?.slice(0, 100) + "... "
            : data?.title}
        </p>
        <div className="flex items-center font-medium text-gray-500">
          <span>{data?.channelTitle} </span>
          {data?.snippet?.liveBroadcastContent !== "live" &&
            data?.type === "video" && (
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
        {data?.type === "video" && (
          <div className="flex gap-2">
            <span className="text-[0.7rem]">
              {data?.viewCount > 1000000
                ? (data?.viewCount / 1000000)?.toFixed(1) + "M views"
                : (data?.viewCount / 1000)?.toFixed(1) + "k views"}
            </span>
            {/* <span className="">{timeAgo}</span> */}
          </div>
        )}
        {data?.type === "playlist" && (
          <Icon icon="solar:play-stream-bold" width="1.2em" height="1.5em" />
        )}
      </div>
    </div>
  );
};

SmallVideoCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SmallVideoCard;
