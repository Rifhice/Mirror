const net = require("net");
const moment = require('moment')
const spawn = require("child_process").spawn;
const server = require('http').createServer();
const io = require('socket.io')(server);
server.listen(8081);

let oldGuessed = []
let sockets = []
let guesses = []
let state = {
    isStarted: false,
    status: ""
}

const updateState = (newState) => {
    state = { ...state, ...newState }
    broadcast("status", JSON.stringify(state))
}

const writeToPythonProcess = (toWrite) => {
    if (pythonProcess.stdin.writable)
        pythonProcess.stdin.write(toWrite)
}

const broadcast = (channel, message) => {
    sockets.forEach(socket => socket.emit(channel, message))
}

const exit = () => {
    if (state.isStarted) {
        writeToPythonProcess("exit\n")
        updateState({ isStarted: false, status: "" })
    }
}

const restart = () => {
    if (!state.isStarted) {
        guesses = []
        oldGuessed = []
        pythonProcess = startPythonProcess()
        writeToPythonProcess("start\n")
    }
}


const startPythonProcess = () => {
    const pythonProcess = spawn("python3", ["-u", "liveRecognition.py", process.argv[2] || 0]);
    updateState({ isStarted: true })
    pythonProcess.stdout.on("data", data => {
        data = data.toString()
        if (data.split("/").length > 1) {
            splitted = data.split("/")
            if (state.isStarted) {
                if (splitted[0] === "status") {
                    if (state.status !== splitted[1].replace('\n', '')) {
                        updateState({ status: splitted[1].replace('\n', '') })
                    }
                }
                else
                    broadcast("err", splitted[1])
            }
        }
        else {
            let parts = data.split(" ")
            let name = [parts[0], parts[1]].join(' ')
            let id = parts[2].replace('\n', '')
            let exist = guesses.some(guess => guess.id === id)
            guesses = exist ? guesses.map(guess => guess.id === id
                ? { ...guess, lastSeen: moment() } : guess)
                : [...guesses, { name, lastSeen: moment(), id }]
        }
    });
    pythonProcess.on('exit', function (code, signal) {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`);
    });
    return pythonProcess
}

pythonProcess = startPythonProcess()
io.on('connection', (socket) => {
    sockets.push(socket)
    console.log('A client is connected');
    socket.on("message", (data) => {
        console.log(`Received : ${data}`)
        switch (data) {
            case "exit":
                exit()
                break;
            case "restart":
                restart()
                break;
            default:
                break;
        }
    })

    socket.on("picture", (data) => {
        console.log(["picture", ...data].join('/'))
        if (state.isStarted)
            writeToPythonProcess(["picture", ...data].join('/') + "\n")
    })

    socket.on("newPicture", (data) => {
        let json = JSON.parse(data)
        var base64Data = json.image.replace(/^data:image\/png;base64,/, "");
        require("fs").writeFile(`./Model/${json.filename}.png`, base64Data, 'base64', function (err) {
            console.log(err);
        });
        restart()
    })

    socket.on('disconnect', function () {
        console.log('A user is disconnected');
    });
});

setInterval(
    () => {
        let guessed = guesses.filter(guess => guess.lastSeen.isAfter(moment().subtract(15, 'seconds')))
        if (guessed.map(guess => guess.name).sort().join(',') !== oldGuessed.map(guess => guess.name).sort().join(',')) {
            oldGuessed = guessed
            broadcast("faces", guessed.map(guess => ({ ...guess, lastSeen: undefined })))
        }
    }, 500
)