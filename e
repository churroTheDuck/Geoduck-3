<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GeoGuessr Clone</title>
    <style>
        body { font-family: Arial, sans-serif; }
        #players { margin-top: 20px; }
    </style>
</head>
<body>
    <h1>GeoGuessr Clone</h1>
    <input id="playerName" placeholder="Enter your name" />
    <button id="joinBtn">Join Game</button>
    
    <div id="players"></div>
    
    <div>
        <h2>Make a Guess</h2>
        <input id="guess" placeholder="Enter your guess" />
        <button id="guessBtn">Submit Guess</button>
    </div>
    
    <div id="guesses"></div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();

        document.getElementById('joinBtn').onclick = () => {
            const playerName = document.getElementById('playerName').value;
            socket.emit('join', playerName);
        };

        document.getElementById('guessBtn').onclick = () => {
            const guess = document.getElementById('guess').value;
            socket.emit('makeGuess', guess);
        };

        socket.on('playerList', (players) => {
            document.getElementById('players').innerHTML = Object.values(players).join(', ');
        });

        socket.on('newGuess', ({ player, guess }) => {
            const guessesDiv = document.getElementById('guesses');
            guessesDiv.innerHTML += `<p>${player} guessed: ${guess}</p>`;
        });

        socket.on('roundStarted', ({ currentRound, currentLocation }) => {
            alert(`Round ${currentRound} has started! Guess the location!`);
            console.log('Current location:', currentLocation);
        });
    </script>
</body>
</html>
