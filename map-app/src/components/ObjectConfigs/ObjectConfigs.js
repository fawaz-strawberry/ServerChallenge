import React from 'react'
import {useContext} from 'react'
import {ConfigContext} from "../../contexts/ConfigContext"
import axios from "axios"

import './style.css'

const ObjectConfigs = ({setOpen, setSelect}) => {

    const {configs, setConfigs} = useContext(ConfigContext)

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

    }

    return (
        <>
        {configs.map((config, index) => (
            <>
                <div className="Config" key={config.title}>
                    <div className="Logo">IMG</div>
                    <div className="Title">{config.title}</div>
                    <div className="Details"></div>
                    <button onClick={() => {generateObject(config); setOpen(true)}}>Generate Object</button>
                    <button onClick={() => {setSelect(config.id); setOpen(true)}}>Edit Config</button>
                    <button onClick={() => {deleteConfig(config._id)}}>Delete Config</button>
                </div>
                
            </>
        ))}
        
        </>
  )
}

export default ObjectConfigs
