import React, {useState, useEffect} from 'react'
import FavoriteCookieCard from './FavoriteCookieCards'
import axios from 'axios';
import { useAuth } from '../context/authcontext';
const CareGiverPage = () => {
  const { id } = useAuth();
    const url = 'http://localhost:44339/Caregiver/' + id +'/Patients'
    const [data, setData] = useState([])
  
    const makeRequest =() => {axios.get(url).then(json => {setData(json.data) ;  console.log(json.data)})}
    useEffect(() => {
        makeRequest();
      }, [])

    return (
        <div className="d-flex flex-row flex-wrap">
        {data.map(pat => {
        return (
          <div> {pat.name} </div>
        //  <FavoriteCookieCard refresh={makeRequest} cookie={cookie}></FavoriteCookieCard>
        )
      })}
    </div>
    );
} 

export default CareGiverPage;