const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const PersonaServices = require('./../services/persona.service');

const router = express.Router();
const service = new PersonaServices();

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

  const idusuario = req.usuario.id;

  const values = {
    p_operacion: 'INSERT',
    p_id_persona: 0,
    p_ci: req.body.ci,
    p_direccion: req.body.direccion,
    p_nombre: req.body.nombre,
    p_apellido_paterno: req.body.apellido_paterno,
    p_apellido_materno: req.body.apellido_materno,
    p_telefono: req.body.telefono,
    p_celular: req.body.celular,
    p_email: req.body.email,
    p_foto: req.body.foto,
    p_id_usuario_reg: idusuario,
    p_fecha_reg: new Date()
  };


  service.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });
})

router.patch('/:id', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }
  const idusuario = req.usuario.id;

  const values = {
    p_operacion: req.body.operacion,
    p_id_persona: req.body.id_persona,
    p_ci: req.body.ci,
    p_direccion: req.body.direccion,
    p_nombre: req.body.nombre,
    p_apellido_paterno: req.body.apellido_paterno,
    p_apellido_materno: req.body.apellido_materno,
    p_telefono: req.body.telefono,
    p_celular: req.body.celular,
    p_email: req.body.email,
    p_foto: req.body.foto,
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

router.delete('/:id', async (req, res) => {
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
    } else res.send({ message: `Excelente` });
  });
})


module.exports = router;
