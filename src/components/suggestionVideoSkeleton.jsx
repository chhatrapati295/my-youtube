import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const SuggestionVideoSkeleton = () => {
  const theme = useSelector((state) => state.theme.dark);
  return (
    <div className="flex w-full  gap-2 p-2 border border-red-600">
      <Skeleton
        baseColor={!theme && "#414040"}
        highlightColor={!theme && "#666666"}
        className=" w-full h-20 rounded-xl border"
      />
      <div className="flex flex-col gap-1">
        <Skeleton
          baseColor={!theme && "#414040"}
          highlightColor={!theme && "#666666 border"}
          className="w-full h-full"
        />
        <Skeleton
          baseColor={!theme && "#414040"}
          highlightColor={!theme && "#666666 border"}
          className="w-full h24"
        />
        <Skeleton
          baseColor={!theme && "#414040"}
          highlightColor={!theme && "#666666 border"}
          className="w-full h-32"
        />
      </div>
    </div>
  );
};

export default SuggestionVideoSkeleton;
