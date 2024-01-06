const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* Solucionando error de cors y agregando limitaciones para puertos */

const whiteList = ['http://localhost:8080', 'http://localhost:3000','http://localhost:4200', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
}

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Run express server');
});

routerApi(app);

app.listen(port, () => {
  console.log('mi port' + port);
})
