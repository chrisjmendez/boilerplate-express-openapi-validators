var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/:hash?', (req, res, next) => {
  let path = req.baseUrl;
  let { params, query, body } = req;

  res.status(200).send({
    status: res.statusCode,
    message: `${req.method} :hash - ${path}`,
    params: params,
    query: query
  });
});

module.exports = router;
