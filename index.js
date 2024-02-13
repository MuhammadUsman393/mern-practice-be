const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
connectToMongo();
const port = 8008;

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
