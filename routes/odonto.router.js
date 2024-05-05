const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const OdontoServices = require('../services/odonto.service');

const router = express.Router();
const service = new OdontoServices();



router.get('/:id', async (req, res) => {
  service.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else res.send(data);
  });
})


router.get('/fc/:id', async (req, res) => {
  service.findByIdFc(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          error: true,
          message: `No se encontró el id ${req.params.id}.`
        });
      } else {
        res.status(500).json({
          error: true,
          message: "Algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
});


router.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const idusuario = req.usuario.id;

  const values = {
    p_id_horario: 0,
    p_operacion: 'INSERT',
    p_hora: req.body.hora,
    p_dia: req.body.dia,
    p_turno: req.body.turno,
    p_id_usuario_reg: idusuario,
    p_fecha_reg: new Date()
  };

  service.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.json({ status: 'ok', message: 'request succed', data: data });
  });
});


router.post('/prueba', async (req, res) => {
  res.json({ status: 'ok', message: 'request succed' });
  console.log("ver esto", req.body);
});

router.patch('/:id', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }
 
  const values = {
    json_serialized: req.body.json_serialized,

  };

  service.updateById(req.params.id, values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });

})

router.delete('/x/:id', async (req, res) => {
  service.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Algo salió mal al encontrar" + req.params.id
        });
      }
    } else res.send({ message: `Excelente` });
  });
})

router.delete('/:id', async (req, res) => {
  const idusuario = req.usuario.id;
  service.remove(req.params.id, idusuario, new Date(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Algo salió mal al encontrar" + req.params.id
        });
      }
    } else res.send({ status: 'ok', message: 'request succed', data: data });
  });
})


module.exports = router;
