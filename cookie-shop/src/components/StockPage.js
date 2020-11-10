import React, {useState, useEffect} from 'react'
import StockCard from './StockCards'
import axios from 'axios';
import { useAuth } from '../context/authcontext';
const StockPage = () => {
    const url = 'http://localhost:52741/Cookie'
    const [data, setData] = useState([])
    const { authTokens } = useAuth();
    const options = {
        headers: {
            'Authorization': 'Bearer '+ authTokens
        }}
    const makeRequest =() => {axios.get(url,options).then(json => setData(json.data))}
    useEffect(() => {
        makeRequest();
      }, [])

    return (
        <div className="d-flex flex-row flex-wrap">
        {data.map(cookie => {
        return (
         <StockCard refresh={makeRequest} cookie={cookie}></StockCard>
        )
      })}
    </div>
    );
} 

export default StockPage