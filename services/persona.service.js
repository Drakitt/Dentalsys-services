const faker = require('faker');
const connection = require('../database/database');
class PersonaServices {

  constructor() {
    this.persona = [];
  }

  create = (newValues, result) => {
    connection.query("CALL public.crud_cita(?,?,?,?,?,?,?,?,?)", [
      newValues.p_operacion,
      newValues.p_id_persona,
      newValues.p_ci,
      newValues.p_direccion,
      newValues.p_nombre,
      newValues.p_apellido_paterno,
      newValues.p_apellido_materno,
      newValues.p_telefono,
      newValues.p_celular,
      newValues.p_email
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


  getAll = result => {
    connection.query("SELECT * FROM pacientes_contacto_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("persona: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    connection.query(`SELECT * FROM pacientes_contacto_v WHERE nombre LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("persona: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM pacientes_contacto_v WHERE idpaciente = ${id}`, (err, res) => {
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
    return(connection.query("CALL public.crud_persona($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", [
      newValues.p_operacion,
      newValues.p_id_persona,
      newValues.p_ci,
      newValues.p_direccion,
      newValues.p_nombre,
      newValues.p_apellido_paterno,
      newValues.p_apellido_materno,
      newValues.p_telefono,
      newValues.p_celular,
      newValues.p_email,
      newValues.p_foto
    ], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("valores ingresados: ", { id: res.rows[0].p_id_persona, ...newValues });
      result(null, { id: res.rows[0].p_id_persona, ...newValues });
    }));
  };

  updateById = (id, newValues, result) => {
    connection.query("CALL public.crud_persona($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", [
      newValues.p_operacion,
      id,
      newValues.p_ci,
      newValues.p_direccion,
      newValues.p_nombre,
      newValues.p_apellido_paterno,
      newValues.p_apellido_materno,
      newValues.p_telefono,
      newValues.p_celular,
      newValues.p_email,
      newValues.p_foto
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
    connection.query("CALL crud_persona('DELETE', $1, '', '', '', '', '', 0, '', '')", [id], (err, res) => {
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
module.exports = PersonaServices;
