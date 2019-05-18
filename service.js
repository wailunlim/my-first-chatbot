const { Wit, log } = require("node-wit");

const client = new Wit({
  accessToken: "IRNKUFXAKFABHY6WWF2Z3JKCM5TEAL4P",
  logger: new log.Logger(log.DEBUG)
});

exports.getReply = body => client.message(body.q);
