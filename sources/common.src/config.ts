import {Color} from "./color";
import {GameState} from "./gameState";

export interface Config {
	from: string | null,
	to: string | null,
	playerColor: Color,
	gameState: GameState,
	message: string | null
}

/*class Conf{
	constructor(ws: string){
		this.socket = new WebSocket( ws );
		this.socket.addEventListener('open', () =>	{
			console.log("socket opened");
		});

		this.socket.addEventListener('message',( event ) => {
			if (!this.myColor){
				this.myColor = JSON.parse( event.data );
				console.log("Your color: ", this.myColor);
				return;
			}
			let config = JSON.parse( event.data );
			if (config.playerColor === this.myColor){
				moveFigures(board, "" + config.from, "" + config.to);
			}
			this.playerColor = config.playerColor;
			this.gameState = config.gameState;
			this.to = null;
			this.from = null;
	});

	}

	public setFrom(id: string): void{
		this.from = id;
	}

	public setTo(id: string): void{
		this.to = id;
		this.socket.send(JSON.stringify({from: this.from, to: this.to}));
	}


	private socket: WebSocket;
	private from: string | null = null;
	private to: string | null = null;
	private playerColor: Color = "white";
	private myColor: Color | null = null;
	private gameState: GameState = "normal";
}*/