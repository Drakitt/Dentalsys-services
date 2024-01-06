const express = require('express');

const citaRouter = require('./cita.router');
const seguimientoRouter = require('./seguimiento.router');
const dentistasRouter = require('./dentista.router');
const personasRouter = require('./persona.router');
const tutorRouter = require('./tutor.router');
const usersRouter = require('./users.router');
const usuarioRouter = require('./usuario.router');
const pacienteRouter = require('./paciente.router');



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/cita', citaRouter);
  router.use('/seguimiento', seguimientoRouter);
  router.use('/dentista', dentistasRouter);
  router.use('/persona', personasRouter);
  router.use('/paciente', pacienteRouter);
  router.use('/tutor', tutorRouter);
  router.use('/users', usersRouter);
  router.use('/usuario', usuarioRouter);
}

module.exports = routerApi;
