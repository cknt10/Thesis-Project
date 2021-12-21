const express = require('express');
const cors = require('cors');
const axios = require('axios');

const port = 8087;

const app = express();
app.use(express.json());
app.use(cors());

const products = {};

const handleEvent = (type, data) => {
    if(type === 'New Product'){

        const { id, headline} = data;

        products[id] = {
            type: type,
            product: {
              id: id,
              headline: headline
            }
          };
    }
}

app.get('/events', (req, res)=>{
 res.send(products);
});

app.get('/searchresult', (req, res)=>{
    console.log("request", req.body);

    res.send(products);
});

app.post('/events', (req, res)=>{
    const { type, data} = req.body;

    handleEvent(type, data);

    console.log(posts);

    res.send({});

});

app.listen(port, async () => {
    console.log(`search-service has startet on port ${port}`);

    const res = await axios.get('http://localhost:7999/events');

    for (let event of res.data){
        console.log("processing event:", event.type);

        handleEvent(event.type, event.data);
    }
})