const PageNavigator = () => {
  return (
    <div
      id="page-nav-container"
      className="fixed top-[90%] bg-black rounded-md z-10"
    >
      <div className="py-2 px-5 flex gap-4">
        <button id="back" className="back-icon flex" />
        <div className="bg-[#ffffff] p-1 rounded" id="page-number">
          <span>12/120</span>
        </div>
        <button id="next" className="next-icon flex " />
      </div>
    </div>
  );
};

export default PageNavigator;
