"use client";
import React from "react";
import { VimEditor } from "@/lib/VimEditor/VimEditor";
import { Highlights } from "@/lib/VimEditor/Highlights";
import { Inconsolata } from "next/font/google";
import { useSidebarRoutes } from "./RouterProvider";
import { updatePostContent } from "@/utils/request";

const Incon = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inconsolata",
});

const Editor = () => {
  const [savePost, setSavePost] = React.useState<boolean>(false);
  const [updateContentOrNot, updateContent] = React.useState<boolean>(false);
  const [trigger, setTrigger] = React.useState(false)
  const editorArea = React.useRef<HTMLTextAreaElement>(null);
  const { sidebarState } = useSidebarRoutes();

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

  function addFrontMatterHandler() {
    const fm = "---\ntitle: \nslug: \ntags: \nlogo: \npublish: \nintro: \n---\n";
    if (editorArea.current) {
      editorArea.current.value = fm;
      setTrigger(true)
    }
  }

  React.useEffect(() => {
    // Edit post content based on the content
    if (sidebarState.editContent && editorArea.current) {
      editorArea.current.value = sidebarState.editContent;
      setTrigger(true);
    }
  }, [sidebarState, editorArea])

  /**
   *  createPost(data: string)
   *  updatePostById()
   */
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

  // Update Post Content by postId
  React.useEffect(() => {
    const pid = sidebarState.postId;
    if (updateContentOrNot) {
      const postContent = editorArea.current!.value;
      updatePostContent(pid, postContent).then(res => console.log(res)).catch(err => console.log(err));
    }
    return () => { updateContent(false) }
  }, [updateContentOrNot, editorArea, sidebarState])

  return (
    <div className="editor-container w-screen flex">
      <div className="editor-wrapper basis-full lg:basis-[60%] border border-gray-500 overflow-auto h-[78%] shadow-lg">
        <div className="editor-actions border-b border-gray-500 bg-slate-100 p-1 text-gray-600">
          {sidebarState.editContent ?
            <button className="px-4 py-2 text-center text-sm font-semibold hover:bg-slate-50 rounded" onClick={() => updateContent(true)}>Update</button> :
            <button className="px-4 py-2 text-center text-sm font-semibold hover:bg-slate-50 rounded" onClick={() => setSavePost(true)}>Publish</button>
          }
          <button className="px-4 py-2 text-center text-sm font-semibold hover:bg-slate-50 rounded">Preview</button>
          <button className="px-4 py-2 text-center text-sm font-semibold hover:bg-slate-50 rounded">Save as draft</button>
          <button className="px-4 py-2 text-center text-sm font-semibold hover:bg-slate-50 rounded" onClick={addFrontMatterHandler}>
            Add FrontMatter
          </button>
        </div>
        <div className={`pre-editor-wrapper ${Incon.className}`}>
          <pre id="output" className=" bg-white"></pre>
          <textarea
            id="editor"
            onKeyDown={handleVimKeys}
            onInput={hightlightInputs}
            placeholder="Type something..."
            spellCheck="false"
            ref={editorArea}
            rows={10}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
