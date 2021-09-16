const express = require("express")
const cors = require('cors')
const WebSocket = require('ws')
const { Socket } = require("dgram")
const { v4: uuidv4 } = require("uuid");

const app = express()
app.use(cors())
app.use(express.json())

//Hold the currently connected ports
var connectedPorts = [3000, 3001, 3100]
var all_object_ports = []
var all_objects = []

app.listen(8081, () => { console.log('Server is started on localhost:'+ (8081))})

/**
 * Create a Random Object which will have a configuration
 * and port to connect to. Handle the deletion, sending the port,
 * editing and faking data, etc.
 */
class RandomObject {

    constructor(config) {
        this.config = config
        
        //First find a port that is currently open, up to 999 ports
        this.myPort = 3000
        for(var i = 0; i < 999; i++)
        {
            var num = 3000 + i
            if(connectedPorts.indexOf(num) === -1)
            {
                connectedPorts.push((3000 + i))
                this.myPort = 3000 + i
                break
            }
        }

        //Generate a new UUID for this object on creation, Using UUID for uniqueness
        this.config["id"] = uuidv4();
        this.server = require("http").createServer(app)
        this.wss = new WebSocket.Server({server:this.server})

        this.wss.on('connection', (ws) => {
            console.log("A new client connected to: " + this.config["title"])
            
            setInterval(() => {
                ws.send(JSON.stringify({"data" : this.config, "port": this.myPort}))
            }, 500)


            ws.on('message', (message) => {
                var result = JSON.parse(message)
                if(result.status === "UPDATE")
                {
                    this.config = result.data
                }
                else if(result.status === "DEATH")
                {
                    // Close all clients and send Order 66 to delete Object reference
                    this.wss.clients.forEach((socket) => {
                        socket.send(JSON.stringify({"Order": 66, "Port":this.myPort}))
                        socket.close();
                    });

                    //Cycle all objects and remove references to object
                    for(var i = 0; i < all_objects.length; i++)
                    {
                        if(all_objects[i].getPort() === this.myPort)
                        {
                            //wanna add this line back in but gonna need to debug it :/
                            //connectedPorts.splice(connectedPorts.indexOf(this.myPort), 1)
                            all_objects.splice(i, 1)
                            all_object_ports.splice(i, 1)
                            break
                        }
                    }
                }
            })
        })

        if(this.config["title"] === "CyberTruck")
        {
            var speed = 1
            if(this.config["speed"])
            {
                speed = this.config["speed"]
            }
            
            this.hSpeed = 0
            this.vSpeed = 0

            this.isGoingRight = true
            this.isGoingUp = false
            this.isGoingLeft = false
            this.isGoingDown = false

            this.destinations = [{"x":0, "z":0}, {"x":35, "z":0}, {"x":35, "z":20}, {"x":60, "z":20}, {"x":120, "z":10}, {"x":120, "z":-15}, {"x":165, "z":-15}, {"x":165, "z":-66}, {"x":0, "z":-66}]
            this.curr = 0
            setInterval(() => {
                var xSpeed = parseInt(this.config["loc_X"]) - this.destinations[this.curr]["x"]
                var zSpeed = parseInt(this.config["loc_Z"]) - this.destinations[this.curr]["z"]

                if(xSpeed > 1)
                    if(xSpeed > this.config["speed"])
                        xSpeed = 1 * this.config["speed"]
                    else
                        xSpeed = 1
                else if(xSpeed < -1)
                    if(xSpeed < -this.config["speed"])
                        xSpeed = -1 * this.config["speed"]
                    else
                        xSpeed = -1
                else
                    xSpeed = 0

                if(zSpeed > 1)
                    if(zSpeed > this.config["speed"])
                        zSpeed = 1 * this.config["speed"]
                    else
                        zSpeed = 1
                else if(zSpeed < -1)
                    if(zSpeed < -this.config["speed"])
                        zSpeed = -1 * this.config["speed"]
                    else
                        zSpeed = -1
                else
                    zSpeed = 0

                if(xSpeed + zSpeed === 0)
                {
                    this.curr += 1
                    if(this.curr >= this.destinations.length)
                    {
                        this.curr = 0
                    }
                }
        
                this.config["loc_X"] = "" + (parseInt(this.config["loc_X"]) - xSpeed)
                this.config["loc_Z"] = "" + (parseInt(this.config["loc_Z"]) - zSpeed)
            }, 500)
        }
        else if(this.config["title"] === "SampleBox")
        {
            setInterval(() => {
                this.config["loc_X"] = "" + (parseInt(this.config["loc_X"]) + 20 * (Math.random() - .5))
                this.config["loc_Z"] = "" + (parseInt(this.config["loc_Z"]) + 20 * (Math.random() - .5))
            }, 500)
        }
        else
        {
        }
        
        
        this.server.listen(this.myPort, () => console.log("Listening on port: " + this.myPort))
    }

    getConfig(){
        return this.config
    }

    getPort(){
        return this.myPort
    }
}




/**
 * Get all the currently active ports and the configurations for each of them
 * to connect to when a new browser opens the site
 * 
 * NOTE: I'm pretty sure config can be DELETED since configuration is determined on
 * port connection rather than on initial open
 */
app.get('/getAllObjectPorts', (req, res) => {
    
    var elements = []
    for(var i = 0; i < all_objects.length; i++)
    {
        elements.push({"port": all_objects[i].getPort(), "config": all_objects[i].getConfig()})
    }
    res.send(elements)
})







/**
 * Generate a new object, add a new list, and send back the port
 * to connect to
 */
app.post("/addObject", (req, res) => {
    let sampleObj = new RandomObject(req.body)
    all_objects.push(sampleObj)
    all_object_ports.push(sampleObj.getPort())
    res.send("" + sampleObj.getPort())
})





app.get('/', (req, res) => res.send("Hello World!"))







//Test servers delete later!

// const server = require("http").createServer(app)
// const wss = new WebSocket.Server({ server:server })
// wss.on('connection', function connection(ws) {
//     console.log("A new client connected")
//     ws.send("Welcome New Client!")
    
//     ws.on('message', function incoming(message) {
//         console.log("received: " + message)
//         ws.send("Got your message: " + message)
//     })
// })
// server.listen(3001, () => console.log("Listening on port :3001"))



// const server2 = require("http").createServer(app)
// const wss2 = new WebSocket.Server({ server:server2 })
// wss2.on('connection', function connection(ws) {
//     console.log("A new client connected")
//     ws.send("Welcome New Client!")
    
//     ws.on('message', function incoming(message) {
//         console.log("received: " + message)
//         ws.send("Got your message: " + message)
//     })
// })
// server2.listen(3100, () => console.log("Listening on port :3100"))





