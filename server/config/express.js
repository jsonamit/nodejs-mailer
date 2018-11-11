const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('../routes/index');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  route(app);
}
