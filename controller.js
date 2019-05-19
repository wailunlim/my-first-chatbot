const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myfirstapp";
const client = new MongoClient(url);
const connection = client.connect();

const getReply = require("./service").getReply;

exports.ask = (req, res, next) => {
  return getReply(req.body)
    .then(output => {
      connection.then(
        () => {
          const db = client.db(dbName);
          console.log(output);
          if (
            output.entities.intent === undefined ||
            output.entities.intent[0].confidence < 0.6
          ) {
            res.status(200);
            res.send({
              reply: "Hmm, I didn't quite get that... Could you rephrase?"
            });
          } else {
            const coll = db.collection(output.entities.intent[0].value);
            coll
              .find({})
              .toArray()
              .then(arr => {
                res.status(200);
                const index = Math.floor(Math.random() * arr.length);
                res.send(arr[index]);
              });
          }
        },
        err => console.log(err)
      );
      res.status(200);
    })
    .catch(next);
};
