import { Provider } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import VideoPage from "./components/VideoPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen body_css">
      <Provider store={store}>
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path={"/watch/:id"} element={<VideoPage />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
