import React from 'react'
import {useContext} from 'react'
import {ConfigContext} from "../../contexts/ConfigContext"

import './style.css'

const ObjectConfigs = () => {

    const {configs} = useContext(ConfigContext)

    return (
        <>
        {configs.map((config) => (
            <>
                <div className="Config" key={config.title}>
                    <div className="Logo">IMG</div>
                    <div className="Title">{config.title}</div>
                    <div className="Details">Something interesting of the object</div>
                    <button>Edit Config</button>
                </div>
                
            </>
        ))}
        
        </>
  )
}

export default ObjectConfigs
