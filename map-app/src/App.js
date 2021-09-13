import './App.css'

import RightPanel from './components/RightPanel/RightPanel'
import LeftPanel from './components/Leftpanel/LeftPanel'
import {ConfigContext} from './contexts/ConfigContext'
import {ObjectContext} from './contexts/ObjectContext'

import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  /**
   * Generated states to be shared amongst entire applicaiton, predefined here
   * Config is the default configurations of an object
   * myObjects is to hold actual objects based upon the configurations
   */
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
  ]})



  /**
   * Runs at the start of the applications to get configurations from the database
   * and the get all the currently open object ports. This is so you only really have
   * to open one server and stream data from multiple devices
   */
  useEffect(() => {
    //Get Configs
    axios.get('http://localhost:5000/getAllConfigs').then(response => {
      console.log("Connected with server!")
      console.log(response)
      setConfigs(response.data)
    }).catch(() => {
      console.log("Error when connecting with server")
    })

    //Get all open ports
    axios.get('http://localhost:8081/getAllObjectPorts').then(response => {
          
    var dataPoints = response["data"]
          
          for(var i = 0; i < dataPoints.length; i++)
          {
            var port = dataPoints[i]["port"]
            var config_to_gen = dataPoints[i]["config"]
            const socket = new WebSocket('ws://localhost:' + port)
            config_to_gen["port"] = port

            //Runs on socket open
            socket.addEventListener('open', function(event){
                console.log("Connected to WS Server")
                config_to_gen["port"] = port
                config_to_gen["key"] = config_to_gen["id"]
                setMyObjects({"data": [...myObjects["data"], config_to_gen]})
            })
        
            //Runs on socket message
            socket.addEventListener('message', function (event){
                var temp_store = JSON.parse(event.data)
                var temp_objects = myObjects["data"]
                var item_index = temp_objects.findIndex(element => element.id === temp_store.id)
                var newObjects = temp_objects
                
                if(item_index === -1)
                    newObjects.push(temp_store)
                else
                    newObjects[item_index] = temp_store
                
                setMyObjects({"data": newObjects})
            })
          }
    }).catch(() => {
      console.log("Error when trying to get ports")
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
