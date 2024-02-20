import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      id="library-sidebar"
      className="min-h-[100dvh] relative box-border w-[6em] bg-white shadow-sb flex flex-col items-center py-8"
    >
      <nav className="flex fixed box-border flex-col gap-4 mt-4">
        <div className=" border-b-separator-200 border-b border-solid pb-4">
          <Link to={"/"} className="inline-block text-lg font-bold" id="logo">
            Re:Read
          </Link>
        </div>
        <NavLink
          to={"/app/library"}
          className="nav-icon inline-block logo py-4 h-[50px] bg-gray-100 rounded"
        />
        <NavLink
          to={"/app/favorites"}
          className="nav-icon inline-block logo py-4 h-[50px] bg-gray-100 rounded"
        />
        <NavLink
          to={"/app/recents"}
          className="nav-icon inline-block logo py-4 h-[50px] bg-gray-100 rounded"
        />
      </nav>
    </div>
  );
};
export default Sidebar;
