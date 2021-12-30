const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const port = 7999;

const events = [];


app.use(express.json());
app.use(cors());//Wäre bei einem Login SErvice nicht nötig

app.post('/events', (req, res)=>{
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:8085/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to pdp-service`);
        }); //pdp-service

        /*
    axios.post('http://localhost:8084/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to comments`);
        }); //comments
        */

    axios.post('http://localhost:8086/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to recommendation-service`);
        }); //recommendation-service

    axios.post('http://localhost:8087/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to moderation`);
        }); //search-service
    
    res.send({ status: 'OK'});

    console.log("handled request");
});

app.get('/events', (req, res) => {
    console.log("events", events);
    res.send(events);
});

app.post('/login',async (req, res)=>{
    const event = req.body;

    try{

        await axios.post('http://localhost:8086/login', event).then(response => {
            if(response.status !== 200){
                throw "recommendation-service";
            }
        });

        await axios.post('http://localhost:8087/login', event).then(response => {
            if(response.status !== 200){
                throw "search-service";
            }
        });

        res.send({
            data:'Login successfull and returns User'
        });
    }
    catch(er){
        console.log("failed Login", er);
        res.send({ message:`Login failed: ${er}`});
    }
});

app.listen(port, () => {
    console.log(`Bus startet to drive on port ${port}`);
})