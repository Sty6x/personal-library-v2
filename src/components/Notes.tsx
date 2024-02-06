interface t_dragEvents {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}
const Note = ({
  contents,
  id,
  dragEvents: { onDragStart, onDrop, onDragOver },
}: {
  contents: string;
  id: string;
  dragEvents: t_dragEvents;
}) => {
  return (
    <div
      id={id}
      draggable={true}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="cursor-pointer w-full note text-pretty mb-3 text-2xl grid h-[max-content] border-solid border-b-black py-6 border-b-2"
    >
      {contents}
    </div>
  );
};
export default Note;
