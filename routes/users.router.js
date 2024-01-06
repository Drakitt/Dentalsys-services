const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) =>{
  res. json({
    name: 'marcos',
    cel: 7877,
    edad: 25,
    ciudad: 'la paz'
  });
})

module.exports = router;
