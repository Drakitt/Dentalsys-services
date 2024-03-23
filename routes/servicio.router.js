const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const ServicioServices = require('../services/servicio.service');

const router = express.Router();
const service = new ServicioServices();

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
    p_id_servicio: 0,
    p_operacion: 'INSERT',
    p_tipo: req.body.tipo,
    p_detalles: req.body.detalles,
    p_costo: req.body.costo,
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

  const idusuario = req.usuario.id;
  const values = {
    p_id_servicio: req.body.id_servicio,
    p_operacion: 'UPDATE',
    p_tipo: req.body.tipo,
    p_detalles: req.body.detalles,
    p_costo: req.body.costo,
    p_id_usuario_mod: idusuario,
    p_fecha_mod: new Date()
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
