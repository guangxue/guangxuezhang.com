import { Global, EditorType, BasicObject } from "./VimEditor";

function rebuildTextArea(text: string) {
	const textBuilt = []
	for(const [i, char] of Object.entries(text)) {
		if(char == ' ') {
			const idx = parseInt(i, 10)
			textBuilt.push(idx+1)
		}
	}
	return textBuilt;	
}
const InsertMode = (editor: EditorType) => {
	const Motions = BasicObject.createMotion();
	Motions.on('Escape', function switchNormal() {
		Global.LAST_CARET = editor.caret;
		Global.ELINE_FIXED_IDX = editor.indexOfCline;
		editor.setAttr('readonly', 'true');
		const beforeLen = editor.textArea.value.length;
		editor.resetTextArea();
		const afterLen = editor.textArea.value.length;
		const diff = afterLen - beforeLen;
		if(diff > 0) {
			editor.pin(editor.caret+diff, editor.caret+diff+1)
		} else {
			if(Global.LAST_CARET) {
				editor.pin(Global.LAST_CARET-1, Global.LAST_CARET)
			}
		};
		const textBuilt = rebuildTextArea(editor.textArea.value);
		editor.add('wordIndexes', textBuilt)
	})
	Motions.on('Tab', function insertTab() {
		editor.event.preventDefault();
		const brk = editor.caret;
		const [textahead, textbehind] = editor.breaktext(brk);
		const newText = `${textahead}  ${textbehind}`;
		editor.textArea.value = newText;
		editor.textArea.dispatchEvent(new InputEvent('input', {bubbles: true}))
		editor.pin(brk+2);
	})
	
	return Motions;
}

export { InsertMode }