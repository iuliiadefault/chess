import {Board} from "../common.src/board";
import {Config} from "../common.src/config";
import {Color} from "../common.src/color";

export function moveFigures(board: Board, config: Config, myColor: Color): void{
	if (config.playerColor !== myColor)
		return;
	
	const elemFrom = document.getElementById(config.from as string);
	const elemTo = document.getElementById(config.to as string);
	if (!elemFrom || !elemTo)
		return;
	elemTo.className = elemFrom.className;
	elemFrom.className = elemFrom.classList[0];
	board.move(config.from as string, config.to as string);
}

