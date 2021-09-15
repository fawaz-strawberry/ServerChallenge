import React, { Suspense, useContext } from 'react'
import {useState, useRef, useResource} from 'react'
import { Canvas, useFrame, useThree} from '@react-three/fiber'
import { MapControls, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import { Box } from '../Box/Box'
import City from '../City/City'
import {Camera} from '../Camera/Camera'
import { ObjectAdder } from '../ObjectAdder/ObjectAdder'
import {ObjectContext} from '../../contexts/ObjectContext'
import {CameraContext} from '../../contexts/CameraContext'
import './style.css'

import * as THREE from 'three'
import { Euler } from 'three'



/**
 * Contains the "map area" and the things like the add object panel
 * @returns The entire leftPanel that will be displayed to the user
 */
const LeftPanel = () => {


  const lookAtCubePosition = new THREE.Vector3()
  const ref = useRef()

  const {cameraPos, setCameraPos} = useContext(CameraContext)

  //myobjects holds all objects to be rendered on screen
  const {myObjects} = useContext(ObjectContext)
  const [panelOpen, setPanelOpen] = useState(false)


  return (
    <div className="LeftPanel">
      
        {!panelOpen ? <img width={120} height={120} src="/add.png" onClick={(e) => {setPanelOpen(!panelOpen);}} className="NewObject"></img> :
        <img width={120} height={120} src="/add.png" onClick={(e) => {setPanelOpen(!panelOpen);}} className="CloseObject"></img>}
        <img width={120} height={120} src="/video-camera.png" onClick={() => {setCameraPos([0, 200, 0])}} className="ResetCamera"></img>
        {panelOpen && <ObjectAdder/>}
        <Canvas camera={{ position: [0 , 100, 0], fov: 42 }}>
        <Camera position={cameraPos}></Camera>
            <Suspense>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 200, 10]} angle={0.95} />
            <City></City>
            {myObjects["data"].map((element, index) => (
              <Box basePosition={cameraPos} key={element["id"]} position={{x: parseInt(element["loc_X"]), y: parseInt(element["loc_Y"]), z: parseInt(element["loc_Z"])}}/>
            ))}
            </Suspense>

        </Canvas>
    </div>
  )
}

export default LeftPanel
