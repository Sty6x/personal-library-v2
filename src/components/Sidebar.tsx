import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      id="library-sidebar"
      className="min-h-[100dvh] max-sm:min-h-[fit-content] max-sm:flex-row z-50
      max-sm:w-full max-sm:sticky top-0 relative box-border w-[7em] 
      bg-white shadow-sb flex flex-col items-center py-4
      max-sm:py-2 max-sm:px-4
      "
    >
      <nav className="flex fixed max-sm:static box-border max-sm:flex-row flex-col gap-4 mt-1 items-center">
        <div className=" border-b-separator-200 border-b border-solid max-sm:border-r max-sm:border-b-0 max-sm:pr-4  max-sm:pb-0 pb-4">
          <Link
            to={"/"}
            className="hover:underline inline-block text-xl font-bold max-sm:text-center max-sm:leading-5"
            id="logo"
          >
            <span className="flex flex-col justify-center max-sm:w-[30px]">
              <div className="max-sm:hidden">
                <span className="max-sm:block">Re:</span>
                <span className="max-sm:block">Read</span>
              </div>
            </span>
          </Link>
        </div>
        <NavLink
          to={"/app/library"}
          className="nav-icon inline-block logo py-4 size-[50px] max-sm:size-[35px] bg-gray-100 rounded"
        />
        <NavLink
          to={"/app/favorites"}
          className="nav-icon inline-block logo py-4 size-[50px] max-sm:size-[35px]  bg-gray-100 rounded"
        />
        <NavLink
          to={"/app/recent"}
          className="nav-icon inline-block logo py-4 size-[50px] max-sm:size-[35px] bg-gray-100 rounded"
        />
      </nav>
    </div>
  );
};
export default Sidebar;
