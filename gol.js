'use strict';

const readline = require('readline');
const Game = require('./lib/game');

const [ ,, size = 36, speed = 1000 ] = process.argv;

const game = new Game(size);

setInterval(() => {
    let output = game.play();

    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    
    process.stdout.write(output);
}, speed);