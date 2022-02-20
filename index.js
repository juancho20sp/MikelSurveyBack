const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes');

const {
  errorHandler,
  boomErrorHandler
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
router(app);

// Middlewares
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
