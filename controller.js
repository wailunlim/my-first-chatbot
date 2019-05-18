const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myfirstapp";
const client = new MongoClient(url);
const connection = client.connect();

const getReply = require("./service").getReply;

exports.ask = (req, res, next) => {
  return getReply(req.body)
    .then(output => {
      connection
        .then(() => {
          const db = client.db(dbName);
          const coll = db.collection("inventory");
          coll
            .findOne({ intent: output.entities.intent[0].value })
            .then(ans => {
              res.status(200);
              res.send(ans);
            });
        })
        .catch(() => console.log("error!"));
      res.status(200);
    })
    .catch(next);
};
