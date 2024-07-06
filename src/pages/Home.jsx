import { useSelector } from "react-redux";
import PopularPage from "../components/PopularPage";
import SmallSidebar from "../components/SmallSidebar";

const Home = () => {
  const theme = useSelector((state) => state.theme.dark);
  return (
    <div
      className={`flex w-full h-full pt-14 ${
        theme ? "bg-white text-black" : "bg-[#0f0f0f] text-white"
      }`}
    >
      <SmallSidebar />
      <PopularPage />
    </div>
  );
};

export default Home;
