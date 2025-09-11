const games = {};

const players = {};

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('New client connected');

        // event when a player tries to join a game
        socket.on('joinGame', (socket) => {
            const { code, color, timeControl, username } = data;
            console.log('Player ${username} joining game ${code} as ${color} ');

            // if the game does not exist, create it with initial values
            if (!games[code]) {
                games[code] = {
                    white: null,
                    black: null,
                    timeControl: timeControl,
                    whiteControl: false,
                    blackReady: false,
                    gameStarted: false,
                    WhiteTime: timeControl * 60,
                    BlackTime: timeControl * 60,
                    turn: 'white',
                    moves: []

                };
            }
            // save the information about the player in the players object
            players[socket.id] = {

                username: username,
                gameCode: code,
                color: color
            };

            // players join the game room of Socket.io whith the game code
            socket.join(code);

            // we assign the player to the game color
            if (color === 'white') {
                games[code].white = socket.id;
            } else if (color === 'black') {
                game[code].black = socket.id;
            }

            // if both players are connected we notify everyone in the game room
            if (games[code].white && games[code].black) {
                console.log('Both players are connected in game ${code}');

                io.to(code).emit('PlayersConnected', {
                    white: players[games[code].white].username,
                    black: players[games[code].black].username,

                });
            }
        });

    })
}