const faker = require('faker');
const connection = require('../database/database');
class DentistaServices {

  constructor() {
    this.dentista = [];
  }
  getActives = result => {
    connection.query(`SELECT * FROM dentista_v where activo =true`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dentistas: ", res?.rows?.length);
      result(null, res);
    });
  };
  getAll = result => {
    connection.query("SELECT * FROM dentista_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dentistas: ", res?.rows?.length);
      result(null, res);
    });
  };
  getAllLimit = result => {
    connection.query("SELECT id_dentista as id, nombre, apellido_paterno, apellido_materno, celular, email, ci FROM dentista_v limit 20", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dentistas: ", res?.rows?.length);
      result(null, res);
    });
  };

  getHorarioById =  (id, result) => {
    connection.query(`SELECT id_dentista_horario as id, hora, dia, turno FROM horario_v WHERE dentista_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dentistas: ", res?.rows?.length);
      result(null, res);
    });
  };

  getServicioById =  (id, result) => {
    connection.query(`SELECT id_dentista_servicio as id, tipo, detalles, costo FROM servicio_v WHERE dentista_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dentistas: ", res?.rows?.length);
      result(null, res);
    });
  };
  countAll = result => {
    connection.query("SELECT COUNT(*) FROM dentista_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dentistas: ", res?.rows?.length);
      result(null, res?.rows?.shift()?.count);
    });
  };
  findById = (id, result) => {
    connection.query(`SELECT * FROM dentista_v WHERE nombre LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dentistas: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM dentista_v WHERE id_dentista = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res?.rows?.length) {
        console.log("devolver: ", res.rows[0]);
        result(null, res.rows[0]);
        return;
      }
      console.log("dentistas: ", res?.rows);


      result({ kind: "no se encontró el id" }, null);
    });
  };


  create = (newValues, result) => {
    connection.query("CALL public.crud_dentista($1,$2,$3,$4,$5)",
    [
      newValues.p_id_dentista,
      newValues.p_operacion,
      newValues.p_persona_id,
      newValues.p_id_usuario_reg,
      newValues.p_fecha_reg
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

  updateById = (id, newValues, result) => {
    connection.query("CALL dentalsys.crud_dentista($1,$2,$3,$4,$5)",
    [
      id,
      newValues.p_operacion,
      newValues.p_persona_id,
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
    connection.query(`CALL crud_dentista($1,'DELETE', 0,${idusuario},'${fecha}')`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó el dentista: ", id);
      result(null, res);
    });
  };

}
module.exports = DentistaServices;
