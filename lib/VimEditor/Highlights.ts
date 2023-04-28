/* --- --- --- --- --- --- --- ---
| Avoid dangerously innerHTML from text editor, 
| It's better to re-create NodeList <code> I think.
| --- --- --- --- --- --- --- ---
| - General ideas:
| 1. `#text` inside html tags are basically non-break which means they are connected as a single #text Node.
| 2. In order to highlight keywords, all need to do is to replace keywords with `span` class.
|
| - With above knowledge in mind:
| 1. Get current inputText from `event.target.value`.
| 2. When encounter keywords replace it with `span` at the same time.
| 3. Combine above 1.(#text) and 2.(<span>) into a new NodeList i.e <code> NodeList
| 4. Replace firstChild of `pre` with newly created NodeList of <code>.
*/

function span(className: string, matchedStr: string) {
  const spanElement = document.createElement("span");
  const matchedText = document.createTextNode(matchedStr);
  spanElement.classList.add(className);
  spanElement.appendChild(matchedText);
  return spanElement;
}

let inputTracker: string[] = [];

const Highlights = (inputText: string, outputElement: HTMLElement) => {
  const Tokens = {
    dashes: /(?<=\n|^)(-{3})(?=\n)/g,
    kwords: /(?<=\n)(\w+)(?=:)/g,
    vwords: /(?<=:)(\s.+)(?=\n)/g,
    heading: /(?<=\n|^)(\#{1,6} .+)/g,
    olist: /(\d{1,3}\.)(?=\s)/g,
    lang: /(?<=`{3})(\w+)/g,
  };

  // insert current input text into <output> element textContent
  outputElement.textContent = inputText;

  // replace current inputText with highlights.
  function highlights(inputText: string) {
    for (const [tokname, tokexpr] of Object.entries(Tokens)) {
      inputText = inputText.replace(
        tokexpr,
        // `$@$<span class='${tokname}'>$1</span>$@$`
        `@^${tokname}&$1@^`
      );
    }
    return inputText;
  }

  // create a code NodeList placeholder
  let NodeTree: Node[] = [];

  // start re-creating NodeList
  // console.log("--- <before spliting> ---");
  const hiText = highlights(inputText);
  // console.log(hiText);
  const piText = hiText.split("@^");

  // console.log("--- after spliting ---");
  // console.log(piText);

  piText.map((segment) => {
    if (segment.includes("&")) {
      const [cls, str] = segment.split("&");
      NodeTree.push(span(cls, str));
    } else {
      NodeTree.push(document.createTextNode(segment));
    }
  });
  const codes = document.createElement("code");

  NodeTree.forEach((segment) => {
    codes.appendChild(segment);
  });

  // replace firstChild with newly created NodeList with Syntax Hightlighting.
  outputElement.firstChild?.replaceWith(codes);
};

export { Highlights };
