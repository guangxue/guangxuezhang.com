"use client"
import './editor.css'
import React, {
	KeyboardEvent,
	useEffect,
	useRef,
} from 'react'

import {VimTextAreaEditor} from '@/utils/vimTextArea'

interface LDATA{
	LIDX: number,
	LLEN: number,
	LACC: number,
	LSTR: string,
}

const Editor = () => {
	const editorRef = useRef<HTMLTextAreaElement>(null);
		function addFrontMatter() {
		const initFrontMatter= "---\ntitle: \ntags: \npublish: \ndescription: \nslug: \n---\n";
		if(editorRef.current) {
			editorRef.current.value = '';
			editorRef.current.value = initFrontMatter;
		}
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
      	id='editor'
      	ref={editorRef}
      	onKeyDown={(e)=>{console.log(VimTextAreaEditor);VimTextAreaEditor.onMode(e)}}
      	placeholder="Type something..."
      	className="editor"
      	data-typing="true"
      	spellCheck="false"
      ></textarea>
		</div>
	)
}

export default Editor;