const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('You hit the api route.');
});

module.exports = router;
