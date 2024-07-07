import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const CategorySkeleton = () => {
  const theme = useSelector((state) => state.theme.dark);

  return (
    <Skeleton
      baseColor={!theme && "#414040"}
      highlightColor={!theme && "#666666"}
      width={100}
      className=" py-[8px] px-4  rounded-md"
    />
  );
};

export default CategorySkeleton;
