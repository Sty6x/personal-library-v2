import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const InputField = ({
  inputTitle,
  handleSave,
  id,
  handleCancelNoteEdit,
  initialValue,
}: {
  initialValue: string;
  inputTitle: string;
  handleSave: (initialValue: string, noteID: string) => void;
  handleCancelNoteEdit: () => void;
  id: string;
}) => {
  const [editorState, setEditorState] = useState<{
    value: string;
    text: string;
  }>({ value: initialValue, text: initialValue });
  return (
    <div className="relative">
      <span className="absolute w-full px-4 top-1 flex justify-between ">
        <p className="inline-block font-semibold text-xl">{inputTitle}</p>
        <span className="flex gap-4 ">
          <button
            className="hover:underline font-semibold"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSave(editorState.text, id);
            }}
          >
            Done
          </button>
          <button className="hover:underline" onClick={handleCancelNoteEdit}>
            Cancel
          </button>
        </span>
      </span>
      <ReactQuill
        modules={{ toolbar: [] }}
        theme="snow"
        value={editorState.value}
        onChange={(value, delta, source, editor) => {
          setEditorState({ value, text: editor.getText() });
        }}
      />
    </div>
  );
};
export default InputField;
