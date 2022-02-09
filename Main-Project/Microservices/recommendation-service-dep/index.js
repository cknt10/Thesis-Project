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
var loggedIn = false;

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
        privileges: product.privileges,
        imgSrc: product.imgSrc
      }
    };

    await axios.post('http://localhost:7999/events', {
      type: 'ProductAddedToReco',
      data: product
    });
  }
}

app.get('/products', async (req, res) => {
  //console.log("request",  req  );


  let responseValue = Object.keys(products).map(key => {
    return products[key].product;
  });


  console.log("initial Value",responseValue.length);

  if(!loggedIn){
    responseValue = responseValue.filter(product => {
      if(product.privileges && product.privileges.includes("VIP")){
        return false;
      }
      else return true;
    });
  }

  try{

    if(req.query.dy_uId)
      await axios.post('http://localhost:7999/variations', {
        experiments: [ 'CK: A/B Test Bubble' ],
        dy_uId: req.query.dy_uId
      })
      .then((response) => {
        //console.log("DY result", response);
        for(let experiment in response.data.variants){
          let expValue = response.data.variants[experiment];
          
          if(expValue.experimentName === 'CK: A/B Test Bubble'){
            if(expValue.variant === 1){
              console.log("exp Value",responseValue.length);
            }
            else {
              responseValue = responseValue.filter(product => {
                if(product.tag && product.tag.includes("Bubble Test")){
                  return false;
                }
                else return true;
              });
            }
          }
        }
      });
  }
  catch(er){
    console.log("failed requesting SS-variant", er);
  }

  res.status(200).send(responseValue);
});

app.post('/events', async (req, res) => {
  console.log("new product added to recommendation", req.body);

  const { type, data } = req.body;

  await handleEvent(type, data);

  res.send({});
});

app.post('/defineUser', (req,res) => {

  const { value }= req.body

  if(value === "login")loggedIn = true;
  else if(value === "logout")loggedIn = false;

  console.log("login on recommendation-service", req.body);
  
  res.send({ status: 200 });
});

app.listen(port, async () => {
  console.log(`Listening on ${port}`);

  const res = await axios.get('http://localhost:7999/events');

  for (let event of res.data){
      console.log("processing event:", event.type, event.data);

      handleEvent(event.type, event.data);
  }
});
