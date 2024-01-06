const faker = require('faker');
const connection = require('../database/database');
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

      console.log("ads: ", res);
      result(null, res);
    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM usuario WHERE nombre LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("ads: ", res);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM usuario WHERE id_usuario = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("devolver: ", res[0]);
        result(null, res[0]);
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
