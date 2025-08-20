import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import GameLoop from "./pages/GameLoop.jsx";
import GameOver from "./pages/GameOver.jsx";
import NotFound from "./pages/NotFound.jsx";
import Error from "./pages/Error.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/game-loop" element={<GameLoop />} />
      <Route path="/game-over" element={<GameOver />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
