import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      id="error-page"
      className="h-[100dvh] flex items-center justify-center bg-gridWhite"
    >
      <div id="error-page-contents">
        <div id="error-info" className=" text-center mb-4">
          <h1 className="text-4xl font-semibold">404 Not Found</h1>
          <p className="text-xl">
            Sorry, but there seems to be a problem with you request.{" "}
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          id="err-back"
          className="text-white font-semibold block py-2 px-6 text-xl bg-primary-main rounded shadow-btn-hover transition-shadow hover:transition-shadow hover:shadow-btn-hover-active"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
