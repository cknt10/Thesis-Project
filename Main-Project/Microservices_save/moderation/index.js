const express = require('express');
//const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(express.json());

const port = 8087;

app.post('/events', async (req,res) => {
    const { type, data} = req.body;

    if(type === 'CommentCreated'){

        const status=data.comment.includes('orange')?'rejected': 'approved';

        await axios.post('http://localhost:7999/events',{
            type:  'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                comment: data.comment
            }
        }).catch((err) => {
                console.log(err.message);
        });
    }

     res.send({});
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
