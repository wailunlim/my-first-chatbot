const express = require("express");
const app = express();
const ask = require("./controller").ask;
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", express.static("public"));
app.post("/ask", ask);

app.listen(9000, () => console.log("Listening on port 9000"));
