"use client";
import React from "react";
import { VimEditor } from "@/lib/VimEditor/VimEditor";
import { Highlights } from "@/lib/VimEditor/Highlights";
import { useRouter } from "next/navigation";

const Editor = () => {
  const [savePost, setSavePost] = React.useState<boolean>(false);
  const editorArea = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const editor = VimEditor(e);
    const action = editor.getAction(e.key);
    action && action();
  }
  function handleInputText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (editorArea.current) {
      editorArea.current.style.height = "auto";
      editorArea.current.style.height = `${e.target.scrollHeight - 1}px`;
    }
    const inputText = e.currentTarget.value;
    const outputElement = document.getElementById("output")!;
    Highlights(inputText, outputElement);
  }
  React.useEffect(() => {
    const postContent = editorArea.current?.value;
    if (postContent && savePost) {
      fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postContent),
      })
        .then((res) => {
          return res.json();
        })
        .then((msg) => {
          console.log("Response Message: ", msg);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      setSavePost(false);
    };
  }, [savePost, router]);

  return (
    <div className="editor-container grow">
      <div className="editor-wrapper">
        <div className="editor-actions">
          <button className="text-black hover:text-sky-600">Preview</button>
          <button
            onClick={() => setSavePost(true)}
            className="text-black hover:text-sky-600"
          >
            Save
          </button>
          <button className="text-black hover:text-sky-600">Publish</button>
          <button className="text-black hover:text-sky-600">
            Add FrontMatter
          </button>
        </div>
        <div className="pre-editor-wrapper">
          <pre id="output"></pre>
          <textarea
            id="editor"
            onKeyDown={handleKeyDown}
            onInput={handleInputText}
            placeholder="Type something..."
            className="editor"
            spellCheck="false"
            ref={editorArea}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
