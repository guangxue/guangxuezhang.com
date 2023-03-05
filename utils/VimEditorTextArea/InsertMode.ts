import { Global, EditorType } from "./TextContent";


const InsertMode = (editor: EditorType) => {

	const Motions = {
		on: function(key: string, action: Function){
			Object.defineProperty(this, key, {value: action, writable: true, enumerable: true});
		}
	}
	Object.setPrototypeOf(Motions, null)
	Object.defineProperty(Motions, 'on', {enumerable:false});

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
		}else {
			if(Global.LAST_CARET) {
				editor.pin(Global.LAST_CARET-1, Global.LAST_CARET)
			}
		};
	})
	
	return Motions;
}

export { InsertMode }