const faker = require('faker');
const connection = require('../database/database');
class TratamientoPiezaServices {

  constructor() {
    this.tratamientopieza = [];
  }

  createOrUpdatePrescription = (data) => {
    return new Promise((resolve, reject) => {

      connection.beginTransaction((err) => {
        if (err) {
          reject('Error al iniciar transacción: ' + err);
          return;
        }


        if (data.prescription_id) {
          const updatePrescriptionQuery = `
            UPDATE patientprescriptions
            SET prescription_text = ?, updated_at = NOW(), status = ?, doctor_id = ?
            WHERE prescription_id = ?
          `;
          const { prescription_text, status, doctor_id, prescription_id } = data;

          connection.query(updatePrescriptionQuery, [prescription_text, status, doctor_id, prescription_id], (err, res) => {
            if (err) {
              connection.rollback(() => {
                reject('Error al actualizar la receta: ' + err);
              });
              return;
            }


            const treatmentQuery = `
              UPDATE tratamientos
              SET nro_hc = ?, nombre_tratamiento = ?, descripcion = ?, pagado = ?, fecha_fin = ?
              WHERE id_tratamiento = ?
            `;
            const { nro_hc, nombre_tratamiento, descripcion, pagado, fecha_fin, id_tratamiento } = data;

            connection.query(treatmentQuery, [nro_hc, nombre_tratamiento, descripcion, pagado, fecha_fin, id_tratamiento], (err, res) => {
              if (err) {
                connection.rollback(() => {
                  reject('Error al actualizar el tratamiento: ' + err);
                });
                return;
              }

        
              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    reject('Error al confirmar la transacción: ' + err);
                  });
                  return;
                }

                resolve({ prescriptionId: prescription_id, ...data });
              });
            });
          });
        } else {
       
          const prescriptionQuery = `
            INSERT INTO patientprescriptions (patient_id, prescription_text, created_at, updated_at, status, doctor_id)
            VALUES (?, ?, NOW(), NOW(), ?, ?)
          `;
          const { patient_id, prescription_text, status, doctor_id } = data;

          connection.query(prescriptionQuery, [patient_id, prescription_text, status, doctor_id], (err, res) => {
            if (err) {
              connection.rollback(() => {
                reject('Error al crear la receta: ' + err);
              });
              return;
            }

            const prescriptionId = res.insertId;  

   
            const treatmentQuery = `
              INSERT INTO tratamientos (nro_hc, nombre_tratamiento, descripcion, fecha, pagado, fecha_fin)
              VALUES (?, ?, ?, NOW(), ?, ?)
            `;
            const { nro_hc, nombre_tratamiento, descripcion, pagado, fecha_fin } = data;

            connection.query(treatmentQuery, [nro_hc, nombre_tratamiento, descripcion, pagado, fecha_fin], (err, res) => {
              if (err) {
                connection.rollback(() => {
                  reject('Error al crear el tratamiento: ' + err);
                });
                return;
              }

        
              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    reject('Error al confirmar la transacción: ' + err);
                  });
                  return;
                }

           
                resolve({ prescriptionId, ...data });
              });
            });
          });
        }
      });
    });
  };


  
  getAll = result => {
    connection.query("SELECT * FROM tratamiento_pieza", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tratamiento_pieza: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM tratamiento_pieza WHERE ci_paciente LIKE '%${id}%' OR celular_paciente LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tratamiento_pieza: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM tratamiento_pieza WHERE id_tratamiento_pieza = ${id}`, (err, res) => {
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
      "CALL public.crud_tratamiento_pieza($1,$2,$3,$4)",
      [
        newValues.p_id_tratamiento_pieza,
        newValues.p_operacion,
        newValues.p_pieza_id,
        newValues.p_tratamiento_id
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
      "CALL public.crud_tratamiento_pieza($1,$2,$3,$4)",
      [
        id,
        newValues.p_operacion,
        newValues.p_pieza_id,
        newValues.p_tratamiento_id
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
    connection.query("CALL public.crud_tratamiento_pieza($1,'DELETE',0,0)", id, (err, res) => {
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
module.exports = TratamientoPiezaServices;
