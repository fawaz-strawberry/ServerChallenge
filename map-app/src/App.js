import './App.css'

import RightPanel from './components/RightPanel/RightPanel'
import LeftPanel from './components/Leftpanel/LeftPanel'
import {ConfigContext} from './contexts/ConfigContext'
import {ObjectContext} from './contexts/ObjectContext'
import { useState, useEffect } from 'react'

import axios from 'axios'

function App() {

  const [configs, setConfigs] = useState([
    {
        id: 3,
        title: 'Optimus',
        location: {'x': 0, 'y': 0, 'z': 0}
    },
    {
        id: 7,
        title: 'Prime',
        location: {'x': 0, 'y': 0, 'z': 0}
    },    
    {
      id: 7,
      title: 'Megatron',
      location: {'x': 0, 'y': 0, 'z': 0}
    }
  ])

  const [myObjects, setMyObjects] = useState([
    {
      port: "4200",
      id: "Random UUID",
      title: "CyberTruck",
      loc_x: "12",
      loc_y: "13",
      loc_z: "0",
      random_param_38: "wowzers"
    }
  ])

  useEffect(() => {
    axios.get('http://localhost:5000/getAllConfigs').then(response => {
      console.log("Connected with server!")
      console.log(response)
      setConfigs(response.data)
    }).catch(() => {
      console.log("Error when connecting with server")
    })
  }, [])



  return (
    <div className="App">
      <ObjectContext.Provider value={{myObjects, setMyObjects}}>
      <ConfigContext.Provider value={{configs, setConfigs}}>
        <RightPanel />
        <LeftPanel />
      </ConfigContext.Provider>
      </ObjectContext.Provider>
    </div>
  );
}

export default App;
