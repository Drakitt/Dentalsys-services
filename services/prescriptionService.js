const connection = require('../database/database');

class PrescriptionService {
  constructor() {}

  // Obtener todas las recetas
  getAllPrescriptions = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM patientprescriptions';
      connection.query(query, (err, res) => {
        if (err) {
          console.error('Error al obtener las recetas: ', err);
          reject(err);  // Rechazar la promesa en caso de error
          return;
        }
        console.log(`Recetas encontradas: ${res.rows.length}`);
        resolve(res);  // Resolver la promesa con los resultados
      });
    });
  };

// Obtener todas las recetas por paciente
getAllPrescriptionsByPatient = (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM patientprescriptions WHERE patient_id = $1';  // Usar $1 para PostgreSQL
      connection.query(query, [id], (err, res) => {
        if (err) {
          console.error('Error al obtener las recetas por paciente: ', err);
          reject(err);  // Rechazar la promesa en caso de error
          return;
        }
        console.log(`Recetas encontradas para el paciente: ${res.rows.length}`);
        resolve(res.rows);  // Resolver la promesa con los resultados
      });
    });
  };
  
  // Obtener una receta por ID
// Obtener una receta por ID
getPrescriptionById = (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM patientprescriptions WHERE id = $1';  
      connection.query(query, [id], (err, res) => {
        if (err) {
          console.error('Error al obtener las recetas : ', err);
          reject(err);  
          return;
        }
        console.log(`Recetas encontradas para el paciente: ${res.rows.length}`);
        resolve(res.rows);  
      });
    });
  };

  createPrescription = (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO patientprescriptions (patient_id, prescription_text, created_at, updated_at, status, doctor_id)
        VALUES ($1, $2, NOW(), NOW(), $3, $4)`;  // Using PostgreSQL-style placeholders ($1, $2, $3, $4)
    
      const { patient_id, prescription_text, status, doctor_id } = data;
    
      connection.query(query, [patient_id, prescription_text, status, doctor_id], (err, res) => {
        if (err) {
          console.error('Error al crear la receta: ', err);
          reject(err);  
          return;
        }
        console.log('Receta creada con ID: ', res.insertId);
        resolve({ id: res.insertId, ...data }); 
      });
    });
  };
  
  
  updatePrescription = (id, updates) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE patientprescriptions
        SET patient_id = $1, prescription_text = $2, updated_at = NOW(), status = $3, doctor_id = $4
        WHERE id = $5`;
  
      const { patient_id, prescription_text, status, doctor_id } = updates;
  
      // Los parámetros deben pasar en el orden que se definen en la consulta
      connection.query(query, [patient_id, prescription_text, status, doctor_id, id], (err, res) => {
        if (err) {
          console.error('Error al actualizar la receta: ', err);
          reject(err);  // Rechazar la promesa en caso de error
          return;
        }
        if (res.rowCount === 0) {
          reject({ message: 'Receta no encontrada' });  // Rechazar si no se actualiza ninguna receta
          return;
        }
        console.log('Receta actualizada: ', { id, ...updates });
        resolve({ id, ...updates });  // Resolver la promesa con la receta actualizada
      });
    });
  };
  
  // Eliminar una receta
  deletePrescription = (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM patientprescriptions WHERE id = $1';

      connection.query(query, [id], (err, res) => {
        if (err) {
          console.error('Error al eliminar la receta: ', err);
          reject(err);  // Rechazar la promesa en caso de error
          return;
        }
        if (res.affectedRows === 0) {
          reject({ message: 'Receta no encontrada' });  // Rechazar si no se elimina ninguna receta
          return;
        }
        console.log('Receta eliminada con ID: ', id);
        resolve({ message: 'Receta eliminada' });  // Resolver la promesa con un mensaje de éxito
      });
    });
  };
}

module.exports = PrescriptionService;
