import React from 'react'
import {useContext} from 'react'
import {ConfigContext} from "../../contexts/ConfigContext"
import {ObjectContext} from "../../contexts/ObjectContext"
import axios from "axios"

import './style.css'

const ObjectConfigs = ({setOpen, setSelect}) => {

    const {configs, setConfigs} = useContext(ConfigContext)
    const {myObjects, setMyObjects} = useContext(ObjectContext)

    function deleteConfig(id_to_delete){
        if(window.confirm("Are you sure you want to delete this configuration?"))
        {
            axios.post('http://localhost:5000/deleteConfig', {"_id": id_to_delete}).then(response => {
                console.log("Connected with server!")
                console.log(response)
                axios.get('http://localhost:5000/getAllConfigs').then(response2 => {
                    console.log("Connected with server!")
                    console.log(response2)
                    setConfigs(response2.data)
                  }).catch(() => {
                    console.log("Error when connecting with server")
                  })
              }).catch(() => {
                console.log("Error when connecting with server")
              })
        }
    }

    //function will send configuration to simulation server which will open a new port and generate a websocket with data streaming of that object
    //the websocket will be sent back to the website to be displayed on screen.
    function generateObject(config_to_gen){
        axios.post('http://localhost:8081/addObject', config_to_gen).then(response => {
            console.log(response)
            console.log("Port to connect to is: " + response["data"])
            const socket = new WebSocket('ws://localhost:' + response["data"])
            config_to_gen["port"] = response["data"]
            socket.addEventListener('open', function(event){
                console.log("Connected to WS Server")
                config_to_gen["port"] = response["data"]
                config_to_gen["key"] = config_to_gen["id"]
                setMyObjects([...myObjects, config_to_gen])
            })
        
            socket.addEventListener('message', function (event){
                var temp_store = JSON.parse(event.data)
                var item_index = myObjects.findIndex(element => element.id === temp_store.id)
                var newObjects = myObjects
                if(item_index === -1)
                {
                    newObjects.push(temp_store)
                }
                else
                {
                    newObjects[item_index] = temp_store
                }
                
                setMyObjects(newObjects)
            })

        })
    }

    return (
        <>
        {configs.map((config, index) => (
            <>
                <div className="Config" key={config.title}>
                    <div className="Logo">IMG</div>
                    <div className="Title">{config.title}</div>
                    <div className="Details"></div>
                    <button onClick={() => {generateObject(config);}}>Generate Object</button>
                    <button onClick={() => {setSelect(config.id); setOpen(true)}}>Edit Config</button>
                    <button onClick={() => {deleteConfig(config._id)}}>Delete Config</button>
                </div>
                
            </>
        ))}
        
        </>
  )
}

export default ObjectConfigs
