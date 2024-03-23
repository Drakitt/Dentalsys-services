const faker = require('faker');
const connection = require('../database/database');
class ServicioServices {

  constructor() {
    this.servicio = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM servicio", (err, res) => {
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
    connection.query(`SELECT * FROM servicio_v WHERE paciente_id = ${id}`, (err, res) => {
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
        console.log("devolver: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };

  create = (newValues, result) => {
    connection.query(
      "CALL public.crud_servicio($1,$2,$3,$4,$5,$6,$7)",
      [
        newValues.p_id_servicio,
        newValues.p_operacion,
        newValues.p_tipo,
        newValues.p_detalles,
        newValues.p_costo,
        newValues.p_id_usuario_reg,
        newValues.p_fecha_reg
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
      "CALL public.crud_servicio($1,$2,$3,$4,$5,$6,$7)",
      [
        id,
        newValues.p_operacion,
        newValues.p_tipo,
        newValues.p_detalles,
        newValues.p_costo,
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

  remove = (id,idusuario,fecha, result) => {
    connection.query(`CALL public.crud_servicio($1,'DELETE','','',0,${idusuario},'${fecha}')`, [id], (err, res) => {
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
module.exports = ServicioServices;
