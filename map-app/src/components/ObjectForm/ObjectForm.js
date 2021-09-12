import React from 'react'
import {useState, useContext} from 'react'
import FormElement from '../FormElement/FormElement'
import './style.css'
import axios from 'axios'
import {ConfigContext} from "../../contexts/ConfigContext"

const ObjectForm = () => {
  
    const {setConfigs} = useContext(ConfigContext)

    const [formEntry, setFormEntry] = useState([
        {key:"id", value: 1},
        {key:"title", value: "Test Title"},
        {key:"loc_X", value: "25"},
        {key:"loc_Y", value: "25"},
        {key:"loc_Z", value: "25"}
    ])


    function addField()
    {
        var input = document.getElementsByClassName("NewFieldName")[0].value
        if(input !== "")
        {
            let newForm = {"key": input, "value": ""}
            var temp_form = [...formEntry, newForm]
            setFormEntry(temp_form)  
        }
    }

    function submitConfig()
    {
        console.log(formEntry)
        axios.post('http://localhost:5000/addConfig', {"elements": formEntry}).then(response => {
            console.log("Adding Configuration To Server")
            console.log(response.data)
            setConfigs(response.data)
          }).catch(error => {
            console.log("Error when connecting with server")
          })
            
    }

    return (
    <div>
        {formEntry.map((element) => (
            <FormElement key={element.key} myKey={element.key} value={element.value} form={formEntry} setForm={setFormEntry}></FormElement>
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
