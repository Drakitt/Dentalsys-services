const faker = require('faker');
const connection = require('../database/database');
class TratamientoServices {

  constructor() {
    this.tratamiento = [];
  }

  getTrata = async (startDate, ci) => {
   
    let query = `
      SELECT
          t.*,
          per.nombre AS paciente_nombre,
          per.apellido_paterno AS paciente_apellido_paterno,
          per.apellido_materno AS paciente_apellido_materno,
          per.direccion AS paciente_direccion,
          per.celular AS paciente_celular,
          per.email AS paciente_email,
          per.ci
      FROM
          public.tratamientos t
      JOIN
          public.historia_clinica hc ON t.nro_hc = hc.nro_hc 
      JOIN
          public.paciente p ON hc.paciente_id = p.id_paciente
      JOIN
          public.persona per ON p.persona_id = per.id_persona
      WHERE
      1=1
  `;
  
  
  if (startDate) {
    query += ` AND T.fecha = '${startDate}'`;
  }

  if (ci) {
    query += ` AND per.ci = '${ci}'`;
  }

  
    query += ' ORDER BY t.fecha';
  
    try {
      const result = await connection.query(query);
    
      return result.rows;
    } catch (err) {
      throw err;
    }
  };
  getAll = result => {
    connection.query("SELECT * FROM tratamientos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tratamiento: ", res?.rows?.length);
      result(null, res);
    });
  };
  getAllForOdonto = result => {
    connection.query("SELECT * FROM tratamientos WHERE id_odontograma IS NOT NULL", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tratamiento: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM tratamiento WHERE ci_paciente LIKE '%${id}%' OR celular_paciente LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tratamiento: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM tratamientos WHERE id_tratamiento = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        console.log("devolver: ", res.rows);
        result(null, res.rows);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };
   GetOneByHcId = (id, result) => {
    const query1 = `SELECT nro_hc FROM historia_clinica_v WHERE paciente_id = ${id}`;
  
    connection.query(query1, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res1.rows.length === 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }


      const nro_hc = res1.rows[0]?.nro_hc;
      const query2 = `SELECT * FROM tratamientos WHERE nro_hc = ${nro_hc}`;
  console.log(nro_hc)
      connection.query(query2, (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res2.length === 0) {
          result({ kind: "no se encontró el tratamiento" }, null);
          return;
        }
  
        console.log("devolver: ", res2);
        result(null, res2);
      });
    });
  };
  
  create = (newValues, result) => {
    connection.query(
        `INSERT INTO tratamientos (nro_hc, nombre_tratamiento, descripcion, fecha) 
         VALUES ($1, $2, $3, $4)`,
        [
            newValues.nro_hc, newValues.nombre_tratamiento, newValues.descripcion, newValues.fecha,
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            //console.log("Valores ingresados: ", res.rows[0]);
            result(null, res);
        }
    );
};

createForOdonto = (newValues, result) => {
  connection.query(
      `INSERT INTO tratamientos (nro_hc, nombre_tratamiento, descripcion, fecha,id_odontograma) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
          newValues.nro_hc, newValues.nombre_tratamiento, newValues.descripcion, newValues.fecha,newValues.id_odontograma,
      ],
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }
          //console.log("Valores ingresados: ", res.rows[0]);
          result(null, res);
      }
  );
};

updateById = (id, updatedValues, result) => {
  let query = `UPDATE tratamientos SET nombre_tratamiento = $2, descripcion = $3, fecha = $4`;
  let values = [id, updatedValues.nombre_tratamiento, updatedValues.descripcion, updatedValues.fecha];

  if (updatedValues.pagado !== undefined) {
    query += `, pagado = $5 WHERE id_tratamiento = $1`;
    values.push(updatedValues.pagado);
  } else {
    query += ` WHERE id_tratamiento = $1`;
  }

  connection.query(query, values, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};



  remove = (id, result) => {
    connection.query("CALL public.crud_tratamiento($1,'DELETE','','','','',0,0)", id, (err, res) => {
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
module.exports = TratamientoServices;
