const express = require("express");
const app = express();
const ask = require("./controller").ask;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", express.static("public"));
app.post("/ask", ask);

app.listen(3000, () => console.log("Listening on port 3000"));
