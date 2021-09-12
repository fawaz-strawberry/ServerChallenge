import './App.css'

import RightPanel from './components/RightPanel/RightPanel'
import LeftPanel from './components/Leftpanel/LeftPanel'
import {ConfigContext} from './contexts/ConfigContext'
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

  useEffect(() => {
    axios.get('http://localhost:5000/getAllConfigs').then(response => {
      console.log("Connected with server!")
      console.log(response)
      setConfigs(response.data)
    }).catch()
    {
      console.log("Error when connecting with server")
    }
  }, [])



  return (
    <div className="App">
      <ConfigContext.Provider value={{configs, setConfigs}}>
        <RightPanel />
        <LeftPanel />
      </ConfigContext.Provider>
    </div>
  );
}

export default App;
