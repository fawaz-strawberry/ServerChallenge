import React from 'react'
import "./style.css"

const ObjectData = ({myConfig}) => {
  return (
    <div className="Element">
      <h2>{myConfig["title"]}</h2>
      <h3>{myConfig["id"]}</h3>
      <div className="EnhancedDetail">
        {Object.keys(myConfig).map((element) => (
            element === "id" || element === "title" || element === "key" ? null : <h4 className="DataField">{element + ": " + myConfig[element]}</h4>
        ))}
      </div>
    </div>
  )
}

export { ObjectData }
