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
    connection.query(`SELECT * FROM odontograma WHERE nro_hc = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

        const rows = res;
        result(null, rows.rows);

    });
  };

  findByIdFc = (id, result) => {

    connection.query(`SELECT * FROM odontograma WHERE nro_hc = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }


      if (res.rows.length === 0) {

        connection.query(`SELECT default_json FROM catalog WHERE id=2`, (err, resCatalog) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (resCatalog.rows.length  > 0) {
            const defaultJson = resCatalog.rows[0].default_json;
            connection.query(`INSERT INTO odontograma (nro_hc, json_serialized_kid) VALUES (${id}, '${JSON.stringify(defaultJson)}') RETURNING *`, (err, resInsert) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              console.log("Nuevo registro insertado en odontograma:", resInsert.rows[0]);
              result(null, resInsert.rows[0]);
            });
          } else {
            console.log("No se encontraron registros en la tabla catalog.");
            result(null, { message: "No se encontraron registros en la tabla catalog." });
          }
        });
        connection.query(`SELECT default_json FROM catalog WHERE id=1`, (err, resCatalog) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (resCatalog.rows.length  > 0) {
            const defaultJson = resCatalog.rows[0].default_json;
            connection.query(`INSERT INTO odontograma (nro_hc, json_serialized) VALUES (${id}, '${JSON.stringify(defaultJson)}') RETURNING *`, (err, resInsert) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              console.log("Nuevo registro insertado en odontograma:", resInsert.rows[0]);
              result(null, resInsert.rows[0]);
            });
          } else {
            console.log("No se encontraron registros en la tabla catalog.");
            result(null, { message: "No se encontraron registros en la tabla catalog." });
          }
        });
      } else {

        const rows = res;
        result(null, rows.rows[0]);
      }

    });
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
