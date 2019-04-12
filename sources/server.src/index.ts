import WebSocket from 'ws';
import WSconfig from './config.json';
import {Game} from "../common.src/game";
import {Config} from "../common.src/config";

const game = new Game();
let players: WebSocket[] = new Array();

const server = new WebSocket.Server({port: WSconfig.webSocketPort,}, () => {
  const address = server.address();
  console.log('WebSocket in listening on port ' + ( typeof address === 'string' ? address : address.port ));
});

server.on('connection', ( ws ) => {
  ws.on( 'message', onClientMessage );

  ws.on('close', function() {
    console.log('Соединение закрыто');
    game.pass();
    broadcastMessages();
  });

  if (players.length >= 2){
    server.close();
    return;
  }

  players.push(ws);
  if (players.length === 2){
    players[0].send( JSON.stringify({ color: 'white', gameState: game.getState()}), onSendError);
    ws.send( JSON.stringify({ color: 'black', gameState: game.getState()}), onSendError);
  }

});

function onClientMessage( this: WebSocket, data: WebSocket.Data ): void {
  if ( typeof data !== 'string' ) {
    console.log('Wrong data type');
    return;
  }
  console.log("New message: " + data);

  const config = JSON.parse(data);
  game.move(config.from, config.to);
  //console.log("Figure from " + config.from + " moved to " + config.to);
  broadcastMessages();
}

function broadcastMessages(): void {
  for ( const client of players ) {
    if ( client.readyState === WebSocket.OPEN ) {
      client.send(game.toJSON(), onSendError );
    }
  }
}

function onSendError( error?: Error ) {
  if ( error ) {
    console.error( error );
  }
}