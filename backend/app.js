const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const routerUser = require("./routes/users");
const routerCards = require("./routes/cards");
const routerAuth = require("./routes/auth");
const bodyParser = require('body-parser');


async function connectMongoose() {
  await mongoose.connect("mongodb://localhost:27017/aroundb", {
  });
  console.log("mongoose conected")
};

const { PORT = 3000 } = process.env;

const app = express();
connectMongoose()

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/cards", routerCards);
app.use("/users", routerUser);
app.use("/", routerAuth);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
