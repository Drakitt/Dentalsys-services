const faker = require('faker');
const connection = require('../database/database');
class EvaluacionHcServices {

  constructor() {
    this.evaluacionhc = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM evaluacion_hc", (err, res) => {
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
    console.log(id);
    connection.query(`SELECT * FROM evaluacion_hc WHERE ci_paciente LIKE '%${id}%' OR celular_paciente LIKE '%${id}%'`, (err, res) => {
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
    connection.query(`SELECT * FROM evaluacion_hc WHERE id_evaluacion_hc = ${id}`, (err, res) => {
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
      "CALL public.crud_evaluacion_hc($1,$2,$3,$4,$5,$6)",
      [
        newValues.p_id_evaluacion_hc,
        newValues.p_operacion,
        newValues.p_evaluacion_id,
        newValues.p_fecha,
        newValues.p_nro_hc,
        newValues.p_resultado
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
      "CALL public.crud_evaluacion_hc($1,$2,$3,$4,$5,$6)",
      [
        id,
        newValues.p_operacion,
        newValues.p_evaluacion_id,
        newValues.p_fecha,
        newValues.p_nro_hc,
        newValues.p_resultado
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
    connection.query("CALL public.crud_evaluacion_hc($1,'DELETE',0,'',0,'')", id, (err, res) => {
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
module.exports = EvaluacionHcServices;
