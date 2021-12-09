const express = require('express');
const cors = require('cors');
const axios = require('axios');

const port = 8086;

const app = express();
app.use(express.json());
app.use(cors());

const posts = {}

const handleEvent = (type, data) => {
    if(type === 'CommentCreated'){

        const { id, comment, postId, status} = data;

        const post = posts[postId];
        post.comments.push({ id, comment, status});

    } else if(type === 'PostCreated'){
        
        const { id, title } = data;
        posts[id] = { id, title, comments: [] } ;

    } else if(type === 'CommentUpdated'){
        
        const { id, comment, postId, status} = data;

        const post = posts[postId];
        const oldComment = post.comments.find(comment => {
            return comment.id === id;
          });
          oldComment.status = status;
          oldComment.comment = comment;
          
    }
}

app.get('/events', (req, res)=>{
 res.send(posts);
});

app.post('/events', (req, res)=>{
    const { type, data} = req.body;

    handleEvent(type, data);

    console.log(posts);

    res.send({});

});

app.listen(port, async () => {
    console.log(`CP-Query has startet on port ${port}`);

    const res = await axios.get('http://localhost:7999/events');

    for (let event of res.data){
        console.log("processing event:", event.type);

        handleEvent(event.type, event.data);
    }
})