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
        src={
          data?.snippet?.thumbnails?.maxres?.url ??
          data?.snippet?.thumbnails?.high?.url
        }
        alt="video"
        className="w-5/12 h-24 rounded-xl"
      />
      <div className="flex flex-col gap-1 w-7/12">
        <p className="text-wrap font-medium">
          {data?.snippet?.title?.length > 100
            ? data?.snippet?.title?.slice(0, 100) + "... "
            : data?.snippet?.title}
        </p>
        <div className="flex items-center font-medium text-gray-500">
          <span>{data?.snippet?.channelTitle} </span>
          {data?.snippet?.liveBroadcastContent !== "live" && (
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
        <div className="flex gap-2">
          <span className="text-[0.7rem]">
            {Math.floor(Math.random() * 999) + "K views"}
          </span>
          {/* <span className="">{timeAgo}</span> */}
        </div>
      </div>
    </div>
  );
};

SmallVideoCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SmallVideoCard;
