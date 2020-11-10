import React from 'react'
import axios from 'axios';
const FavoriteCookieCard = ({cookie, refresh}) => {
const {id, name, type, price, sweeteners}=cookie;
const addToFavorites = () => {
    axios.post("http://localhost:52741/Account/remove-favorite", {id} )
                .then(result => {
                    if (result.status === 200) {
                        refresh();
                    } else {
                        
                    }
                })
                .catch(e => {
                    
                });
}
    return (
        <div class="card" style={{width:18+"rem"}}>
            {/* <img class="card-img-top" src="..." alt="Card image cap" /> */}
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">Type: {type}</p>
                <p class="card-text">Price: {price}</p>
                <p class="card-text">Sweetners: {sweeteners}</p>
                <a href="#" class="btn btn-primary">Add to cart</a>
                <a href="#" class="btn btn-primary" onClick={addToFavorites}>Remove from favorites</a>
            </div>
        </div>
    );
}
export default FavoriteCookieCard
