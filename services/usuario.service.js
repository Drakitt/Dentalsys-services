const faker = require('faker');
const connection = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dbConfig = require('../keys');
class PersonasServices {

  constructor() {
    this.personas = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM usuario", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res);
    });
  };
  findByUsername = (name, result) => {
    const query = 'SELECT * FROM usuario WHERE nombre_usuario LIKE ?';
    const searchTerm = `%${name}%`;

    connection.query(query, [searchTerm], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res);
    });
  };
  generateRefreshToken = (usuario) => {

    return jwt.sign({ id: usuario.id_usuario || usuario.id, nombre: usuario.nombre_usuario || usuario.nombre, id_rol: usuario.rol_id || usuario.id_rol }, dbConfig.KEY, { expiresIn: '7d' });
  };
  login = (username, password, result) => {
    const query = 'SELECT * FROM usuario WHERE nombre_usuario =$1';
    connection.query(query, [username], async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.rows.length === 0) {
        result(null, { mensaje: 'Credenciales inválidas' });
        return;
      }
      const usuario = res.rows[0];
      const passwordMatch = await bcrypt.compareSync(password, usuario.clave);
      if (!passwordMatch) {
        result(null, { mensaje: 'Credenciales inválidas' });
        return;
      }


      const token = jwt.sign({ id: usuario.id_usuario, nombre: usuario.nombre_usuario, id_rol: usuario.rol_id }, dbConfig.KEY, { expiresIn: '1h' });
      const refreshToken = this.generateRefreshToken(usuario);
      result(null, { token, refreshToken, usuario_id: usuario.id_usuario, rol_id: usuario.rol_id });

    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM usuario WHERE nombre LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res);
    });
  };
  findNameById = (id, result) => {
    connection.query(`SELECT nombre FROM dentista_v WHERE id_usuario = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res.rows[0].nombre);
    });
  };
  GetInputs = (id, result) => {
    connection.query(`SELECT * FROM input_schema WHERE grupo SIMILAR TO '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("usuario: ", res?.rows?.length);
      result(null, res.rows);
    });
  };


  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM dentista_v WHERE id_usuario = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res?.rows?.length) {
        result(null, res.rows[0]);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };


  create = (newValues, result) => {
    connection.query("CALL public.crud_usuario($1,$2,$3,$4,$5,$6)",
      [
        newValues.p_id_usuario,
        newValues.p_operacion,
        newValues.p_persona_id,
        newValues.p_nombre_usuario,
        newValues.p_clave,
        newValues.p_rol_id
      ], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("valores ingresados: ", { id: res.insertId, ...newValues });
        result(null, { id: res.insertId, ...newValues });
      });
  };

  updateById = (id, newValues, result) => {
    connection.query("CALL public.crud_usuario($1,$2,$3,$4,$5,$6)",
      [
        id,
        newValues.p_operacion,
        newValues.p_persona_id,
        newValues.p_nombre_usuario,
        newValues.p_clave,
        newValues.p_rol_id
      ], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("valores ingresados: ", { id: res.insertId, ...newValues });
        result(null, { id: res.insertId, ...newValues });
      });
  };


  remove = (id, result) => {
    connection.query("CALL dentalsys.crud_usuario($1, 'DELETE', 0, '', '', 0)", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó el anuncio: ", id);
      result(null, res);
    });
  };

}
module.exports = PersonasServices;
