"use client"
import './editor.css'
import React, { useEffect, useRef, useState } from 'react'
import { VimEditor } from '@/utils/VimEditorTextArea/TextContent'

const Editor = () => {
	const editorRef = useRef<HTMLTextAreaElement>(null);
	function addFrontMatter() {
		const initFrontMatter= "---\ntitle: \ntags: \npublish: \ndescription: \nslug: \n---\n";
		if(editorRef.current) {
			editorRef.current.value = '';
			editorRef.current.value = initFrontMatter;
		}
	}
	function handlerKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		const editor = VimEditor(e);
		const action = editor.get(e.key)
		action && action()
	}
	return (
		<div className="editor-wrapper">
			<div className="editor-actions">
      	<button className='text-black hover:text-sky-600'>Preview</button>
      	<button className='text-black hover:text-sky-600'>Save</button>
      	<button className='text-black hover:text-sky-600'>Publish</button>
      	<button className='text-black hover:text-sky-600' onClick={addFrontMatter}>Add FrontMatter</button>
      </div>
      <textarea
      	ref={editorRef}
      	id="editor"
      	onKeyDown={handlerKeyDown}
      	placeholder="Type something..."
      	className="editor"
      	spellCheck="false"
      ></textarea>
		</div>
	)
}

export default Editor;