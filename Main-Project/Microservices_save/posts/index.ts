import express from "express";
import axios from 'axios';
//import bodyParser from 'body-parser';
import { randomBytes } from "crypto";
import  cors from 'cors';

import Posts from './interfaces/Posts';

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


var postCollection=new Map<string , Posts>();

app.get('/posts', (req,res) => {
  
  console.log("postCollection",postCollection);
  res.send(JSON.stringify(Object.fromEntries(postCollection)));
});

app.post('/posts',async (req,res) => {
    const id: string = randomBytes(4).toString('hex');

    console.log("comment body",req.body);

    const { title } = req.body;

    let newPost:Posts={ id, title};
    newPost.id=id;
    newPost.title=title;

    postCollection.set(id, newPost);

    console.log("the collection",postCollection, typeof newPost);

    await axios.post('http://localhost:7999/events', {
      type: 'PostCreated',
      data: newPost
    });

    res.status(201).send(postCollection.get(id));
});

app.post('/events',async (req,res) => {
  console.log("Received Post-Event from bus", req.body.type as string);

  res.send({});
});

app.listen(port, () => {

    console.log(`localhost startet @port ${port}`);
});