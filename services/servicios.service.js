const faker = require('faker');
const connection = require('../database/database');
class ServiciosServices {

  constructor() {
    this.tratamiento = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM servicios", (err, res) => {
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
    connection.query(`SELECT s.* ,sv.costo
      FROM servicio sv
      INNER JOIN servicios s ON sv.id_servicio = s.id_servicio
      WHERE s.id= ${id}`, (err, res) => {
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
      const query2 = `SELECT sv.*, s.tipo ,s.costo
      FROM servicios sv
      INNER JOIN servicio s ON sv.id_servicio = s.id_servicio
      WHERE sv.nro_hc= ${nro_hc}`;
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
        `INSERT INTO servicios (nro_hc, id_servicio, fecha) 
         VALUES ($1, $2, $3)`,
        [
            newValues.nro_hc, newValues.id_servicio, newValues.fecha,
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
  let query = `UPDATE servicios SET fecha = $2, id_servicio = $3`;
  let values = [id, updatedValues.fecha, updatedValues.id_servicio];

  if (updatedValues.pagado !== undefined) {
    query += `, pagado = $4 WHERE id = $1`;
    values.push(updatedValues.pagado);
  } else {
    query += ` WHERE id = $1`;
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
module.exports = ServiciosServices;
