const faker = require('faker');
const connection = require('../database/database');
class SeguimientoServices {

  constructor() {
    this.citas = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM citas_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("seguimiento: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM citas_v WHERE paciente LIKE '%${id}%' OR whatsapp LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("seguimiento: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM citas_v WHERE idcita = ${id}`, (err, res) => {
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
    connection.query("INSERT INTO planes_tratamiento (fecha, observacion, prescripcion, estado, cuenta, saldo, diagnostico, nro_historia, dentista_id) VALUES (?)", newValues, (err, res) => {
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
    connection.query("CALL dentalsys.solicita_cita_crud(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [newValues.ci, newValues.direccion, newValues.nombre, newValues.apellido_paterno, newValues.apellido_materno, newValues.telefono_fijo, newValues.whatsapp, newValues.razon, newValues.descripcion, newValues.fecha, newValues.hora, newValues.dentista_id, newValues.StatementType, id], (err, res) => {
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
    connection.query("CALL dentalsys.solicita_cita_crud( 0, '', '', '', '', 0, 0, '', '', '', '', 0, 'DELETE', ?)", id, (err, res) => {
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
module.exports = SeguimientoServices;
