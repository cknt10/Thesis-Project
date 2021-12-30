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

        const { id, headline} = data;

        products[id] = {
            type: "SearchProduct",
            product: {
              id: id,
              headline: headline
            }
          };
    }
}

app.get('/events', (req, res) => {


    res.send(products);
});

app.get('/searchresult', (req, res)=>{
    console.log("request", req.body);

    const keys = Object.keys(products);
    const values = keys.map(key => {
        return products[key];
    });


    //let tempstr = "i";
    let response = [];

    values.forEach(entry => {
        //if(entry.product.headline.includes(tempstr))response.push(entry);
        response.push(entry);
    });

    console.log("my resp", response);

    res.send(response);
});

app.post('/events', (req, res)=>{
    const { type, data} = req.body;

    handleEvent(type, data);

    console.log(posts);

    res.send({});

});

app.post('/login', (req,res) => {

    loggedIn = true;
  
    console.log("login on search-service")
    
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