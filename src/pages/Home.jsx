import { useSelector } from "react-redux";
import PopularPage from "../components/PopularPage";

const Home = () => {
  const theme = useSelector((state) => state.theme.dark);
  return (
    <div
      className={`flex w-full h-full relative pt-14 ${
        theme ? "bg-white text-black" : "bg-[#0f0f0f] text-white"
      }`}
    >
      <PopularPage />
      {/* {!theme && (
        <div className="absolute flex  w-screen z-50 sidebar_container left-0">
          <div className=" w-1/4 h-full  bg-primary-dark ">
            <h2>hello bro</h2>
          </div>
          <div className=" w-3/4 h-full   bg-black opacity-70 "></div>
        </div>
      )} */}
    </div>
  );
};

export default Home;
