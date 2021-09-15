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

        setInterval(() => {
            this.config["loc_X"] = "" + (parseInt(this.config["loc_X"]) + 1)
        }, 500)
        
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





