const { response } = require('express');
const express = require('express');
const connection = require('./../database/database');
const SeguimientoService = require('./../services/seguimiento.service');

const router = express.Router();
const service = new SeguimientoService();

router.get('/xxx', async(req, res) => {
  res.json({text: 'the ad doesnt exist'});
})


router.post('/', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const values = {
    fecha: req.body.fecha,
    observacion: req.body.observacion,
    prescripcion: req.body.prescripcion,
    estado: req.body.estado,
    cuenta: req.body.cuenta,
    saldo: req.body.saldo,
    diagnostico: req.body.diagnostico,
    nro_historia: req.body.nro_historia,
    dentista_id: req.body.dentista_id,
  };

  service.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });
});




module.exports = router;
