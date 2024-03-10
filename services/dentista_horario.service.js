const faker = require('faker');
const connection = require('../database/database');
class DentistaHorarioServices {

  constructor() {
    this.horario = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM horario", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("horario: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM horario_v WHERE dentista_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("horario: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM horario WHERE id_horario = ${id}`, (err, res) => {
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
    connection.query(
      "CALL public.crud_dentista_horario($1,$2,$3,$4)",
      [
        newValues.p_id_dentista_horario,
        newValues.p_operacion,
        newValues.p_dentista_id,
        newValues.p_horario_id
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("Valores ingresados: ", newValues);
        result(null, newValues);
      }
    );
  };
  updateById = (id, newValues, result) => {
    connection.query(
      "CALL public.crud_dentista_horario($1,$2,$3,$4)",
      [
        id,
        newValues.p_operacion,
        newValues.p_dentista_id,
        newValues.p_horario_id
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
    connection.query("CALL public.crud_dentista_horario($1,'DELETE',0,0)", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó el horario: ", id);
      result(null, res);
    });
  };

}
module.exports = DentistaHorarioServices;
