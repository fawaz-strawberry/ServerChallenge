const express = require("express")
const cors = require('cors')
const WebSocket = require('ws')
const { Socket } = require("dgram")
const { v4: uuidv4 } = require("uuid");

const app = express()

app.use(cors())
app.use(express.json())


var connectedPorts = [3000, 3001, 3100]
var all_object_ports = []
var all_objects = []

app.listen(8081, () => { console.log('Server is started on localhost:'+ (8081))})

class RandomObject {
    constructor(config) {
        console.log("Config is: ")
        console.log(config)
        this.config = config
        console.log("this config is: ")
        console.log(this.config)
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

        this.config["id"] = uuidv4();

        this.server = require("http").createServer(app)
        this.wss = new WebSocket.Server({server:this.server})


        this.wss.on('connection', (ws) => {
            console.log(this.config)
            console.log("A new client connected to: " + this.config["title"])
            
            setInterval(() => {
                ws.send(JSON.stringify(this.config))
            }, 500)


            ws.on('message', (message) => {
                var result = JSON.parse(message)
                console.log(result)
                if(result.status === "UPDATE")
                {
                    this.config = result.data
                }
                else if(result.status === "DEATH")
                {
                    ws.close()
                }
                console.log("received: " + message)
                ws.send("Got your message: " + message)
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


app.get('/getAllObjectPorts', (req, res) => {
    
    var elements = []
    
    for(var i = 0; i < all_object_ports.length; i++)
    {
        elements.push({"port": all_object_ports[i], "config": all_objects[i].getConfig()})
    }
    res.send(elements)
})

app.get('/', (req, res) => res.send("Hello World!"))

app.post("/addObject", (req, res) => {
    console.log(req.body)
    let sampleObj = new RandomObject(req.body)
    all_objects.push(sampleObj)
    all_object_ports.push(sampleObj.getPort())
    res.send("" + sampleObj.getPort())
})




const server = require("http").createServer(app)
const wss = new WebSocket.Server({ server:server })
wss.on('connection', function connection(ws) {
    console.log("A new client connected")
    ws.send("Welcome New Client!")
    
    ws.on('message', function incoming(message) {
        console.log("received: " + message)
        ws.send("Got your message: " + message)
    })
})
server.listen(3001, () => console.log("Listening on port :3001"))



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





