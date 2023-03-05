import { Global, EditorType } from "./TextContent";

const NormalMode = (editor: EditorType) => {
	const Motions: Record<string, any> = {
		on: function(key: string, action: Function){
			Object.defineProperty(this, key, {value: action, writable: true, enumerable: true});
		}
	}
	Object.setPrototypeOf(Motions, null)

	Motions.on('i', function switchInsertMode(caret?: number) {
		editor.event.preventDefault();
		editor.removeAttr('readonly')
		Global.CATCH_FUNC = null;
		Global.ELINE_FIXED_IDX = -1;
		if(caret) {
			console.log()
			editor.pin(caret, caret)
		}else {
			editor.pin(editor.caret, editor.caret)
		}
	})
	Motions.on('h', function MoveLeft(){
		Global.ELINE_FIXED_IDX = editor.indexOfCline;
		editor.pin(editor.caret-1, editor.caret);
	})
	Motions.on('l', function MoveRight(){
		console.log('MoveRight: chaning Global.ELINE_FIXED_IDX')
		Global.ELINE_FIXED_IDX = editor.indexOfCline;
		editor.pin(editor.caret+1, editor.caret+2);
	}) 
	Motions.on('k', function MoveUp(){
		console.log(`caret of Above line: ${editor.caretOfAboveLine}`)
		if(editor.caretOfAboveLine) {
			editor.pin(editor.caretOfAboveLine, editor.caretOfAboveLine+1);
		}
	})
	Motions.on('j', function MoveDown(){
		const caret = editor.caretOfBelowLine()
		editor.pin(caret, caret+1)
	})
	Motions.on('f', function $findNextChar(keyname: string) {
		if(keyname === 'Escape') { Global.CATCH_FUNC = null}
		const niOfnc = editor.CLINE.LSTR.indexOf(keyname, editor.indexOfCline);
		if(niOfnc > 0){
			const foundCaret = niOfnc-editor.indexOfCline;
			const nextCaret = editor.caret+foundCaret;
			editor.pin(nextCaret, nextCaret+1);
			Global.CATCH_FUNC = null;
		}
	})
	Motions.on('o', function addNewLineBelow(){
		const breaks = editor.CLINE.LACC;
		const textahead = editor.textArea.value.substring(0, breaks);
		const textbehind = editor.textArea.value.substring(breaks, editor.lenOfContent);
		const newtext = textahead + ' \n'+textbehind;
		editor.textArea.value = newtext;
		const c = editor.CLINE.LACC;
		Motions.i(c);
	})
	Motions.on('Y', function $seletCline() {
		console.log(editor.CLINE);
		const sol = editor.CLINE.LACC - editor.CLINE.LLEN;
		const eol = editor.CLINE.LACC
		editor.pin(sol, eol);
	})
	Motions.on('a', function moveAfterCursor(){
		Motions.i(editor.caret+1)
	})
	Motions.on('A', function moveAfterEOL(){
		Motions.i(editor.CLINE.LACC-1)
	})

	return Motions;
}
export { NormalMode }