const faker = require('faker');
const connection = require('../database/database');
class RecetaServices {

  constructor() {
    this.receta = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM receta", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("receta: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM receta WHERE ci_paciente LIKE '%${id}%' OR celular_paciente LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("receta: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM receta WHERE id_receta = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        console.log("devolver: ", res.rows);
        result(null, res.rows);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };
  GetOneByHcId = (id, result) => {

      const query2 = `SELECT * FROM receta WHERE paciente_id = ${id}`;
      connection.query(query2, (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res2.length === 0) {
          result({ kind: "no se encontró el receta" }, null);
          return;
        }

        console.log("devolver: ", res2);
        result(null, res2);
      });
  };

  create = (newValues, result) => {
    connection.query(
      `INSERT INTO receta (archivo, titulo, descripcion, paciente_id, fecha, activo)
         VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        newValues.archivo, newValues.nombre_receta, newValues.descripcion, newValues.paciente_id, newValues.fecha, true
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        //console.log("Valores ingresados: ", res.rows[0]);
        result(null, res);
      }
    );
  };

  updateById = (id, updatedValues, result) => {
    let query = `UPDATE receta SET archivo = $2, titulo = $3, descripcion = $4, fecha = $5 WHERE id_receta = $1`;
    let values = [id, updatedValues.nombre_receta, updatedValues.descripcion, updatedValues.fecha];


    connection.query(query, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
    });
  };



  remove = (id, result) => {
    connection.query("CALL public.crud_receta($1,'DELETE','','','','',0,0)", id, (err, res) => {
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
module.exports = RecetaServices;
