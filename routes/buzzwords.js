const express = require('express');
const router = express.Router();
const buzzword = require('../app.js');
const bodyParser = require('body-parser');

let buzzwordObj = {'buzzwords': []};

function checkKeys (bodyObject) {
  if(bodyObject.hasOwnProperty('buzzWord') && bodyObject.hasOwnProperty('points')){
    return true;
  }
  return false;
}

function createBuzzword (buzzword, points){
  let newBuzzword = {};
  newBuzzword.buzzWord = buzzword;
  newBuzzword.points = points;

  let buzzWordArray = buzzwordObj.buzzwords;
  buzzWordArray.push(newBuzzword);

  return;
}

function checkBuzzwordExists (buzzword) {
  let buzzWordArray = buzzwordObj.buzzwords;

  function hasBuzzword (element) {
    
  }

}

router.route('/')
  .get((req, res) => {
    res.send(JSON.stringify(buzzwordObj));
  })
  .post((req, res) => {
    if(!checkKeys(req.body)){
      res.send(`{ "success": false }`)
      return;
    };

    createBuzzword(req.body.buzzWord, req.body.points);
    
    res.send('{ "success": true }')
  })
  .put((req, res) => {
    if(!checkKeys(req.body)){
      res.send(`{ "success": false }`)
      return;
    };



  })

module.exports = router;