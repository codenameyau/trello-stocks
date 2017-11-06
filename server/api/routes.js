const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: `Hooray! Our API is up and running!` });
});

module.exports = router;
