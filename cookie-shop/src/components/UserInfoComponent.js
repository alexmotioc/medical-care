import React, {useState, useEffect} from 'react'
import FavoriteCookieCard from './FavoriteCookieCards'
import axios from 'axios';
import { useAuth } from '../context/authcontext';
const UserInfoComponent = () => {
    const url = 'http://localhost:52741/account/info'
    const [data, setData] = useState([])
    const { authTokens } = useAuth();
    const options = {
        headers: {
            'Authorization': 'Bearer '+ authTokens
        }}
    const makeRequest =() => {
        axios.get(url,options).then(json => setData(json.data))}
    useEffect(() => {
        makeRequest();
      }, [])

    return (
        <div className="d-flex flex-row ">
        <div className="m-2 text-info">{data.balance}</div>
        <div className="m-2 text-info">{data.user}</div>
    </div>
    );
} 

export default UserInfoComponent