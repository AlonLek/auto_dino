const dinoText = `      /oo\\
     |    |
 ^^  (vvvv)   ^^
 \\\\  /\\__/\\  //
  \\\\/      \\\//
   /        \\        
  |          |    ^  
  /          \\___/ | 
 (            )     |
  \\----------/     /
    //    \\\\_____/
   W       W`;
const cactusText = `    ,*-.
    |  |
    |  |
    |  |
,.  |  |
| |_|  | ,.
\`---.  |_| |
    |  .--\`
    |  |
    |  |
    |  |
    |  |`;

function buildIconFromText(txt){
	const result = document.createElement('div');
	result.appendChild(buildFromText(txt, 'pre'));
	result.style.fontSize = 4;
	result.style.fontWeight = 'bold';
	result.style.border = '1px solid orange';
	return result;
}

function buildFromText(txt, elementType){
	const result = document.createElement('div');
	result.style.padding = 0;
	result.style.margin = 0;
	for (let x of txt.split('\n')){
		const line = document.createElement(elementType);
		line.style.margin = 0;
		line.style.padding = 0;
		line.appendChild(document.createTextNode(x));
		result.appendChild(line);
	}
	
	return result;
}

function buildDino(){
	let dino = buildIconFromText(dinoText);
	return dino;
}

function buildCactus(){
	return buildIconFromText(cactusText);
}
