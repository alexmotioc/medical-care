import React, {useState, useContext} from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'
import DoctorPage from './components/DoctorPage';
import HomePage from './components/HomePage'
import CaregiverPage from './components/CaregiverPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { AuthContext } from "./context/authcontext";
import { CaregiverRoute, DoctorRoute } from './components/PrivateRoute'
import UserInfoComponent from './components/UserInfoComponent'


const Pages = () =>
{
    const {authTokens} = useContext(AuthContext);
    return (<Router>     
        <header className="App-header">
  
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"> 
            <FontAwesomeIcon className="App-logo" icon={faCookieBite} alt="cookie" />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
               <li class="nav-item">
                  <a class="nav-link" href="/login">Login</a>
                </li>
              </ul>
             
            </div>
            
        {authTokens != null && (<UserInfoComponent />)}
          </nav>
        </header>
        <div className="content">
        <Route exact path="/" component={HomePage} />
          <DoctorRoute path="/doctor" component={DoctorPage} />
          <CaregiverRoute path="/caregiver" component={CaregiverPage} />
          {/* <PrivateRoute path="/caregiver" component={CaregiverPage} /> */}
        
          <Route path='/login' component={LoginPage}/>

        </div>
        </Router>);
}

export default Pages;
