import React, { useState, useContext } from 'react'
import axios from 'axios';
import ReactStars from 'react-stars'
import { useAuth } from '../context/authcontext';

const StockCard = ({ cookie }) => {
    const { authTokens } = useAuth();
    const options = {
        headers: {
            'Authorization': 'Bearer '+ authTokens
        }}

    const { id, name, type, price, sweeteners,ratingAvg, stock} = cookie;
    const [amount, setAmount] = useState(stock.amount);

    const saveAmount = () => {
        axios.post("http://localhost:52741/Cookie/update-stock", 
        { 
            cookieId: id, 
            amount: amount
        },
        
          options
        )
            .then(result => {
                if (result.status === 200) {
                    //mesaj
                } else {

                }
            })
            .catch(e => {

            });
        
    }
    
   
    return (
        <div class="card" style={{ width: 18 + "rem" }}>
            {/* <img class="card-img-top" src="..." alt="Card image cap" /> */}
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">Type: {type}</p>
                <p class="card-text">Price: {price}</p>
                <p class="card-text">Sweetners: {sweeteners}</p>
               
               
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />

                <a href="#" class="btn btn-primary" onClick={saveAmount}>Update</a>
            </div>
        </div>
    );
}
export default StockCard
