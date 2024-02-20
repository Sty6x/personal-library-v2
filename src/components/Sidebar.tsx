import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      id="library-sidebar"
      className="min-h-[100dvh] w-[5em] box bg-white shadow-sb flex flex-col items-center py-8"
    >
      <div className=" border-b-separator-200 border-b border-solid pb-4">
        <Link to={"/"} className="inline-block  text-lg font-bold" id="logo">
          Re:Read
        </Link>
      </div>
      <nav className="flex flex-col gap-4 mt-4 ">
        <NavLink
          to={""}
          className="nav-icon inline-block logo p-6 bg-gray-100 rounded"
        />
        <Link
          to={""}
          className="nav-icon inline-block logo p-6 bg-gray-100 rounded"
        />
        <Link
          to={""}
          className="nav-icon inline-block logo p-6 bg-gray-100 rounded"
        />
      </nav>
    </div>
  );
};
export default Sidebar;
