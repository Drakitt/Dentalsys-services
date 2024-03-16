const faker = require('faker');
const connection = require('../database/database');
class DashboardServices {

  constructor() {
    this.dashboard = [];
  }

  estadoCita = result => {
    connection.query("SELECT COUNT(id_cita), activo FROM cita GROUP BY activo;", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dashboard: ", res?.rows?.length);
      result(null, res);
    });
  };

  estadoDentista= result => {
    connection.query("SELECT COUNT(id_dentista), activo FROM dentista GROUP BY activo;SELECT COUNT(id_dentista), activo FROM dentista GROUP BY activo;", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dashboard: ", res?.rows?.length);
      result(null, res);
    });
  };

  estadoDentista= result => {
    connection.query("SELECT COUNT(id_dentista), activo FROM dentista GROUP BY activo;SELECT COUNT(id_dentista), activo FROM dentista GROUP BY activo;", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dashboard: ", res?.rows?.length);
      result(null, res);
    });
  };

  estadoPaciente= result => {
    connection.query("SELECT COUNT(id_paciente), activo FROM paciente GROUP BY activo;", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dashboard: ", res?.rows?.length);
      result(null, res);
    });
  };

  estadoTratamiento= result => {
    connection.query("SELECT COUNT(id_tratamiento), activo FROM tratamiento GROUP BY activo;", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dashboard: ", res?.rows?.length);
      result(null, res);
    });
  };

  // estadoPaciente= result => {
  //   connection.query("", (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }
  //     console.log("dashboard: ", res?.rows?.length);
  //     result(null, res);
  //   });
  // };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM cita_v ci_paciente SIMILAR TO '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("dashboard: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM cita_v WHERE id_cita = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res?.rows?.length) {
        console.log("devolver: ", res?.rows?.length);
        result(null, res.rows[0]);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };

  create = (newValues, result) => {
    connection.query(
      "CALL public.crud_cita($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        newValues.p_id_cita,
        newValues.p_operacion,
        newValues.p_razon,
        newValues.p_detalles,
        newValues.p_fecha,
        newValues.p_hora,
        newValues.p_paciente_id,
        newValues.p_dentista_id,
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
    connection.query("CALL public.crud_cita($1,$2,$3,$4,$5,$6,$7,$8)", [
        id,
        newValues.p_operacion,
        newValues.p_razon,
        newValues.p_detalles,
        newValues.p_fecha,
        newValues.p_hora,
        newValues.p_paciente_id,
        newValues.p_dentista_id,
      ], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("valores ingresados: ", { id: id, ...newValues });
      result(null, { id: id, ...newValues });
    });
  };

  remove = (id, result) => {
    connection.query("CALL public.crud_cita($1,'DELETE','','','2024-03-03','9:00:00 BOT',0,0)", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó: ", id);
      result(null, res);
    });
  };

}
module.exports = DashboardServices;
