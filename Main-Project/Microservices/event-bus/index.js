const express = require('express');
const axios = require('axios');
const cors = require('cors');
const requestIp = require('request-ip');
const userAgent = require('express-useragent');

const app = express();

const port = 7999;

const events = [];
const loginState = ["logout"];

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

app.post('/variations', async(req, res) => {

    console.log("req", req.body );
    const rawAgent = req.headers['user-agent'];
    agentValue = userAgent.parse(rawAgent).source;

    const body = req.body;

    let dyDataObject = {
        "selector": {
          "names": body.experiments || []
        },
        "user": {

        },
        "session": {

        },
        "context": {
          "page": {
            "type": "HOMEPAGE",
            "location": "https://example.org",
            "locale": "en_US",
            "data": []
          },
          "device": {
            "userAgent": agentValue,
            "ip": requestIp.getClientIp(req)
          }
        },
        "options": {
          "isImplicitPageview": false,
          " returnAnalyticsMetadata": false
        }
      }

      if(body.dy_uId && body.dy_uId.length > 0 /*&& body.dy_sId && body.dy_sId.length > 0*/){
        dyDataObject["user"] = {
          "dyid": body.dy_uId,
          "dyid_server":  body.dy_uId
        }
        dyDataObject["session"] = {
          "dy": body.dy_sId
        }
      };
      
      var config = {
        method: 'post',
        url: 'https://dy-api.com/v2/serve/user/choose',
        headers: { 
          'dy-api-key': '249626a040af3d20cd87dadd2ef128554667170f06f779958f615a7a1cf132f1', 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(dyDataObject)
      };


      let parsedDY;

      try{

        const result = await axios(config);
    
        //console.log("result", /*(result.data), */result.data.choices[0].variations[0].payload.data.variation);
        
        const data =result.data;

        parsedDY = data.choices.map(entry =>{
          let variationValue = entry.variations[0].payload.data;
          variationValue = (variationValue && variationValue.variation)?variationValue.variation:"c";
          return {
            "experimentId": entry.id,
            "experimentName": entry.name,
            "variantId": entry.variations[0].id,
            "variant": variationValue,
          }
        });

        const uId = data.cookies[0].value;
        const sId = data.cookies[1].value;

        console.log("my-dy", parsedDY);
  
        res.send({
            "variants": parsedDY,
            "cookies": {
              "dy_uId": `dy_uId=${uId};max-age=${uId};path=/;`,
              "dy_sId": `dy_sId=${sId};max-age=${sId};path=/;`
            }
          });
      }catch(e){
        res.status(200).send( "failed handling DY-request: " + e);
      }

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