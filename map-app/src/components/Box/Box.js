import { useFrame } from '@react-three/fiber'
import React, {useState, useRef}  from 'react'

import * as THREE from 'three'
/**
 * 
 * @param {Position} and x, y, z object which holds the coordinates of where
 * to generate the cube 
 * @returns The box :/
 */

const Box = ({mouse = new THREE.Vector2(), basePosition, position, v=new THREE.Vector3(), c = new THREE.Color()}) => {

    const [isHovering, setIsHovering] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    
    const ref = useRef()
    return(
        <mesh ref={ref} scale={4}
                onPointerDown={(e) => {setIsClicked(!isClicked)}}
                onPointerOver={(e) => {setIsHovering(true)}} 
                onPointerOut={(e) => {setIsHovering(false)}} position={[position["x"], position["y"], position["z"]]}>
            <boxBufferGeometry  attach="geometry"></boxBufferGeometry>
            <meshLambertMaterial attach="material" color={isHovering === true ? "blue" : isClicked ? "yellow" : "red"}></meshLambertMaterial>
        </mesh>
    )
}

export { Box }