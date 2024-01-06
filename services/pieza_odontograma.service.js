const faker = require('faker');
const connection = require('../database/database');
class PiezaOdontogramaServices {

  constructor() {
    this.piezaodontograma = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM pieza_odontograma", (err, res) => {
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
    connection.query(`SELECT * FROM pieza_odontograma WHERE ci_paciente LIKE '%${id}%' OR celular_paciente LIKE '%${id}%'`, (err, res) => {
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
    connection.query(`SELECT * FROM pieza_odontograma WHERE id_pieza_odontograma = ${id}`, (err, res) => {
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
      "CALL public.crud_pieza_odontograma($1,$2,$3,$4,$5,$6,$7)",
      [
        newValues.p_id_pieza_odontograma,
        newValues.p_operacion,
        newValues.p_pieza_id,
        newValues.p_odontograma_id,
        newValues.p_cara,
        newValues.p_estado,
        newValues.p_observacion
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
      "CALL public.crud_pieza_odontograma($1,$2,$3,$4,$5,$6,$7)",
      [
        id,
        newValues.p_operacion,
        newValues.p_pieza_id,
        newValues.p_odontograma_id,
        newValues.p_cara,
        newValues.p_estado,
        newValues.p_observacion
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
    connection.query("CALL public.crud_pieza_odontograma($1,'DELETE',0,0,'','','')", id, (err, res) => {
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
module.exports = PiezaOdontogramaServices;
