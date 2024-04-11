const faker = require('faker');
const connection = require('../database/database');
class ReporteServices {

  constructor() {
    this.reporte = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM reporte", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("reporte: ", res?.rows?.length);
      result(null, res);
    });
  };

  dentista_activo = result => {
    connection.query("SELECT nombre, apellido_paterno, apellido_materno, celular, email, ci, direccion, telefono, foto, activo FROM public.dentista_v WHERE activo = true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("reporte: ", res?.rows?.length);
      result(null, res.rows);
    });
  };
  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM reporte WHERE ci_paciente LIKE '%${id}%' OR celular_paciente LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("reporte: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM reporte WHERE id_reporte = ${id}`, (err, res) => {
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
      "CALL public.crud_reporte($1,$2,$3,$4,$5,$6)",
      [
        newValues.p_id_reporte,
        newValues.p_operacion,
        newValues.p_tipo,
        newValues.p_descripcion,
        newValues.p_archivo,
        newValues.p_fecha
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
      "CALL public.crud_reporte($1,$2,$3,$4,$5,$6)",
      [
        id,
        newValues.p_operacion,
        newValues.p_tipo,
        newValues.p_descripcion,
        newValues.p_archivo,
        newValues.p_fecha
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
  citas = (newValues, result) => {
    connection.query(
      `SELECT * FROM cita_v WHERE fecha BETWEEN '${newValues.p_fecha_ini}' AND '${newValues.p_fecha_fin}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("ci ", res.rows);
      result(null, res.rows);
    });
  };
  paciente_cita = (newValues, result) => {
    connection.query(
      `SELECT p.* FROM paciente_v p JOIN cita_v c ON p.id_paciente = c.paciente_id WHERE c.fecha = '${newValues.p_fecha}' AND c.estado = 'atendido';`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("ci ", res.rows);
      result(null, res.rows);
    });
  };

  remove = (id, result) => {
    connection.query("CALL public.crud_reporte($1,'DELETE','','','','')", id, (err, res) => {
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
module.exports = ReporteServices;
