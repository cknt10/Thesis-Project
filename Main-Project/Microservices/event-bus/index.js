const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const port = 7999;

const events = [];
const loginState = ["logout"];
const variation = {
    recommendation: ["v1"]
};

app.use(express.json());
app.use(cors());//Wäre bei einem Login Service nicht nötig

app.post('/events', (req, res)=>{
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:8085/events', event).catch((err) => {
        console.log(err.message, `got ${event} while sending to pdp-service`);
        }); //pdp-service

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

app.get('/getVariations', (req, res) => {
    console.log("events", events);
    res.send({data: variation});
});

app.post('/defineUser',async (req, res)=>{
    
    const value = req.body.params.updates[0].value;

    const event = { value: value};
    loginState.push(value);

    try{

        await axios.post('http://localhost:8086/defineUser', event).then(response => {
            if(response.status !== 200){
                throw "recommendation-service";
            }
        });

        await axios.post('http://localhost:8087/defineUser', event).then(response => {
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

app.get('/defineUser',async (req, res)=>{
    if(loginState.length > 0){

        res.status(201).send({ response: loginState[loginState.length-1]});
    }
    else res.status(201).send({ response: "false"});
})

app.listen(port, () => {
    console.log(`Bus startet to drive on port ${port}`);
})