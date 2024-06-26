const faker = require('faker');
const connection = require('../database/database');
class CitasServices {

  constructor() {
    this.citas = [];
  }


   getCitas = async (startDate, ci) => {
   
    let query = `
    SELECT
      per.ci,
      c.id_cita,
      c.razon,
      c.detalles,
      c.fecha,
      c.hora,
      per.nombre AS paciente_nombre,
      per.apellido_paterno AS paciente_apellido_paterno,
      per.apellido_materno AS paciente_apellido_materno,
      per.direccion AS paciente_direccion,
      per.celular AS paciente_celular,
      per.email AS paciente_email,
  
      co.monto,
      co.fecha_pago,
      co.metodo_pago
    FROM
      public.cita c
    JOIN
      public.paciente p ON c.paciente_id = p.id_paciente
    JOIN
      public.persona per ON p.persona_id = per.id_persona
    JOIN
      public.dentista d ON c.dentista_id = d.id_dentista
    LEFT JOIN
      public.cobros co ON c.id_cita = co.id_cita
    WHERE
    1=1
  `;
  
  
  if (startDate) {
    query += ` AND c.fecha BETWEEN '${startDate}' AND CURRENT_DATE`;
  }

  if (ci) {
    query += ` AND per.ci = '${ci}'`;
  }

  
    query += ' ORDER BY c.fecha, c.hora';
  
    try {
      const result = await connection.query(query);
    
      return result.rows;
    } catch (err) {
      throw err;
    }
  };

  getAll = result => {
    connection.query("SELECT * FROM cita_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("citas: ", res?.rows?.length);
      result(null, res);
    });
  };

  updateState = (id, result) => {
    connection.query(`UPDATE public.cita SET estado='atendido' WHERE id_cita=${id};`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("citas: ", res);
      result(null, res);
    });
  };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM cita_v ci_paciente SIMILAR TO '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("citas: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetByMonth = (newValues, result) => {
    connection.query(`SELECT * FROM cita_v WHERE DATE_PART('MONTH',fecha) IN (SELECT EXTRACT(month FROM '${newValues.p_fecha}'::date)) AND DATE_PART('YEAR',fecha) IN (SELECT EXTRACT(year FROM '${newValues.p_fecha}'::date)) `, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res?.rows?.length) {
        console.log("devolver: ", res?.rows?.length);
        result(null, res.rows);
        return;
      }

      result([]);
    });
  };

  GetByWeek = (newValues, result) => {
    connection.query(`SELECT * FROM cita_v WHERE DATE_PART('week',fecha)- DATE_PART('week', DATE_TRUNC('month', fecha)) + 1 IN ('${newValues.p_semana}') AND DATE_PART('MONTH',fecha) IN ('${newValues.p_mes}') AND DATE_PART('YEAR',fecha) IN ('${newValues.p_año}')`, (err, res) => {
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

      result({ kind: "no se encontraron citas" }, null);
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

      "CALL public.crud_cita($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        newValues.p_id_cita,
        newValues.p_operacion,
        newValues.p_razon,
        newValues.p_detalles,
        newValues.p_fecha,
        newValues.p_hora,
        newValues.p_paciente_id,
        newValues.p_dentista_id,
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
    connection.query("CALL public.crud_cita($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [
        id,
        newValues.p_operacion,
        newValues.p_razon,
        newValues.p_detalles,
        newValues.p_fecha,
        newValues.p_hora,
        newValues.p_paciente_id,
        newValues.p_dentista_id,
        newValues.p_id_usuario_mod,
        newValues.p_fecha_mod
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

  remove = (id,idusuario,fecha, result) => {
    connection.query(`CALL public.crud_cita($1,'DELETE','','','2024-03-03','9:00:00 BOT',0,0,${idusuario},'${fecha}')`, [id], (err, res) => {
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
      result(null, res.rows);
    });
  };

}
module.exports = CitasServices;
