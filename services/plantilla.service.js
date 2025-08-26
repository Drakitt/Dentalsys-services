const faker = require('faker');
const connection = require('../database/database');
class PlantillaServices {

  constructor() {
    this.plantilla = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM plantilla where activo = true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("plantilla: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM plantilla WHERE id_plantilla = ${id}`, (err, res) => {
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

  create = (newValues, result) => {
    connection.query(
      `INSERT INTO plantilla (archivo, titulo, descripcion, activo)
         VALUES ($1, $2, $3, $4)`,
      [
        newValues.archivo, newValues.nombre_plantilla, newValues.descripcion, true
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
    let query = `UPDATE plantilla SET archivo = $2, titulo = $3, descripcion = $4 WHERE id_plantilla = $1`;
    let values = [id, updatedValues.nombre_plantilla, updatedValues.descripcion, updatedValues.fecha];


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
    if (!id) {
      result({ kind: "ID inválido" }, null);
      return;
    }

    connection.query("CALL public.crud_plantilla($1, 'DELETE', NULL, NULL, NULL)", [id], (err, res) => {
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

module.exports = PlantillaServices;
