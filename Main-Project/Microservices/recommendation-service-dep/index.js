const express = require('express');
//const bodyParser = require('body-parser');
const axios = require('axios');
//const { randomBytes } = require('crypto');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 8086;

const products = {};

const handleEvent = async (type, data) => {
  if(type === 'NewProduct'){

    const product = data;
    console.log("NewProduct", data);

    products[product.id] = {
      type: type,
      product: {
        id: product.id,
        headline: product.headline,
        description: product.description,
        categories: product.categories,
        tag: product.tag,
        badges: product.badges,
        price: product.price,
        imgSrc: product.imgSrc
      }
    };

    await axios.post('http://localhost:7999/events', {
      type: 'ProductAddedToReco',
      data: product
    });
  }
}

app.get('/products', (req, res) => {
  console.log("request -> response:", products);

  responseValue = Object.keys(products).map(key => {
    return products[key].product;
  })

  console.log("new resp",responseValue);

  res.status(201).send(responseValue);
  //res.status(201).send(products);
});

app.post('/events', async (req, res) => {
  console.log("new product added to recommendation", req.body);

  const { type, data } = req.body;

  await handleEvent(type, data);

  res.send({});
});

app.listen(port, async () => {
  console.log(`Listening on ${port}`);

  const res = await axios.get('http://localhost:7999/events');

  for (let event of res.data){
      console.log("processing event:", event.type, event.data);

      handleEvent(event.type, event.data);
  }
});
