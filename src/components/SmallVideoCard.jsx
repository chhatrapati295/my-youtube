import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { formatDistanceToNow } from "date-fns";

const SmallVideoCard = ({ data }) => {
  const theme = useSelector((state) => state.theme.dark);
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
        <div className="flex items-center gap-1 font-medium text-gray-500">
          <span>{data?.channelTitle} </span>
          {data?.snippet?.liveBroadcastContent !== "live" &&
            data?.type === "video" && (
              <Icon
                icon="mdi:tick-circle"
                width="1em"
                height="1em"
                style={{ color: !theme ? "gray" : "black" }}
              />
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
