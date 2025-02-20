import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
interface Props {
  onChange: (content: string) => void;
}
const Editor = ({ onChange }: Props) => {
  return (
    <SunEditor
      onChange={onChange}
      setOptions={{
        showPathLabel: false,
        width: "100%",
        minHeight: "323px",
        buttonList: [
          /*  ["font", "fontSize", "formatBlock"], */
          ["bold", "underline", "italic", "strike"],
          ["fontColor"],
          ["outdent", "indent", "align", "horizontalRule", "list"],
        ],
      }}
    />
  );
};
export default Editor;
