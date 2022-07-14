const axios = require("axios");
const api = "https://backend.crypto528.com"

let CollectEmail = (email) => {
    return axios.post(`${api}/api/v1/submitEmail`, { email })
        .then(data => { 
            console.log(data);          
            return data
        })
        .catch((error) => {                      
            return (error)
        });    
}
export { CollectEmail };