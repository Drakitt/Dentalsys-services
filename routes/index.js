const express = require('express');

const citaRouter = require('./cita.router');
const seguimientoRouter = require('./seguimiento.router');
const dentistasRouter = require('./dentista.router');
const personasRouter = require('./persona.router');
const tutorRouter = require('./tutor.router');
const usersRouter = require('./users.router');
const usuarioRouter = require('./usuario.router');
const pacienteRouter = require('./paciente.router');
const historiaRouter = require('./historia_clinica.router');
const authRouter = require('./auth.router');
const dentistaHorarioRouter = require('./dentista_horario.router');
const dentistaServicioRouter = require('./dentista_servicio.router');
const horarioRouter = require('./horario.router');
const servicioRouter = require('./servicio.router');
const dashboardRouter = require('./dashboard.router');
const reporteRouter = require('./reporte.router');
const odntoRouter = require('./odonto.router');
const authServices = require('./../services/auth.service');
const fiRouter = require('./finalcial.router');
const traRouter = require('./tratamiento.router');
const srRouter = require('./servicios.router');
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
  router.use('/hc',servicAuth.verificarToken, historiaRouter);
  router.use('/servicio',servicAuth.verificarToken, servicioRouter);
  router.use('/serviciodent',servicAuth.verificarToken, dentistaServicioRouter);
  router.use('/horario',servicAuth.verificarToken, horarioRouter);
  router.use('/horariodent',servicAuth.verificarToken, dentistaHorarioRouter);
  router.use('/dashboard',servicAuth.verificarToken, dashboardRouter);
  router.use('/reporte',servicAuth.verificarToken, reporteRouter);
  router.use('/odontograma', odntoRouter);
  router.use('/cobros', fiRouter);
  router.use('/tratamientos', traRouter);
  router.use('/servicios', srRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
