import {FigureType} from "./figureType";
import {Color} from "./color";

export abstract class Figure {
	constructor(newType: FigureType, newColor: Color) {
		this.type = newType;
		this.color = newColor;
	}

	public getColor(): Color{
		return this.color;
	}

	public getType(): FigureType{
		return this.type;
	}

	public toJSON(): string {
		return JSON.stringify({
			type: this.type,
			color: this.color
		})
	}

	public abstract getPossibleMoves(pos: string, busy: {[index: string]: Figure;}): string[];

	protected type: FigureType;
	protected color: Color;
}

export class Pawn extends Figure{
	constructor(newColor: Color){
		super("pawn", newColor);
	}

	//решение о возможных ходах принимается на уровне фигуры, но с учетом текущего состояния доски
	public getPossibleMoves(pos: string, busy: {[index: string]: Figure;}): string[]{
		//// console.log("Try to get moves from " + this.type + " " + pos);
		const res: string[] = new Array();
		const arrX: ReadonlyArray<string> = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const x: number = arrX.indexOf(pos[0]);
		const y: number = +pos[1];
		switch (this.color){
			case "black": 
				if (y === 7){
					if (!(arrX[x] + 6 in busy)){
						res.push(arrX[x] + 6);
						if (!(arrX[x] + 5 in busy))
							res.push(arrX[x] + 5);
					}
				} else if (y !== 1 && !(arrX[x] + (y - 1) in busy)){
					res.push(arrX[x] + (y - 1));
				}
				if ((arrX[x-1] + (y-1)) in busy && busy[arrX[x-1] + (y-1)].getColor() != this.color)
					res.push(arrX[x-1] + (y-1));
				if ((arrX[x+1] + (y-1)) in busy && busy[arrX[x+1] + (y-1)].getColor() != this.color)
					res.push(arrX[x+1] + (y-1));
				break;
			case "white":
				if (y === 2){
					if (!(arrX[x] + 3 in busy)){
						res.push(arrX[x] + 3);
						if (!(arrX[x] + 4 in busy))
							res.push(arrX[x] + 4);
					}
				} else if (y !== 8 && !(arrX[x] + (y + 1) in busy)){
					res.push(arrX[x] + (y + 1));
				}
				if ((arrX[x-1] + (y+1)) in busy && busy[arrX[x-1] + (y+1)].getColor() != this.color)
					res.push(arrX[x-1] + (y+1));
				if ((arrX[x+1] + (y+1)) in busy && busy[arrX[x+1] + (y+1)].getColor() != this.color)
					res.push(arrX[x+1] + (y+1));
				break;
		}
		return res;
	}
}

export class Rook extends Figure{
	constructor(newColor: Color){
		super("rook", newColor);
	}

	public getPossibleMoves(pos: string, busy: {[index: string]: Figure;}): string[]{
		//console.log("Try to get moves from " + this.type + " " + pos);
		const res: string[] = new Array();
		const arrX: ReadonlyArray<string> = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const x: number = arrX.indexOf(pos[0]);
		const y: number = +pos[1];
		let cur = x + 1;
		while (cur < arrX.length){
			if (arrX[cur] + y in busy){
				if (busy[arrX[cur] + y].getColor() !== this.color)
					res.push(arrX[cur] + y);
				break;
			}
			res.push(arrX[cur] + y);
			cur++;
		}

		cur = x - 1;
		while (cur >= 0){
			if (arrX[cur] + y in busy){
				if (busy[arrX[cur] + y].getColor() !== this.color)
					res.push(arrX[cur] + y);
				break;
			}
			res.push(arrX[cur] + y);
			cur--;
		}

		cur = y + 1;
		while (cur <= 8){
			if (arrX[x] + cur in busy){
				if (busy[arrX[x] + cur].getColor() !== this.color)
					res.push(arrX[x] + cur);
				break;
			}
			res.push(arrX[x] + cur);
			cur++;
		}

		cur = y - 1;
		while (cur >= 1){
			if (arrX[x] + cur in busy){
				if (busy[arrX[x] + cur].getColor() !== this.color)
					res.push(arrX[x] + cur);
				break;
			}
			res.push(arrX[x] + cur);
			cur--;
		}
		return res;
	}
}

export class Bishop extends Figure{
	constructor(newColor: Color){
		super("bishop", newColor);
	}

	public getPossibleMoves(pos: string, busy: {[index: string]: Figure;}): string[]{
		//console.log("Try to get moves from " + this.type + " " + pos);
		const res: string[] = new Array();
		const arrX: ReadonlyArray<string> = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const x: number = arrX.indexOf(pos[0]);
		const y: number = +pos[1];
		let curX = x + 1;
		let curY = y + 1;
		while(curY <= 8 && curX < 8){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX++;
			curY++;
		}

		curX = x + 1;
		curY = y - 1;
		while(curY >= 1 && curX < 8){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX++;
			curY--;
		}

		curX = x - 1;
		curY = y - 1;
		while(curY >= 1 && curX >= 0){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX--;
			curY--;
		}

		curX = x - 1;
		curY = y + 1;
		while(curY <= 8 && curX >= 0){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX--;
			curY++;
		}
		return res;
	}
}

export class Knight extends Figure{
	constructor(newColor: Color){
		super("knight", newColor);
	}

	public getPossibleMoves(pos: string, busy: {[index: string]: Figure;}): string[]{
		//console.log("Try to get moves from " + this.type + " " + pos);
		const res: string[] = new Array();
		const arrX: ReadonlyArray<string> = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const x: number = arrX.indexOf(pos[0]);
		const y: number = +pos[1];
		if ((x < 6) && (y >= 2)){
			if (!(arrX[x + 2] + (y - 1) in busy))
				res.push(arrX[x + 2] + (y - 1));
			else if (busy[arrX[x + 2] + (y - 1)].getColor() !== this.color)
				res.push(arrX[x + 2] + (y - 1));
		}

		if ((x < 7) && (y >= 3)){
			if (!(arrX[x + 1] + (y - 2) in busy))
				res.push(arrX[x + 1] + (y - 2));
			else if (busy[arrX[x + 1] + (y - 2)].getColor() !== this.color)
				res.push(arrX[x + 1] + (y - 2));
		}

		if ((x >= 2) && (y >= 3)){
			if (!(arrX[x - 1] + (y - 2) in busy))
				res.push(arrX[x - 1] + (y - 2));
			else if (busy[arrX[x - 1] + (y - 2)].getColor() !== this.color)
				res.push(arrX[x - 1] + (y - 2));
		}

		if ((x >= 2) && (y >= 2)){
			if (!(arrX[x - 2] + (y - 1) in busy))
				res.push(arrX[x - 2] + (y - 1));
			else if (busy[arrX[x - 2] + (y - 1)].getColor() !== this.color)
				res.push(arrX[x - 2] + (y - 1));
		}

		if ((x >= 2) && (y <= 7)){
			if (!(arrX[x - 2] + (y + 1) in busy))
				res.push(arrX[x - 2] + (y + 1));
			else if (busy[arrX[x - 2] + (y + 1)].getColor() !== this.color)
				res.push(arrX[x - 2] + (y + 1));
		}

		if ((x >= 1) && (y <= 6)){
			if (!(arrX[x - 1] + (y + 2) in busy))
				res.push(arrX[x - 1] + (y + 2));
			else if (busy[arrX[x - 1] + (y + 2)].getColor() !== this.color)
				res.push(arrX[x - 1] + (y + 2));
		}

		if ((x < 7) && (y <= 6)){
			if (!(arrX[x + 1] + (y + 2) in busy))
				res.push(arrX[x + 1] + (y + 2));
			else if (busy[arrX[x + 1] + (y + 2)].getColor() !== this.color)
				res.push(arrX[x + 1] + (y + 2));
		}

		if ((x < 6) && (y <= 7)){
			if (!(arrX[x + 2] + (y + 1) in busy))
				res.push(arrX[x + 2] + (y + 1));
			else if (busy[arrX[x + 2] + (y + 1)].getColor() !== this.color)
				res.push(arrX[x + 2] + (y + 1));
		}

		return res;
	}
}

export class Queen extends Figure{
	constructor(newColor: Color){
		super("queen", newColor);
	}

	public getPossibleMoves(pos: string, busy: {[index: string]: Figure;}): string[]{
		//console.log("Try to get moves from " + this.type + " " + pos);
		const res: string[] = new Array();
		const arrX: ReadonlyArray<string> = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const x: number = arrX.indexOf(pos[0]);
		const y: number = +pos[1];

		let cur = x + 1;
		while (cur < arrX.length){
			if (arrX[cur] + y in busy){
				if (busy[arrX[cur] + y].getColor() !== this.color)
					res.push(arrX[cur] + y);
				break;
			}
			res.push(arrX[cur] + y);
			cur++;
		}

		cur = x - 1;
		while (cur >= 0){
			if (arrX[cur] + y in busy){
				if (busy[arrX[cur] + y].getColor() !== this.color)
					res.push(arrX[cur] + y);
				break;
			}
			res.push(arrX[cur] + y);
			cur--;
		}

		cur = y + 1;
		while (cur <= 8){
			if (arrX[x] + cur in busy){
				if (busy[arrX[x] + cur].getColor() !== this.color)
					res.push(arrX[x] + cur);
				break;
			}
			res.push(arrX[x] + cur);
			cur++;
		}

		cur = y - 1;
		while (cur >= 1){
			if (arrX[x] + cur in busy){
				if (busy[arrX[x] + cur].getColor() !== this.color)
					res.push(arrX[x] + cur);
				break;
			}
			res.push(arrX[x] + cur);
			cur--;
		}

		let curX = x + 1;
		let curY = y + 1;
		while(curY <= 8 && curX < 8){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX++;
			curY++;
		}

		curX = x + 1;
		curY = y - 1;
		while(curY >= 1 && curX < 8){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX++;
			curY--;
		}

		curX = x - 1;
		curY = y - 1;
		while(curY >= 1 && curX >= 0){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX--;
			curY--;
		}

		curX = x - 1;
		curY = y + 1;
		while(curY <= 8 && curX >= 0){
			if (arrX[curX] + curY in busy){
				if (busy[arrX[curX] + curY].getColor() !== this.color)
					res.push(arrX[curX] + curY);
				break;
			}
			res.push(arrX[curX] + curY);
			curX--;
			curY++;
		}
		return res;
	}
}

export class King extends Figure{
	constructor(newColor: Color){
		super("king", newColor);
	}

	public getPossibleMovesIfCheck(pos: string, busy: {[index: string]: Figure;}): string[]{
		let opponentPossibleMoves: string[] = new Array();
		for (const id in busy){
			if (busy[id].getColor() === this.getColor())
				continue;
			opponentPossibleMoves = opponentPossibleMoves.concat(busy[id].getPossibleMoves(id, busy));
		}
		const res: string[] = this.getPossibleMoves(pos, busy);
		return res.filter((elem) => {
			return !opponentPossibleMoves.includes(elem);
		});
	}

	public getPossibleMoves(pos: string, busy: {[index: string]: Figure;}): string[]{
		//console.log("Try to get moves from " + this.type + " " + pos);
		const res: string[] = new Array();
		const arrX: ReadonlyArray<string> = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const x: number = arrX.indexOf(pos[0]);
		const y: number = +pos[1];
		if ((x < 7)){
			if (!(arrX[x + 1] + y in busy))
				res.push(arrX[x + 1] + y);
			else if (busy[arrX[x + 1] + y].getColor() !== this.color)
				res.push(arrX[x + 1] + y);
			if (y <= 7){
				if (!(arrX[x + 1] + (y + 1) in busy))
					res.push(arrX[x + 1] + (y + 1));
				else if (busy[arrX[x + 1] + (y + 1)].getColor() !== this.color)
					res.push(arrX[x + 1] + (y + 1));
			}
			if (y >= 2){
				if (!(arrX[x + 1] + (y - 1) in busy))
					res.push(arrX[x + 1] + (y - 1));
				else if (busy[arrX[x + 1] + (y - 1)].getColor() !== this.color)
					res.push(arrX[x + 1] + (y - 1));
			}
		}

		if ((x >= 1)){
			if (!(arrX[x - 1] + y in busy))
				res.push(arrX[x - 1] + y);
			else if (busy[arrX[x - 1] + y].getColor() !== this.color)
				res.push(arrX[x - 1] + y);
			if (y <= 7){
				if (!(arrX[x - 1] + (y + 1) in busy))
					res.push(arrX[x - 1] + (y + 1));
				else if (busy[arrX[x - 1] + (y + 1)].getColor() !== this.color)
					res.push(arrX[x - 1] + (y + 1));
			}
			if (y >= 2){
				if (!(arrX[x - 1] + (y - 1) in busy))
					res.push(arrX[x - 1] + (y - 1));
				else if (busy[arrX[x - 1] + (y - 1)].getColor() !== this.color)
					res.push(arrX[x - 1] + (y - 1));
			}
		}

		if (y <= 7){
			if (!(arrX[x] + (y + 1) in busy))
				res.push(arrX[x] + (y + 1));
			else if (busy[arrX[x] + (y + 1)].getColor() !== this.color)
				res.push(arrX[x] + (y + 1));
		}

		if (y >= 2){
			if (!(arrX[x] + (y - 1) in busy))
				res.push(arrX[x] + (y - 1));
			else if (busy[arrX[x] + (y - 1)].getColor() !== this.color)
				res.push(arrX[x] + (y - 1));
		}

		return res;
	}
}