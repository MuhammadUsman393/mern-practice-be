const express = require("express");
const connectToMongo = require("./db");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
connectToMongo();
const port = 8008;

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/", (req, res) => {
  res.send({ msg: "OK..." });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
