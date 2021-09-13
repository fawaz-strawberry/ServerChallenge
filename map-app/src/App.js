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

  const [myObjects, setMyObjects] = useState({"data":[
    {
      port: "4200",
      id: "Random UUID",
      title: "CyberTruck",
      loc_x: "12",
      loc_y: "13",
      loc_z: "0",
      random_param_38: "wowzers"
    }
  ]})

  useEffect(() => {
    axios.get('http://localhost:5000/getAllConfigs').then(response => {
      console.log("Connected with server!")
      console.log(response)
      setConfigs(response.data)
    }).catch(() => {
      console.log("Error when connecting with server")
    })

    axios.get('http://localhost:8081/getAllObjectPorts').then(response => {
          console.log(response)
          var dataPoints = response["data"]
          for(var i = 0; i < dataPoints.length; i++)
          {
            var port = dataPoints[i]["port"]
            var config_to_gen = dataPoints[i]["config"]
            const socket = new WebSocket('ws://localhost:' + port)
            config_to_gen["port"] = port
            socket.addEventListener('open', function(event){
                console.log("Connected to WS Server")
                config_to_gen["port"] = port
                config_to_gen["key"] = config_to_gen["id"]
                setMyObjects({"data": [...myObjects["data"], config_to_gen]})
            })
        
            socket.addEventListener('message', function (event){
                var temp_store = JSON.parse(event.data)
                var temp_objects = myObjects["data"]
                var item_index = temp_objects.findIndex(element => element.id === temp_store.id)
                var newObjects = temp_objects
                if(item_index === -1)
                {
                    newObjects.push(temp_store)
                }
                else
                {
                    newObjects[item_index] = temp_store
                }
                
                setMyObjects({"data": newObjects})
            })
          }

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
