import {Board} from "./board";
import {GameState} from "./gameState";
import {Color} from "./color";
import {Figure} from "./figures";
import {FigureType} from "./figureType";
import {Config} from "./config";

export class Game{
	constructor(){
		this.config = {
			from: null,
			to: null,
			playerColor: "white",
			gameState: "normal",
			message: null
		}
		this.board = new Board();
	}

	public getPlayerColor(): Color{
		return this.config.playerColor;
	}

	public getState(): GameState{
		return this.config.gameState;
	}

	public pass(): void{
		this.config.gameState = "pass";
	}

	public toJSON(): string{
		return JSON.stringify(this.config);
	}

	public move(from: string, to: string): void{
		if (!this.board.haveFigureOnField(from)){
			this.config.message = "cheater";
			this.pass();
			return;			
		}
		if (!this.board.getPossibleMoves(from).includes(to)){
			this.config.message = "cheater";
			this.pass();
			return;
		}
		this.config.from = from;
		this.config.to = to;
		this.board.move(from, to);
		this.switchState();
		this.toggleColor();
		this.switchState();
	}

	private switchState(): void{
		if (this.isCheck()){
			if (this.isMate()){
				this.toggleColor();
				this.config.gameState = "checkmate";
				return;
			}
			this.config.gameState = this.getPlayerColor() as string + "_check" as GameState;
		}
		else
			this.config.gameState = "normal";
	}

	private isMate(): boolean{
		if (this.board.getKingMoves(this.getPlayerColor()).toString() === "")
			return true;
		return false;
	}

	private isCheck(): boolean{
		const idKing: string = this.board.getKingId(this.getPlayerColor());
		if (!+idKing)
			return true;
		for (const id of this.board.getBoard()){
			if (this.board.getColor(id) === this.getPlayerColor())
				continue;
			if (this.board.getPossibleMoves(id).includes(idKing)){
				return true;
			}
		}
		return false;
	}

	private toggleColor(): void{
		if (this.getPlayerColor() === "white"){
			this.config.playerColor = "black";
			return;
		}
		this.config.playerColor = "white";
	}

	private board: Board;
	private config: Config;
}