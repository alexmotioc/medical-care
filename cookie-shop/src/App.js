import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Pages from './Pages'
import { AuthContext } from "./context/authcontext";


function App() {

  const existingRole = JSON.parse(localStorage.getItem("role"));

  const [role, setRole] = useState(existingRole);


  const setRoleInstorage = (data) => {
    localStorage.setItem("role", JSON.stringify(data));
    setRole(data);
  }

  const existingId = JSON.parse(localStorage.getItem("id"));

  const [id, setId] = useState(existingId);


  const setIdInstorage = (data) => {
    localStorage.setItem("id", JSON.stringify(data));
    setId(data);
  }


  return (
    <div className="App">
      <AuthContext.Provider value={{ 
        // adds role and id on authContext
        // can be accessed with useAuth()
        role, setRole: setRoleInstorage ,
        id, setId: setIdInstorage ,

        }}>
     
      <Pages />
      
      </AuthContext.Provider>
    </div>
  );
}

export default App;
