const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const buzzwords = require('./routes/buzzwords.js');
const PORT = 3000;

app.use(express.static('public'));

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/buzzwords', buzzwords.router);

app.use('/reset', buzzwords.routerReset);

app.use('/heard', buzzwords.routerHeard);

app.get('/', (req, res) => {
  res.send('hello world');
});

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
