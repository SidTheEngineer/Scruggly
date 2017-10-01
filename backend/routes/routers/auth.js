const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Successful login.');
});

module.exports = router;
