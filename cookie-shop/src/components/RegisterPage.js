import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from './AuthPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import sendDetailsToServer from "../services/sendDetailsToServer";

const RegisterPage = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleSubmitClick = (e) => {
        if(state.email.length && state.password.length) {
            const payload={
                "email":state.email,
                "username":state.username,
                "password":state.password,
                "confirmpassword":state.password,
            }
            const url = 'http://localhost:52741/Authentification/register';
            sendDetailsToServer(url, payload);
        }
    }
    return (
        <div className="form-group col-12 col-lg-4">
            {/* ... */}
            <input type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
            />
            {/* ... */}
            <input type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={state.username}
                onChange={handleChange}
            />
            <input type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
            />
            <input type="password"
                className="form-control"
                id="confirmpassword"
                placeholder="Confirm Password"
                value={state.confirmpassword}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitClick}
            >
                Register
          </button>
        </div>
    )
} 

export default RegisterPage