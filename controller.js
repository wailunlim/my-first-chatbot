const getReply = require("./service").getReply;

exports.ask = (req, res, next) => {
  return getReply(req.body)
    .then(output => {
      res.status(200);
      res.send(output);
    })
    .catch(next);
};
