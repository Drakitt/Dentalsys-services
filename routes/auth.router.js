const { response } = require('express');
const express = require('express');
const connection = require('../database/database');

const userServices = require('./../services/usuario.service');
const authServices = require('./../services/auth.service');
const router = express.Router();

const servicU = new userServices();
const servicAuth = new authServices();
router.get('/xxx', async(req, res) => {
  res.json({text: 'the ad doesnt exist'});
})
router.post('/login', (req, res) => {
  const { login, password } = req.body;
  servicU.login(login, password, (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    if (result.mensaje) {
  
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    res.json({ token: result.token, refreshToken:result.refreshToken });
  });
});

router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ mensaje: 'Refresh token no proporcionado' });
  }

  servicAuth.refreshTokenService(refreshToken, (err, result) => {
    if (err) {
      console.error('Error al procesar el refresh token:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    res.json(result);
  });
});



module.exports = router;
