import React from 'react'
import {useState} from 'react'

import './style.css'
import '../ObjectConfigs/ObjectConfigs'
import ObjectConfigs from '../ObjectConfigs/ObjectConfigs'
import ObjectForm from '../ObjectForm/ObjectForm'

/**
 * Contains the ObjectForm(for generating new configs) and the ObjectConfigs(holds current configs)
 * @returns The panel which will allow the user to generate new objects; add, delete, edit configs
 */
const ObjectAdder = () => {

  //Configurator form control
  const [openConfig, setOpenConfig] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState(-1)

  return (
      <div className="AdderPanel">
        <br></br>
        <h2 className="PanelTitle">{openConfig ? "Enter Config Values" : "Select Object To Add"}</h2>
        <div>
          {openConfig ? <ObjectForm selected={selectedConfig} setPanel={setOpenConfig}/> : <ObjectConfigs setOpen={setOpenConfig} setSelect={setSelectedConfig}/>}
          
        </div>
        <button onClick={()=>{setOpenConfig(!openConfig); setSelectedConfig(-1)}}className="AddNew">{openConfig ? "Cancel" : "Add New Object Configuration"}</button>
      </div>
  )
}


export { ObjectAdder }
