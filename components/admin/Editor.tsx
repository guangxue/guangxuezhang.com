"use client";
import React from "react";
import { VimEditor } from "@/lib/VimEditor/VimEditor";
import { Highlights } from "@/lib/VimEditor/Highlights";
import { Inconsolata } from "next/font/google";
import { useSidebarRoutes } from "./RouterProvider";

const Incon = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inconsolata",
});

const Editor = () => {
  const [savePost, setSavePost] = React.useState<boolean>(false);
  const [trigger, setTrigger] = React.useState(false)
  const editorArea = React.useRef<HTMLTextAreaElement>(null);
  const { sidebarRoute } = useSidebarRoutes();

  React.useEffect(() => {
    // Edit post content based on the content
    if (sidebarRoute.content && editorArea.current) {
      editorArea.current.value = sidebarRoute.content;
      setTrigger(true);
    }
  }, [sidebarRoute, editorArea])

  function handleVimKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const editor = VimEditor(e);
    const action = editor.getAction(e.key);
    action && action();
  }

  function hightlightInputs(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
          console.log(msg.ok);
          if (editorArea.current) editorArea.current.value = "";
          setTrigger(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (trigger) {
      var evt = new Event('input', { bubbles: true });
      editorArea.current && editorArea.current.dispatchEvent(evt);
    }
    return () => {
      setSavePost(false);
      setTrigger(false);
    }
  }, [savePost, editorArea, trigger]);

  function addFrontMatterHandler() {
    const fm = "---\ntitle: \nslug: \ntags: \npublish: \nintro: \n---\n";
    if (editorArea.current) {
      editorArea.current.value = fm;
      setTrigger(true)
    }
  }

  return (
    <div className="editor-container basis-[80%] lg:basis-[85%]">
      <div className="editor-wrapper">
        <div className="editor-actions">
          <button className="text-black hover:text-sky-600">Preview</button>
          <button className="text-black hover:text-sky-600">Save as draft</button>
          <button className="text-black hover:text-sky-600" onClick={() => setSavePost(true)}>Publish</button>
          <button className="text-black hover:text-sky-600" onClick={addFrontMatterHandler}>
            Add FrontMatter
          </button>
        </div>
        <div className={`pre-editor-wrapper ${Incon.className}`}>
          <pre id="output"></pre>
          <textarea
            id="editor"
            onKeyDown={handleVimKeys}
            onInput={hightlightInputs}
            placeholder="Type something..."
            spellCheck="false"
            ref={editorArea}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
