const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res) {
   const shortId = shortid(8);
   const body = req.body;
   if (!body.url) {
    res.status(400).json({error:'url is required'});
   }
   await URL.create({
    shortId:shortId,
    redirectUrl:body.url,
    visitHistory:[]
   });
   return res.status(200).json({id:shortId});
}

async function handleRedirection(req,res) {
   const shortId = req.params.shortId;
   console.log(req.params);
   const entry = await URL.findOneAndUpdate({shortId},{
    $push:{
        visitHistory:{timeStamp:Date.now()}
    }
   });

   res.redirect(entry.redirectUrl);
}

module.exports = {handleGenerateNewShortURL,handleRedirection}