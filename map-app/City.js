/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/city.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.17}>
        <mesh geometry={nodes.Plane_1.geometry} material={materials.Concrete} />
        <mesh geometry={nodes.Plane_2.geometry} material={materials.RoofTop} />
        <mesh geometry={nodes.Plane_3.geometry} material={materials.CityBuilding} />
        <mesh geometry={nodes.Plane_4.geometry} material={materials.Asphalt} />
      </group>
    </group>
  )
}

useGLTF.preload('/city.glb')