import React from 'react'
import {useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Box } from '../Box/Box'
import { ObjectAdder } from '../ObjectAdder/ObjectAdder'
import './style.css'

// import * as THREE from 'three'



const LeftPanel = () => {

  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <div className="LeftPanel">
        <button onClick={() => {setPanelOpen(!panelOpen)}}className="NewObject">Add Object</button>
        {panelOpen && <ObjectAdder/>}
        <Canvas>
            <OrbitControls/>

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />

            <Box/>
        </Canvas>
    </div>
  )
}

export default LeftPanel
