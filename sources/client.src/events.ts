//функции для вывода сообщений о состоянии игры

/*import {Config} from "../common.src/config";

function onStateChangeEvent(outputMoves: DOMString[], outputMessages: Element[], config: Config): boolean{
	if (!outputMoves || !outputMessages)
		return true;
	if (config.gameState === "checkmate"){
		outputMessages.textContent = config.playerColor + " win!";
		return true;
	}
	if (config.gameState === "pass"){
		outputMessages.textContent = "Opponent left the game";
		return true;
	}
	if (config.gameState === "white_check" || config.gameState === "black_check"){
		outputMessages.textContent = config.gameState;
		return false;
	}
	return false;
}

function onSendEvent(): void{
	if (!outputMessages)
		return;
	outputMessages.textContent = "Wait for your turn...";
}

export {onStateChangeEvent, onSendEvent}*/