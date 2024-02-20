import { createBrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";
import Page from "./views/book/page/Page";
import Book from "./views/book/Book";
import bookLoader from "./utils/loader/bookLoader";
import ErrorPage from "./components/ErrorPage";
import App from "./views/app/App";
import libraryLoader from "./utils/loader/libraryLoader";
import Library from "./views/app/Library";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/app",
    element: <App />,
    loader: libraryLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "library",
        element: <Library />,
        loader: libraryLoader,
        errorElement: <ErrorPage />,
      },

      {
        path: "favorites",
        element: <App />,
        loader: libraryLoader,
        errorElement: <ErrorPage />,
      },

      {
        path: "recent",
        element: <App />,
        loader: libraryLoader,
        errorElement: <ErrorPage />,
      },
    ],
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
    errorElement: <ErrorPage />,
  },
]);

export default router;
