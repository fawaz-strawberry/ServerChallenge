import React from 'react'

const Box = ({position}) => {
    return(
        <mesh position={[position["x"], position["y"], position["z"]]}>
            <boxBufferGeometry attach="geometry"></boxBufferGeometry>
            <meshLambertMaterial attach="material" color="red"></meshLambertMaterial>
        </mesh>
    )
}

export { Box }