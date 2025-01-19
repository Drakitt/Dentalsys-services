const faker = require('faker');
const connection = require('../database/database');
class OdontoServices {

  constructor() {
    this.odonto = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM horario", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("horario: ", res?.rows?.length);
      result(null, res);
    });
  };


  findById = (id, result) => {
    console.log(id);
  
    // Primero, buscar el nro_hc en la tabla historia_clinica usando el id del paciente
    connection.query(`SELECT nro_hc FROM historia_clinica WHERE paciente_id = ${id}`, (err, resHistoria) => {
      if (err) {
        console.log("Error al buscar la historia clínica: ", err);
        result(err, null);
        return;
      }
  
      if (resHistoria.rows.length === 0) {
        console.log("No se encontró historia clínica para el paciente.");
        result({ message: "Historia clínica no encontrada" }, null);
        return;
      }
  
      const nroHc = resHistoria.rows[0].nro_hc;
      console.log("nro_hc encontrado: ", nroHc);
  
      // Ahora que tenemos el nro_hc, buscar en la tabla odontograma
      connection.query(`SELECT * FROM odontograma WHERE nro_hc = ${nroHc}`, (err, resOdonto) => {
        if (err) {
          console.log("Error al buscar en odontograma: ", err);
          result(err, null);
          return;
        }
  
        if (resOdonto.rows.length === 0) {
          console.log("No se encontró odontograma para el nro_hc: ", nroHc);
          result({ message: "Odontograma no encontrado" }, null);
          return;
        }
  
        console.log("Datos encontrados en odontograma: ", resOdonto.rows[0]);
        result(null, resOdonto.rows); // Devolver el primer registro de odontograma
      });
    });
  };
  
   insertDefaultValues = (nroHc, result)=> {
    const defaultIds = [1];
    let insertCount = 0;
  
    defaultIds.forEach((id) => {
      connection.query(
        `SELECT default_json FROM catalog WHERE id = ${id}`,
        (err, resCatalog) => {
          if (err) {
            console.log("Error al buscar en catalog: ", err);
            result(err, null);
            return;
          }
  
          if (resCatalog.rows.length > 0) {
            const defaultJson = resCatalog.rows[0].default_json;
  
            connection.query(
              `INSERT INTO odontograma (nro_hc, ${
                id === 1 ? "json_serialized" : "json_serialized_kid"
              }) VALUES (${nroHc}, '${JSON.stringify(defaultJson)}') RETURNING *`,
              (err, resInsert) => {
                if (err) {
                  console.log("Error al insertar en odontograma: ", err);
                  result(err, null);
                  return;
                }
  
                console.log("Nuevo registro insertado en odontograma:", resInsert.rows[0]);
                insertCount++;
  
                // Si es el último ID a insertar, devolver el resultado
                if (insertCount === defaultIds.length) {
                  result(null, { message: "Valores predeterminados insertados exitosamente" });
                }
              }
            );
          } else {
            console.log(`No se encontró registro en catalog con id ${id}`);
          }
        }
      );
    });
  };
  
  findByIdFc = (pacienteId, result) => {
    // Buscar el nro_hc asociado al paciente_id
    connection.query(
      `SELECT nro_hc FROM historia_clinica WHERE paciente_id = ${pacienteId}`,
      (err, res) => {
        if (err) {
          console.log("Error al buscar la historia clínica: ", err);
          result(err, null);
          return;
        }
  
        if (res.rows.length === 0) {
          console.log("No se encontró historia clínica para el paciente.");
          result({ message: "Historia clínica no encontrada" }, null);
          return;
        }
         console.log(res)
        const nroHc = res.rows[0].nro_hc;
  
        // Buscar registros en la tabla odontograma con el nro_hc obtenido
        connection.query(
          `SELECT * FROM odontograma WHERE nro_hc = ${nroHc}`,
          (err, resOdonto) => {
            if (err) {
              console.log("Error al buscar en odontograma: ", err);
              result(err, null);
              return;
            }
  
            if (resOdonto.rows.length === 0) {
              // Si no se encuentran registros, buscar valores predeterminados en catalog
              this.insertDefaultValues(nroHc, result); ;
            } else {
              // Si existen registros, devolver el primero
              console.log("Datos encontrados en odontograma: ", resOdonto.rows[0]);
              result(null, resOdonto.rows[0]);
            }
          }
        );
      }
    );
  };
  



  GetOneById = (id, result) => {
    const quer= `SELECT * FROM horario WHERE id_horario = ${id}`

    connection.query(quer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        console.log("devolver: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };

  create = (newValues, result) => {
    connection.query(
      "CALL public.crud_horario($1,$2,$3,$4,$5,$6,$7)",
      [
        newValues.p_id_horario,
        newValues.p_operacion,
        newValues.p_hora,
        newValues.p_dia,
        newValues.p_turno,
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
    connection.query(
      `UPDATE odontograma SET json_serialized = $1 WHERE nro_hc = ${id}`,
      [
        newValues.json_serialized,


      ], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { res: res, ...newValues });
    });
  };

  remove = (id,idusuario,fecha, result) => {
    connection.query(`CALL public.crud_horario($1,'DELETE','','','',${idusuario}, '${fecha}')`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "no se encontró el id" }, null);
        return;
      }

      console.log("se eliminó el horario: ", id);
      result(null, res);
    });
  };

}
module.exports = OdontoServices;
