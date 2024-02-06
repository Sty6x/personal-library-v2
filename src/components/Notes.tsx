const Note = ({ contents }: { contents: string }) => {
  return (
    <div className="cursor-pointer w-full note text-pretty mb-3 text-2xl grid h-[max-content] border-solid border-b-black py-6 border-b-2">
      {contents}
    </div>
  );
};
export default Note;
