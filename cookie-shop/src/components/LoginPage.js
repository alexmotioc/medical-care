
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/authcontext";
import { useHistory } from 'react-router-dom';


const LoginPage = () => {
    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setRole, setId } = useAuth();
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const history = useHistory();

    const handleSubmitClick = (e) => {
        if (state.username.length && state.password.length) {
            const payload = {
                "username": state.username,
                "password": state.password,

            }

            axios.post("https://localhost:44339/Auth", payload)
                .then(result => {
                    console.log(result);
                    if (result.status === 200) {
                        if(result.data!== null){
                        setRole(result.data.roles);
                        setId(result.data.userId)
                        setLoggedIn(true);
                        if(result.data.roles.includes("caregiver"))
                        history.push("/caregiver");
                        
}

                      
                    } else {
                        setIsError(true);
                    }
                })
                .catch(e => {
                    setIsError(true);
                });
        }
    }

    return (
        <div className="form-group col-12 col-lg-4">
            {/* ... */}
            <input type="username"
                className="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username"
                value={state.username}
                onChange={handleChange}
            />
            {/* ... */}
            <input type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitClick}
            >
                Login
          </button>
            <Link to="/register">Don't have an account?</Link>
            {isError && <div>The username or password provided were incorrect!</div>}
        </div>
    )
}

export default LoginPage