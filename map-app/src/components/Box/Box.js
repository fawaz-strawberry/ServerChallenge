import React from 'react'

const Box = () => {
    return(
        <mesh>
            <boxBufferGeometry attach="geometry"></boxBufferGeometry>
            <meshLambertMaterial attach="material" color="red"></meshLambertMaterial>
        </mesh>
    )
}

export { Box }