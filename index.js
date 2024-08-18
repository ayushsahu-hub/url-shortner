const express = require('express');
const connectToMongoDb = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const port = 8001;

connectToMongoDb('mongodb://localhost:27017/short-url').then(()=>{
    console.log('mongodb connected');
});

app.use(express.json());

app.use('/url',urlRoute);
app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{
     $push:{
        visitHistory:{timeStamp:Date.now()}
     }
    });
 
    res.redirect(entry.redirectUrl);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));