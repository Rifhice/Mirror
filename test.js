const spawn = require("child_process").spawn;
const proc = spawn("python3", ["-u", "liveRecognition.py"])
process.stdin.pipe(proc.stdin)
setTimeout(() => {
    proc.stdin.write("salut\n")
}, 2000)
proc.stdout.on('data', (data) => {
    console.log(`child stdout:${data}`);
});