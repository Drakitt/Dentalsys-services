const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
// var mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
/* Solucionando error de cors y agregando limitaciones para puertos */

const whiteList = new Set([
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:4200',
  'https://dentalsys-model.onrender.com',
  'https://dentalsysdef.web.app',     // sin slash final
  'https://dentalsys-model.web.app'   // si este es el correcto (ojo a guiones)
  // agrega aquí cualquier otro origin REAL que uses en frontend
]);
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
