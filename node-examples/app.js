const http = require("http");
const { resolve } = require("path");

const server = http.createServer()

server.on("request", (req, res) => {
    setTimeout(() => {
        console.log("setTimeout");
    })

    setImmediate(() => {
        console.log("setImmediate");
    })

    Promise.resolve().then(() => console.log("resolve"));

    process.nextTick(() => console.log("nextTick"));

    req.on("close", () => console.log("close request"));

    res.end("Hello");
})

server.listen(8080);


process.nextTick(() => {
    Promise.resolve().then(() => console.log("resolve"));
    console.log("nextTick")
})