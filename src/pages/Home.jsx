import PopularPage from "../components/PopularPage";
import SmallSidebar from "../components/SmallSidebar";

const Home = () => {
  return (
    <div className="flex w-full h-full">
      <SmallSidebar />
      <PopularPage />
    </div>
  );
};

export default Home;
