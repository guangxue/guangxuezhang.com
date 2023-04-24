import { InsertMode } from "./InsertMode";
import { NormalMode } from "./NormalMode";

let Global = Object.create(null)
Object.defineProperties(Global, {
	CATCH_FUNC: {value: null, writable: true, enumerable: true},
	ELINE_FIXED_IDX: {value: -1, writable: true, enumerable: true},
	NL: {value: 1, enumerable: true},
	CARET: {value: 1, enumerable: true},
	LAST_CARET: {value: -1, writable: true, enumerable: true},
});

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
	caretOfBelowLine: Function;
	LineBelow: Function;
	resetTextArea: Function;
	select: Function;
	setAttr: Function;
	removeAttr: Function;
	add: Function;
	pin: Function;
	breaktext: Function;
	setValue: Function;
	endIndexOfCLINE: Number;
	wordIndexes: Array<Number>;
	testMsg: string;
}


export const BasicObject = {
	createObject: function() {
		const OBJ = {
			add: function(propName: string, propBody: any){
				Object.defineProperty(this, propName, {value: propBody, writable: true, enumerable: true, configurable:true});
			}
		}
		Object.setPrototypeOf(OBJ, null);
		Object.defineProperty(OBJ, 'add', {enumerable:false});
		return Object.create(OBJ)
	},
	createMotion: function() {
		const Motions = {
			on: function(key: string, action: Function){
				action.prototype = null;
				Object.setPrototypeOf(action, null);
				Object.defineProperty(this, key, {value: action, writable: true, enumerable: true});
			},
			end: function() {
				Global.CATCH_FUNC = null;
			},
			get: function(actionKey: string) {
				const keystr = parseInt(actionKey) >0 && parseInt(actionKey)<=9 ? '#': actionKey;
				const idx = Object.keys(this).indexOf(keystr);
				if(Global.CATCH_FUNC) {
					const action = Global.CATCH_FUNC;
					return action(actionKey)
				} else {
					const action = idx >= 0 ? Object.values(this).at(idx): null;
					if(action && action.name.slice(0, 2) == '$_') {
						Global.CATCH_FUNC = action;
					}
					return action;
				}
			},
		}
		Object.setPrototypeOf(Motions, null)
		Object.defineProperties(Motions, {
			on: {enumerable: false},
			get: {enumerable: false},
			end: {enumerable: false},
		});
		Motions.on.prototype = null
		Motions.get.prototype = null
		Motions.end.prototype = null
		return Motions;
	},
	create: function() {return Object.create(null)},
}
Object.setPrototypeOf(BasicObject, null)
const fn = (fnbody: Function) => { return fnbody() }





const editor: EditorType = BasicObject.createObject();
const VimEditor = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

// ------------------------------
// textArea attributes
	editor.add('event', event);
	editor.add('textArea', event.currentTarget);
	editor.add('isReadonly', event.currentTarget.getAttribute('readonly') ? true : false);
	editor.add('lenOfContent', event.currentTarget.value.length);
	editor.add('caretStart', event.currentTarget.selectionStart);
	editor.add('caretEnd', event.currentTarget.selectionEnd);
	editor.add('caret', event.currentTarget.selectionStart);
	editor.add('isset_elidx', fn(()=>{
		return Global.ELINE_FIXED_IDX > 0
	}))



	// console.log(editor.textArea.value)




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
	editor.add('endIndexOfCLINE', editor.CLINE.LACC);
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
		return editor.LinesData[editor.NLIDX]
	});
	editor.add('caretOfBelowLine', ()=>{
		const NLine = editor.LineBelow();
		if(NLine) {
			const nextIdx = Global.ELINE_FIXED_IDX > 0 ? Global.ELINE_FIXED_IDX : editor.indexOfCline;
			const nextCaret = nextIdx > NLine.LSTR.length ? NLine.LACC - 2 : editor.CLINE.LACC+nextIdx;
			return nextCaret;
		}
	});


// -------------------------------
// editor motions and operators commands
	editor.add('motions', ['k', 'j', 'w', 'W', 'l', 'h'])
	editor.add('operators', ['c', 'd', 'y', '~'])

// -------------------------------
// editor functions
	editor.add('resetTextArea', () => {
		const newRawtext = editor.textArea.value.replaceAll('\n\n', '\n \n')
		editor.textArea.value = newRawtext;
	})
	editor.add('pin', (start: number, end?: number) => {
		if(end) {
			editor.textArea.setSelectionRange(start, end)
		}else {
			editor.textArea.setSelectionRange(start, start)
		}
	})
	editor.add('setAttr', (name: string, value: string) => {
		editor.textArea.setAttribute(name, value)});
	editor.add('removeAttr', (name: string) => {
		editor.textArea.removeAttribute(name);
	});
	editor.add('breaktext', (breakpoint: number, joinAt?: number)=>{
		const textahead = editor.textArea.value.substring(0, breakpoint);
		const textbehind = joinAt ?
			editor.textArea.value.substring(joinAt, editor.lenOfContent) :
			editor.textArea.value.substring(breakpoint, editor.lenOfContent);
		return [textahead, textbehind];
	})
	editor.add('setValue', (value: string)=>{
		editor.textArea.value = value;
	})

	const VimEditor = BasicObject.createObject();
	VimEditor.add('getAction', (keyName: string)=>{
		if(editor.isReadonly) {
			const normalMotions = NormalMode(editor);
			const keyAction = normalMotions.get(editor.event.key)
			return keyAction;
		}
		else {
			const insertMotions = InsertMode(editor);
			const keyAction = insertMotions.get(keyName)
			return keyAction;
		}
	})
	VimEditor.add('get', (prop: string)=>{
		for(const [key, val] of Object.entries(editor)) {
			if(key === prop) {
				return val;
			}
		}
	})
	return VimEditor;
}

export {
  Global,
  VimEditor
};
export type { EditorType };
