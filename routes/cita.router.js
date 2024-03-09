const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const CitasServices = require('../services/cita.service');

const router = express.Router();
const service = new CitasServices();

router.get('/xxx', async (req, res) => {
  res.json({ text: 'the ad doesnt exist' });
})

router.get('/', async (req, res) => {
  service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal en el servidor."
      });
    else res.json(data);
  });
})

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

router.get('/one/:id', async (req, res) => {
  service.GetOneById(req.params.id, (err, data) => {
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

router.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const values = {
    p_id_cita: 0,
    p_operacion: 'INSERT',  // Establece la operación CREATE para insertar una nueva cita
    p_razon: req.body.razon,
    p_detalles: req.body.detalles,
    p_fecha: req.body.fecha,  // Divide la fecha y la hora y toma la fecha
    p_hora: req.body.hora,  // Divide la fecha y la hora y toma la hora
    p_paciente_id: req.body.paciente_id,
    p_dentista_id: req.body.dentista_id
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
    p_id_cita: req.body.id_cita,
    p_operacion: req.body.operacion,  // Establece la operación CREATE para insertar una nueva cita
    p_razon: req.body.razon,
    p_detalles: req.body.detalles,
    p_fecha: req.body.fecha,  // Divide la fecha y la hora y toma la fecha
    p_hora: req.body.hora,  // Divide la fecha y la hora y toma la hora
    p_paciente_id: req.body.paciente_id,
    p_dentista_id: req.body.dentista_id
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
    } else res.send({ status: 'ok', message: 'request succed', data: data });
  });
})


module.exports = router;
