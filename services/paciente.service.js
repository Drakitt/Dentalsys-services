const faker = require('faker');
const connection = require('../database/database');
class PacienteServices {

  constructor() {
    this.paciente = [];
  }

  create = (newValues, result) => {
    connection.query("CALL public.crud_paciente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
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
    connection.query("CALL public.crud_paciente($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
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
    connection.query("SELECT id_paciente as id, nombre, apellido_paterno, apellido_materno, celular, email, ci FROM paciente_v limit 20", (err, res) => {
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

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM paciente_v WHERE id_paciente = ${id}`, (err, res) => {
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

}
module.exports = PacienteServices;
