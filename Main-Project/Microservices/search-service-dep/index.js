const express = require('express');
const cors = require('cors');
const axios = require('axios');

const port = 8087;

const app = express();
app.use(express.json());
app.use(cors());

const products = {};

var loggedIn = false

const handleEvent = (type, data) => {
    if(type === 'NewProduct'){

        const { id, headline, privileges} = data;

        products[id] = {
            type: "SearchProduct",
            product: {
              id: id,
              headline: headline,
              privileges: privileges
            }
          };
    }
}

app.get('/events', (req, res) => {


    res.send(products);
});

app.get('/searchresult', (req, res)=>{
    console.log("request", req.body);

    let keys = Object.keys(products);

    let response = keys.map(key => {
        return products[key];
    });

    response = response.filter(product => {
        if(!loggedIn && product.privileges && product.privileges.includes("VIP")){
            return false;
        }
        else return true;
    });

    console.log("my resp", response);

    res.send(response);
});

app.post('/events', (req, res)=>{
    const { type, data} = req.body;

    handleEvent(type, data);

    res.send({});

});

app.post('/defineUser', (req,res) => {

    const { value }= req.body
  
    if(value === "login")loggedIn = true;
    else if(value === "logout")loggedIn = false;
  
    console.log("login on search-service", req.body);
    
    res.send({ status: 200 });
  });

app.listen(port, async () => {
    console.log(`search-service has startet on port ${port}`);

    const res = await axios.get('http://localhost:7999/events');

    for (let event of res.data){
        console.log("processing event:", event.type);

        handleEvent(event.type, event.data);
    }
})