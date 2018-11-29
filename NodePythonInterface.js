const net = require("net");
const moment = require('moment')
const spawn = require("child_process").spawn;

let guesses = []

const pythonProcess = spawn("python3", ["-u", "liveRecognition.py", process.argv[2] || 0]);
pythonProcess.stdout.on("data", data => {
    data = data.toString()
    if (data.split("/").length > 1) {
        splitted = data.split("/")
        splitted[0] === "status"
            ? sockets.forEach(socket => socket.emit("status", splitted[1]))
            : sockets.forEach(socket => socket.emit("err", splitted[1]))
    }
    else {
        let exist = guesses.some(guess => guess.name === data)
        guesses = exist ? guesses.map(guess => guess.name === data
            ? { ...guess, lastSeen: moment() } : guess)
            : [...guesses, { name: data, lastSeen: moment() }]
    }
});
pythonProcess.on('exit', function (code, signal) {
    console.log('child process exited with ' +
        `code ${code} and signal ${signal}`);
    process.exit(1)
});

const server = require('http').createServer();
const io = require('socket.io')(server);
server.listen(8081);
let sockets = []

io.on('connection', (socket) => {
    sockets.push(socket)
    console.log('A client is connected');
    socket.on("message", (data) => {
        console.log(`Received : ${data}`)
        if (data == "start") {
            pythonProcess.stdin.write("start\n")
        }
        else if (data == "stop") {
            pythonProcess.stdin.write("stop\n")
        }
        else if (data == "exit") {
            pythonProcess.stdin.write("exit\n")
        }
    })

    socket.on("picture", (data) => {
        console.log(`Received : ${data}`)
        console.log(["picture", ...data].join('/'))
        pythonProcess.stdin.write(["picture", ...data].join('/') + "\n")
    })

    socket.on('disconnect', function () {
        console.log('A user is disconnected');
    });
});

let oldGuessed = []

setInterval(
    () => {
        let guessed = guesses.filter(guess => guess.lastSeen.isAfter(moment().subtract(15, 'seconds')))
        if (guessed.map(guess => guess.name).sort().join(',') !== oldGuessed.map(guess => guess.name).sort().join(',')) {
            oldGuessed = guessed
            sockets.forEach(socket => socket.emit("faces", guessed.map(guess => guess.name)))
        }
    }, 500
)