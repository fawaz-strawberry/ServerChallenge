const express = require("express")
const app = express()

const server = require("http").createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server:server })

wss.on('connection', function connection(ws) {
    console.log("A new client connected")
    ws.send("Welcome New Client!")
    
    ws.on('message', function incoming(message) {
        console.log("received: " + message)
        ws.send("Got your message: " + message)
    })
})

app.get('/', (req, res) => res.send("Hello World!"))

server.listen(3000, () => console.log("Listening on port :3000"))




const server2 = require("http").createServer(app)

const wss2 = new WebSocket.Server({ server:server2 })

wss2.on('connection', function connection(ws) {
    console.log("A new client connected")
    ws.send("Welcome New Client!")
    
    ws.on('message', function incoming(message) {
        console.log("received: " + message)
        ws.send("Got your message: " + message)
    })
})

server2.listen(3100, () => console.log("Listening on port :3100"))