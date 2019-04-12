import {printBoard} from "./printBoard";
import {Board} from "../common.src/board";
import {Color} from "../common.src/color";
import {moveFigures} from "./manipulations";
import {Config} from "../common.src/config";
import {Figure} from "../common.src/figures";

let myColor: Color;
const socket = new WebSocket( 'ws://localhost:8080' );
const board = new Board();
const outputMoves = document.querySelector( 'output.moves' );
const outputMessages = document.querySelector( 'output.messages' );
const moveList: string[] = new Array;
let config: Config = {
	from: null,
	to: null,
	playerColor: "white",
	gameState: "normal",
	message: null
}

socket.addEventListener('open', () =>	{
	printBoard(board);
	addListenersToBoard(board, socket);
});

socket.addEventListener('message',( event ) => {
	if (!outputMoves || !outputMessages)
		return;

	if (!myColor){
		const startConfig = JSON.parse( event.data );
		myColor = startConfig.color;
		config.gameState = startConfig.gameState;
		console.log("Your color: ", myColor);
		onStateChangeEvent();			
		return;
	}

	config = JSON.parse( event.data );
	if (onStateChangeEvent())
		return;
	printMoves();
	moveFigures(board, config, myColor);
	console.log("Current config: ", config);
	config.to = null;
	config.from = null;
});

function onStateChangeEvent(): boolean{
	if (!outputMessages)
		return true;
	switch (config.gameState){
		case "normal":
			if (config.playerColor === myColor){
				outputMessages.textContent = "Your turn";
				return false;
			}
			break;
		case "checkmate":
			outputMessages.textContent = "Checkmate: " + config.playerColor + " win!";
			socket.close();
			return false;
		case "pass":
			outputMessages.textContent = "Opponent left the game";
			return true;
		case "white_check":
		case "black_check":
			if(config.playerColor === myColor){
				outputMessages.textContent = config.gameState;
				return false;
			}
	}
	return false;
}

function printMoves(): void{
	if (!outputMoves)
		return;
	moveList.push(("" + config.from).toUpperCase() + " - " + ("" + config.to).toUpperCase());
	outputMoves.textContent = moveList.join( '\n' );	
}

function addListenersToBoard(board: Board, socket: WebSocket): void{
	const elements = document.getElementsByClassName('grid-item');
	if (!elements)
		return;
	let moves: string[] = new Array;
	for (let i = 0; i < elements.length; i++){
		let elem = elements[i];
		elem.addEventListener("click", function (){
			if (elem === document.getElementsByClassName('selected')[0]){
				toggleSelection(document.getElementsByClassName('selected')[0], moves);
				config.from = null;
				return;
			}
			if (config.to)
				return;

			if (config.playerColor !== myColor)
				return;

			if (!config.from && !isMineFigure(elem))
				return;

			if (!(config.from) && isMineFigure(elem)){
				if (config.gameState.includes("_check") && board.getType(elem.id) === "king"){
					config.from = elem.id;
					moves = board.getKingMoves(myColor);
					toggleSelection(elem, moves);
					return;
				}
				config.from = elem.id;
				moves = board.getPossibleMoves(elem.id);
				toggleSelection(elem, moves);
				return;
			} 

			if (config.from && isMineFigure(elem)){
				toggleSelection(document.getElementsByClassName('selected')[0], moves);
				config.from = elem.id;
				moves = board.getPossibleMoves(elem.id);
				toggleSelection(elem, moves);
				return;
			}

			//from задан, to зададим только в случае соответствия возможным ходам
			if (moves.includes(elem.id)){
				config.to = elem.id;
				toggleSelection(document.getElementsByClassName('selected')[0], moves);
				moveFigures(board, config, myColor);
				socket.send(JSON.stringify({from: config.from, to: config.to}));
				onSendEvent();
				return;
			}
		}); 
	}

	function onSendEvent(): void{
		if (!outputMessages)
			return;
		outputMessages.textContent = "Wait for your turn...";
	}

	function toggleSelection(elem: Element, moves: string[]): void{
		elem.classList.toggle("selected");
		moves.forEach((value) => {
			const cur = document.getElementById(value);
			if (!cur)
				return;
			cur.classList.toggle("move");
		})
	}

	function isMineFigure(element: Element): boolean {
		const classes = element.classList;
    if (!classes.contains("figure"))
      return false;
		const color: Color = board.getColor(element.id);
		return color === myColor;
	}
}

socket.addEventListener('close', () =>	{
	if (!outputMessages || config.gameState === "checkmate")
		return;
	outputMessages.textContent = "Connection was closed";
});