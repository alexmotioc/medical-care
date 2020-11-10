import React, { useState, useEffect } from 'react'
import CookieCard from './CookieCards'
import axios from 'axios';
import { useAuth } from "./../context/authcontext";


const querystring = require('querystring');
const CookiesPage = () => {
    const { id } = useAuth(); // id of logged in user
    const url = 'http://localhost:52741/Doctor/' + id ;
    const [data, setData] = useState([])

    
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const num = ['',1,2,3,4,5]
    const [searchRating, setSearchRating] = useState("");
    const handlesearchRatingChange = event => {
        setSearchRating(event.target.value);
    };


    useEffect(() => {
        axios.get(url).then(json => setData(json.data))
    }, [searchTerm, searchRating])

   

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Search"
                // value={searchTerm}
                onBlur={handleChange}
            />
            {/* dropdown */}
            <select name="select" onChange={handlesearchRatingChange}>
  {num.map(function(n) { 
      return (<option value={n} selected={searchRating === n}>{n}</option>);
  })}
</select>
            <div className="d-flex flex-row flex-wrap">
                {data.map(cookie => {
                    return (
                        <CookieCard cookie={cookie}></CookieCard>
                    )
                })}
            </div>
        </React.Fragment>)

}

export default CookiesPage