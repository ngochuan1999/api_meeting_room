const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const usersRouter = require('./routes/user-route');
const roomRouter = require('./routes/room-route');
const PORT = process.env.PORT || 3000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/user', usersRouter);
app.use('/room', roomRouter);
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
module.exports = app;
