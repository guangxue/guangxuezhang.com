import { Global, EditorType, BasicObject } from "./VimEditor";

const NormalMode = (editor: EditorType) => {
	const Motions: any = BasicObject.createMotion();
	Motions.on('i', function switchInsertMode(caret?: number) {
		editor.event.preventDefault();
		editor.removeAttr('readonly')
		Global.CATCH_FUNC = null;
		Global.ELINE_FIXED_IDX = -1;
		if(caret) {
			editor.pin(caret, caret)
		}else {
			editor.pin(editor.caret, editor.caret)
		}
	})
	Motions.on('h', function MoveLeft(){
		Global.ELINE_FIXED_IDX = editor.indexOfCline;
		console.log(`Global.LAST_CARET: ${Global.LAST_CARET}`)
		// if(Global.LAST_CARET) {
		// 	editor.pin(editor.caret-1, Global.LAST_CARET);
		// }else {
		// 	editor.pin(editor.caret-1, editor.caret)
		// }
		editor.pin(editor.caret-1, editor.caret)
	})
	Motions.on('W', function JumpWordsForwardBySpace() {
		console.log('-- W --')
		console.log(editor.wordIndexes);
		console.log(editor.caret);
	})
	Motions.on('w', function JumpWordsForwardByMarker() {
	})
	Motions.on('l', function MoveRight(){
		Global.ELINE_FIXED_IDX = editor.indexOfCline;
		// if(Global.LAST_CARET) {
		// 	editor.pin(Global.LAST_CARET, editor.caret)
		// }else {
		// 	editor.pin(editor.caret+1, editor.caret+2);
		// }
		editor.pin(editor.caret+1, editor.caret+2);
	})
	Motions.on('B', function JumpWordsBackwordBySpace() {})
	Motions.on('k', function MoveUp(){
		if(editor.caretOfAboveLine) {
			editor.pin(editor.caretOfAboveLine, editor.caretOfAboveLine+1);
		}
	})
	Motions.on('j', function MoveDown(){
		const caret = editor.caretOfBelowLine()
		editor.pin(caret, caret+1)
	})
	Motions.on('f', function $_findNextChar(keyName: string) {
		if(keyName === 'Escape') { Global.CATCH_FUNC = null}
		const niOfnc = editor.CLINE.LSTR.indexOf(keyName, editor.indexOfCline);
		if(niOfnc > 0){
			const foundCaret = niOfnc-editor.indexOfCline;
			const nextCaret = editor.caret+foundCaret;
			editor.pin(nextCaret, nextCaret+1);
			Global.CATCH_FUNC = null;
		}
	})
	Motions.on('o', function addNewLineBelow(){
		const brk = editor.CLINE.LACC;
		const [textahead, textbehind] = editor.breaktext(brk);
		const newtext = textahead + ' \n'+textbehind;
		editor.setValue(newtext);
		Motions.i(brk);
	})
	Motions.on('Y', function $_copyCline(keyName: string) {
		if(keyName === 'Escape') {
			Motions.end();
		}
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
	Motions.on('r', function $_replaceWith(keyName: string) {
		if(keyName === 'Escape') { Global.CATCH_FUNC = null}
		const textToReplace = editor.textArea.value.substring(editor.caretStart, editor.caretEnd)
		if(keyName !== undefined && keyName !== 'Escape') {
			const [ta, tb] = editor.breaktext(editor.caretStart, editor.caretEnd);
			const newValue = `${ta}${keyName}${tb}`;
			editor.setValue(newValue);
			editor.pin(editor.caretStart, editor.caretEnd);
			Global.CATCH_FUNC = null;
		}
	})
	Motions.on('#', function $_countFunc(keyName: string) {
		console.log('# number #')
		console.log(`# cmmd name: ${keyName}`)
		if(keyName !== undefined) {
			console.log(Object.keys(Motions))
		}
		if(keyName == 'Escape') { Motions.end()}
	})
	Motions.on('v', function $_startVisual(keyName: string) {
		console.log('v')
		if(keyName === 'Escape') {
			Motions.end();
			Global.LAST_CARET = -1;
		}
		if(!Global.LAST_CARET) {
			console.log('[set] LAST_CARET')
			Global.LAST_CARET = editor.caret
		}
		Motions[keyName] && Motions[keyName]()
		// if(keyName !== 'v' && keyName) {
		// 	const motionFunc = Motions.get(keyName);
		// 	const operationFunc = Motions.get(keyName);
		// 	console.log('-- motion func -- ')
		// 	console.log(motionFunc)
		// 	console.log('-- opertiaon func -- ')
		// 	console.log(operationFunc)
		// }
	})
	return Motions;
}

export { NormalMode }