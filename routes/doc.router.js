const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const axios = require('axios');
const cors = require('cors');

const router = express.Router();
// const service = new DocServices();

router.use(cors());

router.get('/:doc/:token', async (req, res) => {
  const token = req.params.token;
  const doc = req.params.doc;
  const url = `https://firebasestorage.googleapis.com/v0/b/dentalsysss.appspot.com/o/documents%2F${doc}?alt=media&token=${token}`;

  try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      res.set('Content-Type', response.headers['content-type']);
      res.send(response.data);
  } catch (error) {
      // console.error('Error fetching document:', error);
      res.status(500).send('Error fetching document');
  }
});

// router.post('/', async (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   const newCobro = req.body;
//   service.create(newCobro, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Algo salió mal"
//       });
//     else res.json({ status: 'ok', message: 'OK', data: data });
//   });
// });



module.exports = router;
