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

    const product = data.product;

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
  res.send(products);
});

app.post('/events', async (req, res) => {
  console.log("new product added to recommendation", req.body);

  const { type, data } = req.body;

  await handleEvent(type, data);

  res.send({});
});


/*
app.post('/events', async (req,res) => {
  
  const { type, data} = req.body;

  console.log("Received Comment-Event from bus", type);

  if(type === 'CommentModerated'){
    const { postId, id, status, comment } = data;
    const comments = commentsByPostId[postId];

    const oldComment = comments.find(comment => {
      return comment.id === id;
    });
    oldComment.status = status;

    await axios.post('http://localhost:7999/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId, 
        comment,
      }
    }).catch((err) => {
        console.log(err.message);
      });;
  }

  res.send({});
});
*/

app.listen(port, async () => {
  console.log(`Listening on ${port}`);

  const res = await axios.get('http://localhost:7999/events');

  for (let event of res.data){
      console.log("processing event:", event.type);

      handleEvent(event.type, event.data);
  }
});