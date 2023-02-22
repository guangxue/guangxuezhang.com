import { League_Spartan } from "@next/font/google";

const VimKeyMapping: Record<string, string> = {
	k: 'MoveUp',
	j: 'MoveDown',
	h: 'MoveLeft',
	l: 'MoveRight',
	Escape: 'switchNormal',
	i: 'switchInsert',
	f: 'waitNextChar',
}


interface Line{
	LIDX: number,
	LLEN: number,
	LACC: number,
	LSTR: string,
}

class Editor {
	editor: HTMLTextAreaElement;
	content: string;
	LinesData: Line[];
	CLINE: Line | undefined;
	indexOfCline: number | undefined;
	caretStart: number;
	caretEnd: number;
	caret: number;
	aboveLine: Line | undefined;
	above2Line: Line | undefined;
	caretOfAboveLine: number | undefined;
	isReadonly: boolean;

	constructor(editor: HTMLTextAreaElement) {
		this.editor = editor;
		this.content = this.editor.value;
		this.caretStart = this.editor.selectionStart;
		this.caretEnd = this.editor.selectionEnd;
		this.caret = this.caretStart;
		this.LinesData = this.getLinesData();
		this.CLINE = this.getCLINE();
		this.indexOfCline = this.getIndexOfCline();
		this.aboveLine = this.getAboveLine();
		this.above2Line = this.getAbove2Line();
		this.caretOfAboveLine = this.getCaretOfAboveLine();
		this.isReadonly = this.checkReadonly();
	}
	checkReadonly(){
		if(this.getAttr('readonly')) {
			return true;
		}else { return false}
	}
	getAttr(name: string) {
		return this.editor.getAttribute(name);
	}
	setAttr(name:string, value: string) {
		this.editor.setAttribute(name, value);
	}
	removeAttr(name: string) {
		this.editor.removeAttribute(name);
	}
	getLinesData() {
		const lines = this.content.split('\n');
		let ld:Line[] = [];
		const lenOfContent = lines.reduce((accum, line, idx)=>{
			accum += line.length+1
			ld.push({
				LIDX: idx,
				LLEN: line.length+1, // add the newline char
				LACC: accum,
				LSTR: line,
			})
			return accum;
		},0)
		return ld;
	}
	getCLINE() {
		const cl = this.LinesData.find((line:Line)=>{
			return line.LACC > this.caret;
		})
		return cl;
	}
	getIndexOfCline(){
		if(this.CLINE) {
			return this.CLINE.LLEN - (this.CLINE.LACC - this.caret);
		}
	}
	getAboveLine() {
		if(this.LinesData && this.LinesData.length >= 2 && this.CLINE) {
			return this.LinesData[this.CLINE.LIDX-1]
		}
	}
	getAbove2Line() {
		if(this.LinesData && this.LinesData.length >= 3 && this.CLINE) {
			return this.LinesData[this.CLINE.LIDX-2]
		}
	}
	getCaretOfAboveLine() {
		if(this.aboveLine && this.above2Line && this.indexOfCline && this.aboveLine.LLEN < this.indexOfCline) {
			return this.aboveLine.LACC-2;
		}
		if(this.aboveLine && this.above2Line && this.indexOfCline && this.aboveLine.LLEN > this.indexOfCline)  {
			return this.above2Line.LACC + this.indexOfCline;
		}
	}
}

class Caret extends Editor {
	start: number;
	end: number;
	next: number
	prev: number
	constructor(public editor: HTMLTextAreaElement){
		super(editor);
		this.start = this.editor.selectionStart;
		this.end = this.editor.selectionEnd;
		this.next = this.start + 1;
		this.prev = this.start - 1;
	}
	set(startOffset: number, endOffset: number) {
		this.editor.setSelectionRange(startOffset, endOffset)
	}
	MoveLeft() {
		this.set(this.start, this.prev);
	}
	MoveRight() {
		this.set(this.start, this.next);
	}
	MoveUp() {

	}
}

class NormalMode extends Caret {

	constructor(public editor: HTMLTextAreaElement) {
		super(editor);
	}
	h() {
		console.log(this);
		this.set(this.caret-1, this.caret)
	}
	waitNextChar(char: string) {
		console.log(`next char: ${char}`)
	}
}

class InsertMode extends Caret {
	constructor(public editor: HTMLTextAreaElement) {
		super(editor);
	}
	action(key: string) {
		const IM = Object.create(null);
		Object.defineProperty(IM, 'Escape', {
			value: ()=>{ console.log(this.editor)}
		})
		return IM;
	}
	switchNormal() {
		console.log('wow! you called me')
		this.setAttr('readonly', 'true');
		this.set(this.caret-1, this.caret);
	}
}

class EditorRouter {
	event: React.KeyboardEvent;
	editor: Editor;
	textArea: HTMLTextAreaElement

 	constructor(event: React.KeyboardEvent<HTMLTextAreaElement>) {
 		this.event = event;
 		this.textArea = event.currentTarget;
		this.editor = new Editor(event.currentTarget);
	}
	route(key: string) {
		const command = VimKeyMapping[key];
		console.log(`command: ${command}`)
		if(this.editor.isReadonly) {
			const normal: Record<string, any> = new NormalMode(this.textArea);
			if(typeof normal[command] == 'function') {
				normal[command]();
			}
		}else {
			console.log('on Insert Mode');
			console.log(`Starts on Insert: for key:${key}`)
			const insert: Record<string, any> = new InsertMode(this.textArea);
			if(typeof insert[command] == 'function' && !command.includes('wait')) {
				insert[command]();
			}else if(typeof insert[command] == 'function' && command.includes('wait')) {

			}else {
				console.log('-> command is not a function')
			}
			// if(this.event.shiftKey && key == '') {
			// 	console.log('HOLD ctrl+w')
			// }
		}
	}
	// switchMode(modeName: string){
	// 	switch(modeName) {
	// 		case 'NORMAL':
	// 			this.editor.setAttr('readonly', 'true');
	// 			this.editor.content = this.editor.content.replaceAll('\n\n', '\n \n');
	// 			// this.caret.set(this.caret-1, this.caret);
	// 			// this.event.preventDefault();
	// 		break;
	// 		case 'INSERT':
	// 			// this.editor.removeAttr('readonly');
	// 			// this.caret.set(this.caret, this.caret);
	// 		break;
	// 	}
	// }
	// onNormalMode(key: string) {
	// 	if(key === INSERT) {this.switchMode('INSERT')}
	// 	// if(key === Left) {this.caret.up()}
	// 	// if(key === Right) {this.caret.right()}
	// 	if(key === Up) {
			
	// 	}
	// 	// if(key === Down) {}
	// }
	// onInsertMode(key: string) {
	// 	if(key === ESC) { this.switchMode('NORMAL') }
	// }
}


let VimTextAreaEditor = Object.create(null);
Object.defineProperty(VimTextAreaEditor, 'onMode', {
	value: (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{new EditorRouter(e).route(e.key)},
})

export {
	VimTextAreaEditor,
};