import axios from 'axios'
const sendDetailsToServer = (url, payload) => {
   
      
        axios.post(url, payload)
            .then(function (response) {
                if(response.data.code === 200) {
                   console.log('Registration successful. Redirecting to home page..');
                  
                    // redirectToHome();
                   
                } else{
                    console.log("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    
    
}

export default sendDetailsToServer