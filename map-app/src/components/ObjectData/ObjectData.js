import React, { useContext } from 'react'
import {useState} from 'react'
import {CameraContext} from "../../contexts/CameraContext"
import "./style.css"

const ObjectData = ({myConfig}) => {

  const [inEditMode, setInEditMode] = useState(false)
  const [updatedConfig, setUpdatedConfig] = useState(myConfig)

  const {cameraPos, setCameraPos} = useContext(CameraContext)

  function updateField(val, field) {
    var copyConfig = updatedConfig
    copyConfig[field] = val
    setUpdatedConfig(copyConfig)
  }

  function saveObjectData(){
    

    console.log(updatedConfig)
    var myPort = updatedConfig.port

    if(myPort === undefined)
    {
      myPort = 3002
    }

    console.log("Sending: ")
    console.log(updatedConfig)
    console.log("To port " + myPort)

    const socket = new WebSocket('ws://localhost:' + myPort)

    //Runs on socket open
    socket.addEventListener('open', (event) => {
        console.log("Connected to WS Server")
        var dataToSend = updatedConfig
        delete dataToSend.port
        socket.send(JSON.stringify({"data": dataToSend, "status": "UPDATE"}))
    })


    setInEditMode(false)

  }

  function goToObject(){
    console.log("Setting to")
    setCameraPos([parseInt(myConfig["loc_X"]), 50, parseInt(myConfig["loc_Z"])])
  }

  return (
    <div className="Element" onClick={() => {goToObject()}}>
      <h2>{myConfig["title"]}</h2>
      <button onClick={() => {setInEditMode(!inEditMode)}}>{inEditMode ? "Cancel" : "Edit"}</button>
      {inEditMode ? <button onClick={() => {saveObjectData()}}>Save</button> : null}
      <h3>{myConfig["id"]}</h3>
      <div className="EnhancedDetail">
        {Object.keys(myConfig).map((element) => (
            (element === "id" || element === "title" || element === "key") ? null : (inEditMode === true && element !== "_id") ? <><label>{element + "(" + myConfig[element] + ")"}</label> <input onChange={(e) => {updateField(e.target.value, element)}}></input></> : <h4 className="DataField">{element + ": " + myConfig[element]}</h4>
        ))}
      </div>
    </div>
  )
}

export { ObjectData }
