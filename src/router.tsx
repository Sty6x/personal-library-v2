import { createBrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";
import Page from "./views/book/page/Page";
import Book from "./views/book/Book";
import bookLoader from "./utils/loader/bookLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <p>Gago</p>,
  },

  {
    path: "/library",
    element: <Home />,
    errorElement: <p>Gago</p>,
  },

  {
    path: "/:bookID",
    element: <Book />,
    loader: bookLoader,
    children: [
      {
        path: ":pageID",
        element: <Page />,
      },
    ],
    errorElement: <p>Gago</p>,
  },
]);

export default router;
