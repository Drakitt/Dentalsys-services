const faker = require('faker');
const connection = require('../database/database');
class PacienteServices {

  constructor() {
    this.paciente = [];
  }

  create = (newValues, result) => {
    connection.query("CALL public.crud_paciente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
    [
      newValues.p_id_paciente,
      newValues.p_operacion,
      newValues.p_persona_id,
      newValues.p_estado_civil,
      newValues.p_nacion_originaria,
      newValues.p_grado_educativo,
      newValues.p_idioma,
      newValues.p_lugar_nacimiento,
      newValues.p_fecha_nacimiento,
      newValues.p_ocupacion,
      newValues.p_tutor_id,
      newValues.p_sexo,
      newValues.p_edad,
      newValues.p_id_usuario_reg,
      newValues.p_fecha_reg
    ], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("valores ingresados: ", { id: res.rows&&res.rows[0], ...newValues });
      result(null, { id: res.rows&&res.rows[0], ...newValues });
    });
  };

  updateById = (id, newValues, result) => {
    connection.query("CALL public.crud_paciente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
    [
      id,
      newValues.p_operacion,
      newValues.p_persona_id,
      newValues.p_estado_civil,
      newValues.p_nacion_originaria,
      newValues.p_grado_educativo,
      newValues.p_idioma,
      newValues.p_lugar_nacimiento,
      newValues.p_fecha_nacimiento,
      newValues.p_ocupacion,
      newValues.p_tutor_id,
      newValues.p_sexo,
      newValues.p_edad,
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

  getAllLimit = result => {
    connection.query("SELECT id_paciente as id, nombre, apellido_paterno, apellido_materno, celular, email, ci  FROM paciente_v limit 20", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("pacientes: ", res?.rows?.length);
      result(null, res);
    });
  };
  getAll = result => {
    connection.query("SELECT * FROM paciente_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("paciente: ", res?.rows?.length);
      result(null, res);
    });
  };

  countAll = result => {
    connection.query("SELECT COUNT(*) FROM paciente_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("pacientes: ", res?.rows?.length);
      result(null, res?.rows?.shift()?.count);
    });
  };
// no sirve este quiza en adelante
  findById = (id, result) => {
    connection.query(`SELECT * FROM paciente_v WHERE id_paciente LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("paciente: ", res?.rows?.length);
      result(null, res);
    });
  };

  findByCi = (id, result) => {
    connection.query(`SELECT * FROM paciente_v WHERE ci SIMILAR TO '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("paciente: ", res?.rows?.length);
      result(null, res.rows);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM paciente_v WHERE id_paciente = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.rows.length) {
        console.log("paciente: ", res?.rows?.length);
        result(null, res);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };
  remove = (id, result) => {
    connection.query("CALL crud_paciente($1, 'DELETE', 0, '', '', '', '', '', '2012-12-12', '',0,'',0)", [id], (err, res) => {
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
module.exports = PacienteServices;
