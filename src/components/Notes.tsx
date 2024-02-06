const Note = ({ contents }: { contents: string }) => {
  return (
    <div className="w-full note text-pretty mb-3  text-2xl grid place-items-center h-[max-content] border-solid border-b-black py-6 border-b-2">
      {contents}
    </div>
  );
};
export default Note;
