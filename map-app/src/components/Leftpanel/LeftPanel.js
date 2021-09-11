import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Box } from '../Box/Box'
import './style.css'

// import * as THREE from 'three'


const LeftPanel = () => {
  return (
    <div className="LeftPanel">
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
