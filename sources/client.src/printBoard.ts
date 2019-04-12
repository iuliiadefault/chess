import {Board} from "../common.src/board";
import {Color} from "../common.src/color";
import {FigureType} from "../common.src/figureType";

export function printBoard(board: Board): void{
	const x: ReadonlyArray<string> = ["a", "b", "c", "d", "e", "f", "g", "h"];
	const y: ReadonlyArray<string> = ["1", "2", "3", "4", "5", "6", "7", "8"];
	const container: Element = document.getElementsByClassName("grid-container")[0];
	
  for (let j = y.length - 1; j >= 0; j--) {
		for (let i = 0; i < x.length; i++) {
			const elem: Element = document.createElement("div");
			elem.classList.add("grid-item");
			elem.id = x[i]+y[j];
			container.appendChild(elem);
		}
	}
	for (const id of board.getBoard()){
		const elem = document.getElementById(id);
		if(elem)
			elem.classList.add("figure", board.getType(id) + "-" + board.getColor(id));
	}
}
