import { useFrame } from '@react-three/fiber'
import React, {useState, useRef, useContext}  from 'react'
import {ObjectContext} from '../../contexts/ObjectContext'
import * as THREE from 'three'
import { Euler } from 'three'
/**
 * 
 * @param {Position} and x, y, z object which holds the coordinates of where
 * to move camera
 * @returns The Camera with lerp settings to jump around the map! :/
 */

const Camera = ({position, v=new THREE.Vector3(), c = new THREE.Color()}) => {

    const ref = useRef()
    

    useFrame((state, delta) => {
      
        const step = delta * 10
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 75, step / 1.5)
        state.camera.position.lerp(v.set(position[0], position[1], position[2]), step / 1.5)
        //state.camera.lookAt(position[0], position[1], position[2])
        state.camera.setRotationFromEuler(new Euler(-1.5, 0, 0))
        state.camera.updateProjectionMatrix()
    })

    return(
        <mesh ref={ref} scale={4}>
            <boxBufferGeometry  attach="geometry"></boxBufferGeometry>
            <meshLambertMaterial attach="material"></meshLambertMaterial>
        </mesh>
    )
}

export { Camera }