const faker = require('faker');
const connection = require('../database/database');
class TutorServices {

  constructor() {
    this.tutor = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM tutores_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tutor: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM tutor WHERE nombre LIKE '%${id}%' OR whatsapp LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tutor: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM tutores_v WHERE id_tutor = ${id}`, (err, res) => {
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
    connection.query("CALL public.crud_tutor($1,$2,$3)", [
      newValues.p_id_tutor,
      newValues.p_operacion,
      newValues.p_persona_id,
      newValues.p_id_usuario_reg,
      newValues.p_fecha_reg
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
    connection.query("CALL public.crud_tutor($1,$2,$3)", [
      id,
      newValues.p_operacion,
      newValues.p_persona_id,
      newValues.p_id_usuario_mod,
      newValues.p_fecha_mod
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
    connection.query("CALL dentalsys.crud_tutor($1,'DELETE',0)", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó : ", id);
      result(null, res);
    });
  };

}
module.exports = TutorServices;
