const faker = require('faker');
const connection = require('../database/database');
class HistoriaClinicaServices {

  constructor() {
    this.historiaclinica = [];
  }

  getAll = result => {
    connection.query("SELECT * FROM historia_clinica_v", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("hc: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetInputs = (grupo, result) => {
    connection.query(`SELECT * FROM input_schema WHERE grupo SIMILAR TO '%${grupo}%' AND table_name SIMILAR TO '%historia_clinica_v%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("historia_c: ", res?.rows?.length);
      result(null, res.rows);
    });
  };

  getPacienteHC = (id, result) => {
    connection.query(`SELECT nro_hc as id, municipio, establecimiento, red_salud as red_de_salud, fecha_hc as fecha, nombre FROM historia_clinica_v WHERE paciente_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("hc: ", res?.rows?.length);
      result(null, res);
    });
  };

  findById = (id, result) => {
    console.log(id);
    connection.query(`SELECT * FROM historia_clinica WHERE ci_paciente LIKE '%${id}%' OR celular_paciente LIKE '%${id}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("hc: ", res?.rows?.length);
      result(null, res);
    });
  };

  GetOneById = (id, result) => {
    connection.query(`SELECT * FROM historia_clinica_v WHERE nro_hc = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res?.rows?.length) {
        console.log("hc: ", res?.rows?.length);
        result(null, res);
        return;
      }

      result({ kind: "no se encontró el id" }, null);
    });
  };

  create = (newValues, result) => {
    connection.query(
      "CALL public.crud_historia_clinica_complete($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50)",
      [
        newValues.nro_hc,
        newValues.operacion,
        newValues.paciente_id,
        newValues.municipio,
        newValues.establecimiento,
        newValues.red_salud,
        newValues.tutor_id,
        newValues.antecedentes_familiares,
        newValues.anemia,
        newValues.asma,
        newValues.cardiopatias,
        newValues.diabetes_mel,
        newValues.enf_gastricas,
        newValues.epilepsia,
        newValues.hepatitis,
        newValues.hipertension,
        newValues.tuberculosis,
        newValues.vih,
        newValues.otros_atecedentes_personales,
        newValues.alergias,
        newValues.alergia_descripcion,
        newValues.embarazo,
        newValues.semanas_embarazo,
        newValues.hemorragia_extraccion,
        newValues.situacion_hemorragia,
        newValues.atm,
        newValues.ganglios,
        newValues.respirador,
        newValues.otros_examenes_extraorales,
        newValues.labios,
        newValues.lengua,
        newValues.paladar,
        newValues.piso_boca,
        newValues.mucosa,
        newValues.encias,
        newValues.protesis,
        newValues.fecha,
        newValues.habitos,
        newValues.otros_habitos,
        newValues.cepillo,
        newValues.sangrado_encias,
        newValues.hilo_dental,
        newValues.enjuague_bucal,
        newValues.frecuencia_cepillado,
        newValues.higiene_bucal,
        newValues.observaciones,
        newValues.interconsulta,
        newValues.fecha_hc,
        newValues.id_usuario_reg,
        newValues.fecha_reg
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
  create2 = (newValues, result) => {
    connection.query(
      "CALL public.crud_historia_clinica($1,$2,$3,$4,$5,$6)",
      [
        newValues.p_nro_hc,
        newValues.p_operacion,
        newValues.p_municipio,
        newValues.p_establecimiento,
        newValues.p_red_salud,
        newValues.p_paciente_id
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
      "CALL public.crud_historia_clinica_complete($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50)",
      [
        newValues.nro_hc,
        newValues.operacion,
        newValues.paciente_id,
        newValues.municipio,
        newValues.establecimiento,
        newValues.red_salud,
        newValues.tutor_id,
        newValues.antecedentes_familiares,
        newValues.anemia,
        newValues.asma,
        newValues.cardiopatias,
        newValues.diabetes_mel,
        newValues.enf_gastricas,
        newValues.epilepsia,
        newValues.hepatitis,
        newValues.hipertension,
        newValues.tuberculosis,
        newValues.vih,
        newValues.otros_atecedentes_personales,
        newValues.alergias,
        newValues.alergia_descripcion,
        newValues.embarazo,
        newValues.semanas_embarazo,
        newValues.hemorragia_extraccion,
        newValues.situacion_hemorragia,
        newValues.atm,
        newValues.ganglios,
        newValues.respirador,
        newValues.otros_examenes_extraorales,
        newValues.labios,
        newValues.lengua,
        newValues.paladar,
        newValues.piso_boca,
        newValues.mucosa,
        newValues.encias,
        newValues.protesis,
        newValues.fecha,
        newValues.habitos,
        newValues.otros_habitos,
        newValues.cepillo,
        newValues.sangrado_encias,
        newValues.hilo_dental,
        newValues.enjuague_bucal,
        newValues.frecuencia_cepillado,
        newValues.higiene_bucal,
        newValues.observaciones,
        newValues.interconsulta,
        newValues.fecha_hc,
        newValues.id_usuario_mod,
        newValues.fecha_mod
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
    connection.query(`CALL public.crud_cita($1,'DELETE','','','',${idusuario},'${fecha}')`, id, (err, res) => {
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
module.exports = HistoriaClinicaServices;
