const spawn = require("child_process").spawn;
const server = require('http').createServer();
const io = require('socket.io')(server);
server.listen(8081);
let sockets = []
let recognizer

io.on('connection', (socket) => {
    sockets.push(socket)
    console.log('A user is connected');
    socket.on("message", (data) => {
        console.log(`Received : ${data}`)
        if (data == "start") {
            recognizer = start()
            recognizer.stdin.setEncoding('utf-8');
            recognizer.stdout.on("data", data => {
                console.log(`child stdout => ${data}`);
            });
            recognizer.on('exit', (code, signal) => {
                console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
            });
        }
        else if (data == "reload") {
            reload(recognizer)
        }
        else if (data == "stop") {
            stop(recognizer)
        }
        else
            sockets.forEach(sock => { if (sock != socket) sock.emit("faces", data) })
    })

    socket.on('picture', (data) => {
        console.log(data)
        sockets.forEach(sock => { if (sock != socket) sock.emit("picure", ['picture', ...data].join('/')) })
        /*
        let json = JSON.parse(data)
        let base64Image = json.image.split(';base64,').pop()
        require("fs").writeFile(`./Model/${json.name}.jpg`, base64Image, 'base64', function (err) {
            console.log(err);
        });*/
    })

    socket.on('disconnect', function () {
        console.log('A user is disconnected');
    });
});

const start = () => {
    return spawn("node", ["NodePythonInterface.js", process.argv[2]])
}

const stop = (current) => {
    if (current)
        current.kill()
}

const reload = (current) => {
    if (current)
        stop(current)
    return start()
}