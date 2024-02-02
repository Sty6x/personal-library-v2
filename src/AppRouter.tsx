import { createBrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/library",
    element: <Home />,
  },

  {
    path: "/{bookID}",
    element: <Home />,
    children: [
      {
        path: "/{pageNum}",
        element: <Home />,
      },
    ],
  },
]);

export default router;
