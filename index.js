const express = require("express");
require("./db/mongoose");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRoute);

app.use(taskRoute);
const port = process.env.PORT;
app.listen(port, () => console.log("Server is up on server " + port));
