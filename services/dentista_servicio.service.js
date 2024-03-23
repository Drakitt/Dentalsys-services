const faker = require('faker');
const connection = require('../database/database');
class DentistaServicioServices {

  constructor() {
    this.servicio = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM servicio_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("servicio: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM servicio_v WHERE dentista_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("servicio: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM servicio WHERE id_servicio = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        
        
        result(null, res);
        return;
      }
      console.log("devolver: ", res);
      result({ kind: "no se encontró el id" }, null);
    });
  };

  create = (newValues, result) => {
    connection.query(
      "CALL public.crud_dentista_servicio($1,$2,$3,$4)",
      [
        newValues.p_id_dentista_servicio,
        newValues.p_operacion,
        newValues.p_dentista_id,
        newValues.p_servicio_id
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
      "CALL public.crud_dentista_servicio($1,$2,$3,$4)",
      [
        id,
        newValues.p_operacion,
        newValues.p_dentista_id,
        newValues.p_servicio_id
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
    connection.query("CALL public.crud_dentista_servicio($1,'DELETE',0,0)", [id], (err, res) => {
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
module.exports = DentistaServicioServices;
