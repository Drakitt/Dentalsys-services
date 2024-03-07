const faker = require('faker');
const connection = require('../database/database');
class HorarioServices {

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
    const quer= `SELECT * FROM horario WHERE id_horario = ${id}`

    connection.query(quer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    
      if (res) {
        console.log("devolver: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };

  create = (newValues, result) => {
    connection.query(
      "CALL public.crud_horario($1,$2,$3,$4,$5)",
      [
        newValues.p_id_horario,
        newValues.p_operacion,
        newValues.p_hora,
        newValues.p_dia,
        newValues.p_turno
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
      "CALL public.crud_horario($1,$2,$3,$4,$5)",
      [
        id,
        newValues.p_operacion,
        newValues.p_hora,
        newValues.p_dia,
        newValues.p_turno
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
    connection.query("CALL public.crud_horario($1,'DELETE','','','')", [id], (err, res) => {
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
module.exports = HorarioServices;
