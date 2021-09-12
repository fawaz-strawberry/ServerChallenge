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

var connectedPorts = [3000, 3001, 3100]


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


class RandomObject {
    constructor(config) {
        //First find a port
        this.myPort = 3000
        for(var i = 0; i < 100; i++)
        {
            var num = 3000 + i
            if(connectedPorts.indexOf(num) === -1)
            {
                connectedPorts.push((3000 + i))
                this.myPort = 3000 + i
                break
            }
        }

        this.id = config["id"]
        this.title = config["title"]
        this.x = config["loc_x"]
        this.y = config["loc_y"]
        this.z = config["loc_z"]

        this.server = require("http").createServer(app)
        this.wss = new WebSocket.Server({server:this.server})

        this.wss.on('connection', function connection(ws) {
            console.log("A new client connected to: " + this.title)
            ws.send("Welcome New Client!")
            
            ws.on('message', function incoming(message) {
                console.log("received: " + message)
                ws.send("Got your message: " + message)
            })
        })

        this.server.listen(this.myPort, () => console.log("Listening on port: " + this.myPort))
    }

    getPort(){
        return this.myPort
    }
}



app.get("/addObject", (req, res) => {
    let sampleObj = new RandomObject({"id": "temp", "title": "cybertruck", "loc_x":"42", "loc_y":"33", "loc_z":"44"})
    res.send("" + sampleObj.getPort())
})