const express = require('express');
const axios = require('axios');

const app = express();

const port = 7999;

const events = [];

app.use(express.json());

app.post('/events', (req, res)=>{
    const event = req.body;

    events.push(event)

    axios.post('http://localhost:8085/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to pdp-service`);
        }); //posts

    axios.post('http://localhost:8084/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to comments`);
        }); //comments

    axios.post('http://localhost:8086/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to recommendation-service`);
        }); //query post/comments

    axios.post('http://localhost:8087/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to moderation`);
        }); //moderation
    
    res.send({ status: 'OK'});

    console.log("handled request");
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(port, () => {
    console.log(`Bus startet to drive on port ${port}`);
})