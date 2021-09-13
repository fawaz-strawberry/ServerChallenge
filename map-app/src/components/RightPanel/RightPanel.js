import React, { useContext } from 'react'
import './style.css'
import {ObjectContext} from "../../contexts/ObjectContext"
import {ObjectData} from "../ObjectData/ObjectData"

/**
 * Right Panel holds all important information regarding a selected object
 * Will also be able to modify parts of the object
 * @returns The Right Panel element
 */


const RightPanel = () => {

  const {myObjects, setMyObjects} = useContext(ObjectContext)

  return (
    <div className="RightPanel">
      <h1>Object Details</h1>
      {myObjects["data"].map((element) => (
        <ObjectData myConfig={element}/>
      ))}
    </div>
  )
}

export default RightPanel
