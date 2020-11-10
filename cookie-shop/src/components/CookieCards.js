import React,{useContext} from 'react'
import axios from 'axios';
import ReactStars from 'react-stars'
import { useAuth } from '../context/authcontext';
import {CartContext} from '../context/cartcontext'
const CookieCard = ({ cookie }) => {
    const { authTokens } = useAuth();
    const {cartItems, setCartItems} = useContext(CartContext);

    const addToCart = () => {

       

        if (cartItems.some(e => e.cookie.id === cookie.id)) {
            
            console.log("Already in cart");
            var newData = cartItems.map(el => {
                if(el.cookie.id === cookie.id)
                   return {cookie, amount: el.amount + 1}
                return el;
            });

            setCartItems(newData)
          }
        else {
            setCartItems([...cartItems, {cookie, amount : 1}])
            console.log(cartItems);
        }
        
    }
    const options = {
        headers: {
            'Authorization': 'Bearer '+ authTokens
        }}
    const { id, name, type, price, sweeteners,ratingAvg} = cookie;
    const ratingChanged = (newRating) => {
        axios.post("http://localhost:52741/Cookie/rate", 
        { 
            cookieId: id, 
            rating: Math.round(newRating)
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
        console.log(newRating)
    }
    
    const addToFavorites = () => {
        axios.post("http://localhost:52741/Account/add-favorite", { id }, options)
            .then(result => {
                if (result.status === 200) {
                    //mesaj
                } else {

                }
            })
            .catch(e => {

            });
    }
    const buyCookies = () => {
        axios.post("http://localhost:52741/Account/buy-cookie", { id }, options)
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
        <div className="card " style={{ width: 18 + "rem" }}>
            {/* <img class="card-img-top" src="..." alt="Card image cap" /> */}
            <div class="card-body  d-flex  flex-column justify-content-center">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">Type: {type}</p>
                <p class="card-text">Price: {price}</p>
                <p class="card-text">Sweetners: {sweeteners}</p>
                {(authTokens!=null) && ( <ReactStars  count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} value={Math.round(ratingAvg)} />)}
                <p><a href="#" class="btn btn-primary" onClick={addToCart}>Add to cart</a></p>
                <p><a href="#" class="btn btn-primary" onClick={addToFavorites}>Add to favorites</a></p>
                <p><a href="#" class="btn btn-primary" onClick={buyCookies}>Buy</a></p>
            </div>
        </div>
    );
}
export default CookieCard
