const connection = require('../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dbConfig = require('../keys')
const userServices = require('./usuario.service');
const servicU = new userServices();
class authServices {

     verificarToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token || !token.startsWith('Bearer ')) {
          console.log('token',token)
            return res.status(401).json({ mensaje: 'Token no proporcionado o en formato incorrecto' });
          }
        if (!token) {
          return res.status(401).json({ mensaje: 'Token no proporcionado' });
        }
        const tokenWithoutBearer = token.split(' ')[1];
        jwt.verify(tokenWithoutBearer, dbConfig.KEY, (err, usuario) => {
          if (err) {
            return res.status(403).json({ mensaje: 'Token no válido' });
          }
          req.usuario = usuario;
          next();
        });
      }
       refreshTokenService = (refreshToken, callback) => {
        try {
          console.log(refreshToken)
          const usuario = jwt.verify(refreshToken, dbConfig.KEY);
          const user= usuario;
          console.log(usuario)
          const accessToken = jwt.sign({ id: user.id, nombre: user.nombre, rol_id: user.rol_id }, dbConfig.KEY, { expiresIn: '1h' });
          const nuevoRefreshToken = servicU.generateRefreshToken(user);
          callback(null, { accessToken, refreshToken: nuevoRefreshToken });
        } catch (error) {
          console.error('Error al procesar el refresh token:', error);
          callback(error, null);
        }
      };
}
module.exports = authServices;
