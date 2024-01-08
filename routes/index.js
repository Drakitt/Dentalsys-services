const express = require('express');

const citaRouter = require('./cita.router');
const seguimientoRouter = require('./seguimiento.router');
const dentistasRouter = require('./dentista.router');
const personasRouter = require('./persona.router');
const tutorRouter = require('./tutor.router');
const usersRouter = require('./users.router');
const usuarioRouter = require('./usuario.router');
const pacienteRouter = require('./paciente.router');
const authRouter = require('./auth.router');

const authServices = require('./../services/auth.service');
const servicAuth = new authServices();

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/cita',servicAuth.verificarToken, citaRouter);
  router.use('/seguimiento', servicAuth.verificarToken,seguimientoRouter);
  router.use('/dentista',servicAuth.verificarToken, dentistasRouter);
  router.use('/persona', servicAuth.verificarToken,personasRouter);
  router.use('/paciente',servicAuth.verificarToken, pacienteRouter);
  router.use('/tutor',servicAuth.verificarToken,tutorRouter);
  router.use('/users',servicAuth.verificarToken, usersRouter);
  router.use('/usuario',servicAuth.verificarToken, usuarioRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
