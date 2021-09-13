import React from 'react'

/**
 * 
 * @param {Position} and x, y, z object which holds the coordinates of where
 * to generate the cube 
 * @returns The box :/
 */

const Box = ({position}) => {
    return(
        <mesh position={[position["x"], position["y"], position["z"]]}>
            <boxBufferGeometry attach="geometry"></boxBufferGeometry>
            <meshLambertMaterial attach="material" color="red"></meshLambertMaterial>
        </mesh>
    )
}

export { Box }