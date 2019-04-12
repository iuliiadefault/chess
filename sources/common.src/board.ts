import {Color} from "./color";
import {FigureType} from "./figureType";
import {Rook, Pawn, King, Queen, Bishop, Knight, Figure} from "./figures";

export class Board {
	
	constructor() { 
		this.init();
	}

	public getBoard(): string[] {
		return Object.keys(this.busy);
	}

	public getColor(id: string): Color{
		return this.busy[id].getColor();
	}

	public getType(id: string): FigureType{
		return this.busy[id].getType();
	}

	public move (from: string, to: string): void{
		delete this.busy[to];
		this.busy[to] = this.busy[from];
		delete this.busy[from];
	}

	public haveFigureOnField(id: string): boolean{
		return id in this.busy;
	}

	public getKingId(color: Color): string{
		for (const id in this.busy){
			if (this.busy[id].getColor() === color && this.busy[id].getType() === "king")
				return id;
		}
		return "";
	}

	public getKingMoves(color: Color): string[]{
		const idKing: string = this.getKingId(color);
		if (idKing === "")
			return [""];
		return (this.busy[idKing] as King).getPossibleMovesIfCheck(idKing, this.busy);
	}

	public setField(id: string, newType: FigureType, color: Color): void{
		if (newType === "pawn"){
			this.busy[id] = new Pawn(color);
		} else if (newType === "rook") {
			this.busy[id] = new Rook(color);			
		} else if (newType === "bishop") {
			this.busy[id] = new Bishop(color);			
		} else if (newType === "knight") {
			this.busy[id] = new Knight(color);			
		} else if (newType === "queen") {
			this.busy[id] = new Queen(color);			
		} else if (newType === "king") {
			this.busy[id] = new King(color);			
		}
	}

	public toJSON(): string{
		return JSON.stringify({
			busy: this.busy
		})
	}

	public getPossibleMoves(id: string): string[]{
		if (!this.haveFigureOnField(id))
			return new Array();
		return this.busy[id].getPossibleMoves(id, this.busy);
	}

	private init(): void{
		this.setField("a1", "rook", "white");
		this.setField("b1", "knight", "white");
		this.setField("c1", "bishop", "white");
		this.setField("d1", "queen", "white");
		this.setField("e1", "king", "white");
		this.setField("f1", "bishop", "white");
		this.setField("g1", "knight", "white");
		this.setField("h1", "rook", "white");
		this.setField("a2", "pawn", "white");
		this.setField("b2", "pawn", "white");
		this.setField("c2", "pawn", "white");
		this.setField("d2", "pawn", "white");
		this.setField("e2", "pawn", "white");
		this.setField("f2", "pawn", "white");
		this.setField("g2", "pawn", "white");
		this.setField("h2", "pawn", "white");

		this.setField("a8", "rook", "black");
		this.setField("b8", "knight", "black");
		this.setField("c8", "bishop", "black");
		this.setField("d8", "queen", "black");
		this.setField("e8", "king", "black");
		this.setField("f8", "bishop", "black");
		this.setField("g8", "knight", "black");
		this.setField("h8", "rook", "black");
		this.setField("a7", "pawn", "black");
		this.setField("b7", "pawn", "black");
		this.setField("c7", "pawn", "black");
		this.setField("d7", "pawn", "black");
		this.setField("e7", "pawn", "black");
		this.setField("f7", "pawn", "black");
		this.setField("g7", "pawn", "black");
		this.setField("h7", "pawn", "black");
	}

	private init1(): void{
		this.setField("e5", "queen", "white");
		this.setField("g1", "king", "white");
		this.setField("c4", "bishop", "white");
		this.setField("f2", "pawn", "white");
		this.setField("g2", "pawn", "white");
		this.setField("c5", "pawn", "white");

		this.setField("a1", "rook", "black");
		this.setField("f6", "knight", "black");
		this.setField("g8", "king", "black");
		this.setField("c6", "pawn", "black");
		this.setField("f7", "pawn", "black");
		this.setField("g7", "pawn", "black");
		this.setField("h6", "pawn", "black");
	}

	private busy: {[index: string]: Figure;} = {}
}