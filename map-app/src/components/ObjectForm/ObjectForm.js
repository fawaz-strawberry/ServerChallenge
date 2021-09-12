import React, { useEffect } from 'react'
import {useState, useContext} from 'react'
import './style.css'
import axios from 'axios'
import {ConfigContext} from "../../contexts/ConfigContext"
import {v4 as uuidv4} from 'uuid';




const ObjectForm = ({selected}) => {
  
    const {configs, setConfigs} = useContext(ConfigContext)

    const [formEntry, setFormEntry] = useState({"data": [
        {key:"id", value: uuidv4()},
        {key:"title", value: "Test Title"},
        {key:"loc_X", value: "25"},
        {key:"loc_Y", value: "25"},
        {key:"loc_Z", value: "25"}
    ]})


    useEffect(() => {
        if(selected !== -1)
        {
            let newForm = []
            
            let config_index = 0
            for(var i = 0; i < configs.length; i++)
            {

                if(configs[i]["id"] === selected + "")
                {
                    config_index = i
                    break
                }
            }
            let myKeys = Object.keys(configs[config_index])
            for(i = 0; i < myKeys.length; i++)
            {
                if(myKeys[i] === "_id")
                    continue

                newForm.push({"key": myKeys[i], "value": configs[config_index][myKeys[i]]})
            }


            console.log("Configs: --------- ")
            console.log(configs)

            
            var index = newForm.findIndex((element, index) => {
                if(element.key === "id")
                {
                    return true
                }
                else
                {
                    return false
                }
            })
            newForm[index].value = selected
            setFormEntry({"data" : newForm})
        }
        else{
            
        }
    }, [])

    function addField()
    {
        var input = document.getElementsByClassName("NewFieldName")[0].value
        if(input !== "")
        {
            let newForm = {"key": input, "value": ""}
            var temp_form = {"data": [...formEntry.data, newForm]}
            setFormEntry(temp_form)  
        }
    }

    function submitConfig()
    {
        console.log(formEntry)
        if(selected !== -1)
        {
            axios.post('http://localhost:5000/updateConfig', {"elements": formEntry["data"], "body": selected}).then(response => {
                console.log("Adding Configuration To Server")
                console.log(response.data)
                setConfigs(response.data)
              }).catch(error => {
                console.log("Error when connecting with server")
              })
        }
        else
        {
            axios.post('http://localhost:5000/addConfig', {"elements": formEntry.data}).then(response => {
                console.log("Adding Configuration To Server")
                console.log(response.data)
                setConfigs(response.data)
              }).catch(error => {
                console.log("Error when connecting with server")
              })
        }

            
    }

    function modifyInput(e, targ)
    {
        let newForm = formEntry["data"]
        let targetKey = targ
        var index = newForm.findIndex((element, index) => {
            if(element.key === targetKey)
            {
                return true
            }
            else
            {
                return false
            }
        })
        console.log(index)
        var my_value = e.target.value
        newForm[index].value = my_value
        // console.log("I want to change to: " + e.target.value)
        setFormEntry({"data": newForm})

    }

    return (
    <div>
        {console.log(formEntry)}
        {formEntry["data"].map((element, index) => (
            <div className="EntryField">
                <label className="LabelKey">{element.key}: </label>
                {element.key !== "id" ? <input key={element.key} className="InputValue" value={element.value} onChange={(e, targ) => {modifyInput(e, element.key)}}></input> :
                    selected === -1 ? <label className="LabelKey">{" " + element.value}</label> : <label className="LabelKey">{" " + selected}</label> }
            </div>
    
    ))}

        <hr></hr>

        <input className="NewFieldName"></input>
        <button className="SubmitNewField" onClick={() => {
            addField()
        }}>Add New Field</button>
        <button className="SubmitConfiguration" onClick={() => {
            submitConfig()
        }}>Submit</button>
    </div>
  )
}

export default ObjectForm
