import React, { useContext } from 'react'
import {useState} from 'react'
import {CameraContext} from "../../contexts/CameraContext"
import {ObjectContext} from "../../contexts/ObjectContext"
import "./style.css"

const ObjectData = ({myConfig}) => {

  const [inEditMode, setInEditMode] = useState(false)
  const [updatedConfig, setUpdatedConfig] = useState(myConfig)

  const {cameraPos, setCameraPos} = useContext(CameraContext)
  const {myObjects, setMyObjects} = useContext(ObjectContext)

  
  /**
   * When typing in a field, update based on the value of the copy configed
   * @param {value to change to} val 
   * @param {field to change in} field 
   */
  function updateField(val, field) {
    var copyConfig = updatedConfig
    copyConfig[field] = val
    setUpdatedConfig(copyConfig)
  }


  
  /**
  * Take the inputs given by the users on the edit and send an update
  * on the port to the configuration server. It's pretty slick :)
  */
  function saveObjectData(){
    
    var myPort = updatedConfig.port
    
    if(myPort === undefined)
    {
      myPort = 3002
    }
    
    const socket = new WebSocket('ws://localhost:' + myPort)

    //Runs on socket open
    socket.addEventListener('open', (event) => {
        console.log("Connected to WS Server")
        var dataToSend = updatedConfig
        delete dataToSend.port
        socket.send(JSON.stringify({"data": dataToSend, "status": "UPDATE"}))
        updatedConfig.port = myPort
        socket.close()
    })
    setInEditMode(false)
  }



  /**
   * This funciton gets the port and then deletes the object based upon
   * that number closing the port in the process. 
   */
  function deleteObjectData(){
    
    var myPort = updatedConfig.port

    //bandage fix DELETE LATER
    if(myPort === undefined)
    {
      myPort = 3002
    }

    const socket = new WebSocket('ws://localhost:' + myPort)
    var newObjects = myObjects["data"]
    var item_index = newObjects.findIndex(element => element.port === myPort)
    
    console.log("Deleting: " + myPort)
    
    if(item_index === -1)
        console.log("ABORT MISSION WE'RE TRYING TO DELETE NOTHING")
    else
        newObjects.splice(item_index)

    setMyObjects({"data": newObjects})

    //Runs on socket open
    socket.addEventListener('open', (event) => {
        console.log("Connected to WS Server")
        var dataToSend = updatedConfig
        delete dataToSend.port
        socket.send(JSON.stringify({"data": dataToSend, "status": "DEATH"}))
        socket.close()
    })

    setInEditMode(false)
  }





  /**
   * Set the camera position if an item
   * is clicked on
   */
  function goToObject(){
    setCameraPos([parseInt(myConfig["loc_X"]), parseInt(myConfig["loc_Y"]) + 40, parseInt(myConfig["loc_Z"])])
  }





  return (
    <div className="Element" onClick={() => {goToObject()}}>
      <h2>{myConfig["title"]}</h2>
      <img className="EditIcon" width={32} height={32} src={inEditMode ?  "/edit.png": "/edit.png"} onClick={() => {setInEditMode(!inEditMode)}}></img>
      {inEditMode ? <><img className="EditIcon" width={32} height={32} src="/save.png" onClick={() => {saveObjectData()}}></img><img className="EditIcon" width={32} height={32} src="/delete.png" onClick={() => {deleteObjectData()}}></img></> : null}
      <h3>{myConfig["id"]}</h3>
      <div className="EnhancedDetail" hidden={true}>
        {Object.keys(myConfig).map((element) => (
            (element === "id" || element === "title" || element === "key" ) ? null : (inEditMode === true && element !== "_id" && element !== "port") ? <><label className="EnhancedLabel">{element + "(" + myConfig[element] + ")"}</label> <input className="EnhancedInput" onChange={(e) => {updateField(e.target.value, element)}}></input><hr></hr></> : <h4 className="DataField">{element + ": " + myConfig[element]}</h4>
        ))}
      </div>
    </div>
  )
}

export { ObjectData }
