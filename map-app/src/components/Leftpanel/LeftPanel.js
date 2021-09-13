import React, { useContext } from 'react'
import {useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Box } from '../Box/Box'
import { ObjectAdder } from '../ObjectAdder/ObjectAdder'
import {ObjectContext} from '../../contexts/ObjectContext'
import './style.css'

// import * as THREE from 'three'


/**
 * Contains the "map area" and the things like the add object panel
 * @returns The entire leftPanel that will be displayed to the user
 */
const LeftPanel = () => {

  //myobjects holds all objects to be rendered on screen
  const {myObjects} = useContext(ObjectContext)
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <div className="LeftPanel">
        <button onClick={() => {setPanelOpen(!panelOpen)}}className="NewObject">Add Object</button>
        {panelOpen && <ObjectAdder/>}
        <Canvas>
            <OrbitControls/>

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <Box position={{x: 0, y: 0, z: 0}}/>
            {console.log("Printing Objects")}
            {console.log(myObjects)}
            {myObjects["data"].map((element, index) => (
              <Box key={element["id"]} position={{x: parseInt(element["loc_X"]), y: parseInt(element["loc_Y"]), z: parseInt(element["loc_Z"])}}/>
            ))}
            
        </Canvas>
    </div>
  )
}

export default LeftPanel
