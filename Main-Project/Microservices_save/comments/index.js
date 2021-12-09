const express = require('express');
//const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 8084;

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {

  const commentId = randomBytes(4).toString('hex');
  console.log("comment body (push)",req.body)
  const { comment } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, comment, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:7999/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      comment,
      postId: req.params.id, 
      status: 'pending'
      }
  });

  res.status(201).send(comments);
});

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

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
