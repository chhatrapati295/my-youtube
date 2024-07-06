import { Provider } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import VideoPage from "./components/VideoPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className={`flex flex-col w-screen h-screen body_css`}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path={"/watch/:id"} element={<VideoPage />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
