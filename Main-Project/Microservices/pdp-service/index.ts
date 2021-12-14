import express from "express";
import axios from 'axios';
//import bodyParser from 'body-parser';
import { randomBytes } from "crypto";
import cors from 'cors';

import { ProductCard } from './interfaces/ProductCard';
import { tempItems } from "./data/products";

const port: number = 8085;

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

const app = express();
app.use(express.json());//bodyparser statt express
app.use(cors(options));


var productCollection=new Map<string , ProductCard>();


app.get('/product', (req,res) => {

  //@ts-ignore
  let id :string= req.query.id;
  
  console.log("productCollection",productCollection, id);
  res.send(JSON.stringify(productCollection.get(id)));
});

app.post('/product',async (req,res) => {
    const id: string = randomBytes(4).toString('hex');

    console.log("product body",req.body);

    const 
    {
      headline, description, categories, tag, badges, sizes, price, imgSrc
    } = req.body;

    let newProduct :ProductCard = {
      id: "",
      headline: "",
      description: "",
      categories: [],
      tag: [],
      badges: [],
      sizes: [],
      price: 0,
      imgSrc: ""
    };
    
    newProduct.id = id;
    newProduct.headline = headline;
    newProduct.description = description;
    newProduct.categories = categories;
    newProduct.tag = tag;
    newProduct.badges = badges;
    newProduct.sizes = sizes;
    newProduct.price = price;
    newProduct.imgSrc = imgSrc;

    productCollection.set(id, newProduct);

    console.log("the collection",productCollection, typeof newProduct);

    await axios.post('http://localhost:7999/events', {
      type: 'NewProduct',
      data: newProduct
    });

    res.status(201).send(productCollection.get(id));
});

app.post('/events',async (req,res) => {
  console.log("Received Post-Event from bus", req.body.type as string);

  res.send({});
});

app.listen(port, () => {

  console.log(`localhost startet @port ${port}`);

  tempItems.forEach(async product => {
    
    productCollection.set(product.id, product);
    await axios.post('http://localhost:7999/events', {
      type: 'ProductCreated',
      data: product
    });
  });


});