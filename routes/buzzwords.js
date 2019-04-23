const express = require('express');
const router = express.Router();
const buzzword = require('../app.js');
const bodyParser = require('body-parser');

let buzzwordObj = { buzzwords: [] };

function checkKeys(bodyObject) {
  if (bodyObject.hasOwnProperty('buzzWord') && bodyObject.hasOwnProperty('points')) {
    return true;
  }
  return false;
}

function createBuzzword(buzzword, points) {
  let newBuzzword = {};
  newBuzzword.buzzWord = buzzword;
  newBuzzword.points = points;

  let buzzWordArray = buzzwordObj.buzzwords;
  buzzWordArray.push(newBuzzword);

  return;
}

function checkBuzzwordExists(buzzword) {
  let buzzWordArray = buzzwordObj.buzzwords;

  function hasBuzzword(object) {
    return object.buzzWord === buzzword;
  }

  return buzzWordArray.some(hasBuzzword);
}

function updateBuzzWordPoints(buzzword, points) {
  let buzzWordArray = buzzwordObj.buzzwords;

  buzzWordArray.forEach((objectPair) => {
    if (objectPair.buzzWord === buzzword) {
      objectPair.points = points;
    }
    return;
  });
  return;
}

router
  .route('/')
  .get((req, res) => {
    res.send(JSON.stringify(buzzwordObj));
  })
  .post((req, res) => {
    if (!checkKeys(req.body)) {
      res.send(`{ "success": false }`);
      return;
    }

    if (checkBuzzwordExists(req.body.buzzWord)) {
      console.log('BuzzWord already exists!');
      res.send(`{ "success": false }`);
      return;
    }

    createBuzzword(req.body.buzzWord, req.body.points);

    res.send('{ "success": true }');
  })
  .put((req, res) => {
    if (!checkKeys(req.body)) {
      res.send(`{ "success": false }`);
      return;
    }

    if (!checkBuzzwordExists(req.body.buzzWord)) {
      console.log('BuzzWord to update does not exist!');
      res.send(`{ "success": false }`);
      return;
    }

    updateBuzzWordPoints(req.body.buzzWord, req.body.points);

    res.send('{ "success": true }');
  });

module.exports = router;
