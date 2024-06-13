const faker = require('faker');
const connection = require('../database/database');
class CobrosServices {

  constructor() {
    this.cobros = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM cobros", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("cobros: ", res?.rows?.length);
      result(null, res);
    });
  };
  getSum = result => {
    connection.query("SELECT SUM(monto) FROM cobros", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("cobros: ", res?.rows?.length);
      result(null, res);
    });
  };
 
  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM cobros WHERE id_cobro LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("cobros: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM cobros WHERE id_cita = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;cita
      }
      console.log("cobros: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById2 = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM cobros WHERE id_tratamiento = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;cita
      }
      console.log("cobros: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById3 = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM cobros WHERE id_servicio = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;cita
      }
      console.log("cobros: ", res?.rows?.length);
      result(null, res);
    });
  };
   create = (newValues, result) => {
    connection.query(
        `INSERT INTO cobros (id_cita, id_tratamiento, monto, fecha_pago, metodo_pago,id_servicio) 
         VALUES ($1, $2, $3, $4, $5,$6)`,
        [
            newValues.id_cita, newValues.id_tratamiento, newValues.monto, newValues.fecha_pago, newValues.metodo_pago,newValues.id_servicio
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



}
module.exports = CobrosServices;
