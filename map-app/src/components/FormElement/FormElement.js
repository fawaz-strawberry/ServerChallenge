import React from 'react'
import './style.css'

const FormElement = ({myKey, value, form, setForm}) => {
  
    function modifyInput(e)
    {
        let newForm = form
        var index = newForm.findIndex((element, index) => {
            if(element.key === myKey)
            {
                return true
            }
            else
            {
                return false
            }
        })
        newForm[index].value = e.target.value
        setForm(newForm)
    }
  
    return (
    <div className="EntryField">
      <label className="LabelKey">{myKey}: </label>
      <input className="InputValue" onChange={(e) => {modifyInput(e)}}></input>
    </div>
  )
}

export default FormElement
