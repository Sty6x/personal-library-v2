import { createBrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";
import Page from "./views/book/page/Page";
import Book from "./views/book/Book";
import bookLoader from "./utils/loader/bookLoader";

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
    path: "/:bookID",
    element: <Book />,
    loader: bookLoader,
    children: [
      {
        path: "/:bookID/:pageID",
        element: <Page />,
      },
    ],
  },
]);

export default router;
