const express = require('express');

const router = express.Router();

router.get('/callback', (req, res) => {
  res.send('Successful login.');
});

module.exports = router;
