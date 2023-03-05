import { InsertMode } from "./InsertMode";
import { NormalMode } from "./NormalMode";

interface Line{ LIDX: number, LLEN: number, LACC: number, LSTR: string };
interface EditorType {
	event: React.KeyboardEvent<HTMLTextAreaElement>;
	textArea: HTMLTextAreaElement;
	isReadonly: boolean;
	lenOfContent: number;
	caretStart: number;
	caretEnd: number;
	caret: number;
	LinesData: Line[];
	CLINE: Line;
	NLIDX: number;
	indexOfCline: number;
	aboveLine: Line | undefined;
	above2Line: Line | undefined;
	caretOfAboveLine: number;
	LineBelow: Function;
	caretOfBelowLine: Function;
	resetTextArea: Function;
	select: Function;
	setAttr: Function;
	removeAttr: Function;
	add: Function;
	pin: Function;
}

let Global = Object.create(null)
Object.defineProperties(Global, {
	CATCH_FUNC: {value: null, writable: true, enumerable: true},
	ELINE_FIXED_IDX: {value: -1, writable: true, enumerable: true},
	NL: {value: 1, enumerable: true},
	CARET: {value: 1, enumerable: true},
	LAST_CARET: {value: -1, writable: true, enumerable: true},
});


export const BasicObject = {
	add: function(name: string, body: any, writable: boolean) {
		Object.defineProperty(this, name, { value: body, enumerable: true})
	},
	on: function(key: string, action: Function){
		Object.defineProperty(this, key, {value: action, writable: true, enumerable: true});
	}
}
Object.setPrototypeOf(BasicObject, null)

const fn = (fnbody: Function) => { return fnbody() }

const VimEditor = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
	const editor: EditorType = Object.create(BasicObject);
// ------------------------------
// textArea attributes
	editor.add('event', event);
	editor.add('textArea', event.currentTarget);
	editor.add('isReadonly', event.currentTarget.getAttribute('readonly') ? true : false);
	editor.add('lenOfContent', event.currentTarget.value.length);
	editor.add('caretStart', event.currentTarget.selectionStart);
	editor.add('caretEnd', event.currentTarget.selectionEnd);
	editor.add('caret', event.currentTarget.selectionStart);

// -------------------------------
// textArea lines data
	editor.add('LinesData', fn(()=>{
		const lines = editor.textArea.value.split('\n');
		let ld:Line[] = [];
		const LastIDX  = lines.length-1;
		const lenOfContent = lines.reduce((accum:number, line:string, idx:number)=>{
			const NL = 1;
			idx !== LastIDX ? accum += line.length + NL : accum += line.length;
			let obj = Object.create(null);
			Object.defineProperties(obj, {
				LIDX: {value: idx, enumerable: true},
				LLEN: {value: line.length+NL, enumerable: true},
				LACC: {value: accum, enumerable: true},
				LSTR: {value: line, enumerable: true},
			})
			ld.push(obj)
			return accum;
		},0)
		return ld;
	}))
	editor.add('CLINE', fn(()=>{
		let cline = editor.LinesData.find((line:Line)=>{ return line.LACC > editor.caret })
		if(!cline) { cline = editor.LinesData[0] }
		return cline;
	}));
	editor.add('NLIDX', editor.CLINE.LIDX+1);
	editor.add('indexOfCline', fn(()=>{
		const currIdx = editor.CLINE ? editor.CLINE.LLEN-(editor.CLINE.LACC-editor.caret) : 0;
		return currIdx;
	 }));
	editor.add('aboveLine', fn(()=>{
		if(editor.LinesData && editor.LinesData.length >= 2 && editor.CLINE) {
			return editor.LinesData[editor.CLINE.LIDX-1]
		}
	}));
	editor.add('above2Line', fn(()=>{
		if(editor.LinesData && editor.LinesData.length >= 3 && editor.CLINE) {
			return editor.LinesData[editor.CLINE.LIDX-2]
		}
	}));
	editor.add('caretOfAboveLine', fn(()=>{
		if(editor.aboveLine && editor.aboveLine.LLEN < editor.indexOfCline) {
			return editor.aboveLine.LACC-Global.NL-Global.CARET }
		if(Global.ELINE_FIXED_IDX && editor.above2Line && editor.aboveLine && editor.aboveLine.LLEN > Global.ELINE_FIXED_IDX)  {
			return editor.above2Line.LACC + Global.ELINE_FIXED_IDX
		}else {
			return editor.above2Line && editor.above2Line.LACC + editor.indexOfCline
		}
	}));
	editor.add('LineBelow',()=>{
		if(!editor.LinesData[editor.NLIDX]) {
			throw editor.aboveLine && editor.aboveLine.LACC + Global.ELINE_FIXED_IDX
		}
		return editor.LinesData[editor.NLIDX];
	});
	editor.add('caretOfBelowLine',(()=>{
		try{
			const LB = editor.LineBelow();
			if(Global.ELINE_FIXED_IDX > 0) {
				return editor.CLINE.LACC + Global.ELINE_FIXED_IDX;
			}else {
				return editor.CLINE.LACC + editor.indexOfCline;
			}
		}catch(e) {
			console.log('-- Error of LineBelow --')
			console.log(e)
		}
	}));


// -------------------------------
// editor methods
	editor.add('resetTextArea', () => {
		const newRawtext = editor.textArea.value.replaceAll('\n\n', '\n \n')
		editor.textArea.value = newRawtext;
	})
	editor.add('pin', (startOffset:number, endOffset?:number) => {
		if(endOffset) {
			editor.textArea.setSelectionRange(startOffset, endOffset)
		}else {
			editor.textArea.setSelectionRange(startOffset, startOffset)
		}
	})
	editor.add('setAttr', (name: string, value: string) => {
		editor.textArea.setAttribute(name, value)});
	editor.add('removeAttr', (name: string) => {
		editor.textArea.removeAttribute(name);
	});

	const actions = (keyname: string) => {
		if(editor.isReadonly) {
			const normal = NormalMode(editor);
			const idx = Object.keys(normal).indexOf(keyname)
			if(Global.CATCH_FUNC) {
				const action = Global.CATCH_FUNC;
				return action(editor.event.key)
			}else{
				const action = idx >= 0 ? Object.values(normal).at(idx): null
				if(action && action.name.startsWith('$')) {
					Global.CATCH_FUNC = action;
				}
				return action;
			}
		}
		else {
			const insert = InsertMode(editor);
			const idx = Object.keys(insert).indexOf(keyname)
			const action = idx >= 0 ? Object.values(insert).at(idx) : ""
			return action;
		}
	}
	const VimEditor = Object.create(BasicObject);
	VimEditor.add('get', actions)

	return VimEditor;
}

export {
  Global,
  VimEditor
};
export type { EditorType };
