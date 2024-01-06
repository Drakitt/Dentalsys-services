const faker = require('faker');
const connection = require('../database/database');
class DentistaServices {

  constructor() {
    this.dentista = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM dentista_v", (err, res) => {
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
    connection.query(`SELECT * FROM dentista_v WHERE nombre LIKE '%${id}%'`, (err, res) => {
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
    connection.query(`SELECT * FROM dentista_v WHERE iddentista = ${id}`, (err, res) => {
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
    connection.query("CALL public.crud_dentista($1,$2,$3)",
    [
      newValues.p_id_dentista,
      newValues.p_operacion,
      newValues.p_persona_id,
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
    connection.query("CALL dentalsys.crud_dentista($1,$2,$3)",
    [
      id,
      newValues.p_operacion,
      newValues.p_persona_id,
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
    connection.query("CALL dentalsys.dentista_crud(0, '', '', '', '', 0, 0, '', '', 'DELETE', ?)", id, (err, res) => {
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
module.exports = DentistaServices;
