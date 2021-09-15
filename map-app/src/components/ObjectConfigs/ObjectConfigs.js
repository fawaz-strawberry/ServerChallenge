import React from 'react'
import {useContext} from 'react'
import {ConfigContext} from "../../contexts/ConfigContext"
import {ObjectContext} from "../../contexts/ObjectContext"
import axios from "axios"

import './style.css'

/**
 * 
 * @param {setOpen, setSelect} setOpen is for telling the adder to open the
 * configurator mode for the specficied setSelect
 * @returns The ObjectConfigs panel ontop of the ObjectAdder, is a list of all configs
 */
const ObjectConfigs = ({setOpen, setSelect}) => {

    //grab the cofigs and myobjects
    const {configs, setConfigs} = useContext(ConfigContext)
    const {myObjects, setMyObjects} = useContext(ObjectContext)

    /**
     * Delete config calls the nodejs backend to delete a config
     * that's currently in the MongoDB, there is a window alert
     * to confirm from user. It also regets all configs after delete
     * @param {id of config to delete} id_to_delete 
     */
    function deleteConfig(id_to_delete){
        if(window.confirm("Are you sure you want to delete this configuration?"))
        {
            axios.post('http://localhost:5000/deleteConfig', {"_id": id_to_delete}).then(response => {
                console.log("Connected with server!")
                axios.get('http://localhost:5000/getAllConfigs').then(response2 => {
                    console.log("Connected with server!")
                    setConfigs(response2.data)
                  }).catch(() => {
                    console.log("Error when connecting with server")
                  })
              }).catch(() => {
                console.log("Error when connecting with server")
              })
        }
    }


    
    /**
     * The following code calls add object on the simulation server to generate
     * a new "fake" object of the specified configuration. It also opens up a
     * port to that object automagically to read data in from it. Finally it adds
     * that object to the my_objects array to render later.
     * @param {The configuration of the object you want to generate} config_to_gen 
     */
    function generateObject(config_to_gen){
        axios.post('http://localhost:8081/addObject', config_to_gen).then(response => {
            
            console.log("Port to connect to is: " + response["data"])
            
            const socket = new WebSocket('ws://localhost:' + response["data"])
            // config_to_gen["port"] = response["data"]
            socket.addEventListener('open', function(event){
                console.log("Event")
                console.log(event)
                console.log("Connected to WS Server")
            })
        
            socket.addEventListener('message', function (event){

                if(JSON.parse(event.data)["Order"] === 66)
                {
                    var myPort = JSON.parse(event.data)["Port"]
                    socket.close()
                    var newObjects = myObjects["data"]
                    var item_index = newObjects.findIndex(element => element.port === myPort)
                    
                    console.log("Deleting: " + myPort)
                    
                    if(item_index === -1)
                        console.log("ABORT MISSION WE'RE TRYING TO DELETE NOTHING")
                    else
                        newObjects.splice(item_index)
                    
                    console.log(newObjects)
                
                    setMyObjects({"data": newObjects})
                }
                else
                {
                    var temp_store = JSON.parse(event.data)["data"]
                    var temp_objects = myObjects["data"]
                    var item_index = temp_objects.findIndex(element => element.id === temp_store.id)
                    var newObjects = temp_objects
                    temp_store["port"] = JSON.parse(event.data)["port"]
                    if(item_index === -1)
                        newObjects.push(temp_store)
                    else
                        newObjects[item_index] = temp_store
                    
                    setMyObjects({"data": newObjects})
                }

            })

        })
    }




    return (
        <>
        {configs.map((config, index) => (
            <>
                <div className="Config" key={config.title}>
                    <div className="Logo"><img src="/SpinningCube.gif"/></div>
                    <div className="Title">{config.title}</div>
                    <div className="Details"></div>
                    <img src="/plus.png" width={50} height={50} className="ButtonIcon" onClick={() => {generateObject(config);}}></img>
                    <img src="/edit2.png" width={50} height={50} className="ButtonIcon" onClick={() => {setSelect(config.id); setOpen(true)}}></img>
                    <img src="/trash.png" width={50} height={50} className="ButtonIcon" onClick={() => {deleteConfig(config._id)}}></img>
                </div>
                
            </>
        ))}
        
        </>
  )
}

export default ObjectConfigs
