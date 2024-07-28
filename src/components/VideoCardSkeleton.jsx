import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const VideoCardSkeleton = () => {
  const theme = useSelector((state) => state.theme.dark);
  return (
    <div className="flex flex-col gap-1">
      <Skeleton
        baseColor={!theme && "#414040"}
        highlightColor={!theme && "#666666"}
        className="w-full  md:w-full md:max-h-[170px] h-[190px] rounded-xl"
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
  );
};

export default VideoCardSkeleton;
