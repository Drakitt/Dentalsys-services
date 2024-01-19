const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const TutorServices = require('../services/usuario.service');
const PersonasServices = require('./../services/persona.service');
const userServices = require('./../services/usuario.service');
const authServices = require('./../services/auth.service');
const router = express.Router();
const service = new TutorServices();
const serviceP = new PersonasServices();
const servicU = new userServices();
const servicAuth = new authServices();
router.get('/xxx', async(req, res) => {
  res.json({text: 'the ad doesnt exist'});
})
router.get('/', async(req, res) => {
  service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal en el servidor."
      });
    else res.json(data);
  });
})

router.get('/:id', async(req, res) =>{
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

router.get('/one/:id', async(req, res) =>{
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
router.post('/', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const values = {
    p_operacion: req.body.operacion,
    p_id_usuario: req.body.id_usuario,
    p_persona_id: req.body.persona_id,
    p_nombre_usuario: req.body.nombre_usuario,
    p_clave: req.body.clave,
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
router.post('/nuevo', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const values = {
    p_operacion: 'INSERT',
    p_id_persona: 0,
    p_ci: req.body.ci,
    p_direccion: req.body.direccion,
    p_nombre: req.body.nombre,
    p_apellidos: req.body.apellidos,
    p_telefono: req.body.telefono,
    p_celular: req.body.celular,
    p_email: req.body.email
  };

  const valuesn = {
    p_operacion: req.body.operacion,
    p_id_usuario: req.body.id_usuario,
    p_persona_id: req.body.persona_id,
    p_nombre_usuario: req.body.nombre_usuario,
    p_clave: req.body.clave,
  };

  serviceP.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else {
      valuesn.p_persona_id = data.id;
      service.create(valuesn, (erre, datae) => {
        valuesn.p_persona_id = data.id;
        if (erre)
          res.status(500).send({
            message:
              erre.message || "Algo salió mal"
          });
        else res.json({ status: 'ok', message: 'request succed', data: datae });
      });
      // res.send(data)
    };
  });
})

router.patch('/:id', async(req, res) =>{
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }

  const values = {
    p_operacion: req.body.operacion,
    p_id_usuario: req.body.id_usuario,
    p_persona_id: req.body.persona_id,
    p_nombre_usuario: req.body.nombre_usuario,
    p_clave: req.body.clave,
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

router.delete('/:id', async(req, res) =>{
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


module.exports = router;
