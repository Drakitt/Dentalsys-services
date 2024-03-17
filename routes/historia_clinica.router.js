const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const HistoriaClinicaServices = require('../services/historia_clinica.service');

const router = express.Router();
const service = new HistoriaClinicaServices();

router.get('/xxx', async (req, res) => {
  res.json({ text: 'the ad doesnt exist' });
})

router.get('/', async (req, res) => {
  service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal en el servidor."
      });
    else res.json(data);
  });
})

router.get('/paciente/:id', async (req, res) => {
  service.getPacienteHC(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else res.send(data);
  });
})
router.get('/:id', async (req, res) => {
  service.GetOneById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else res.send(data);
  });
})

router.post('/inputs', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body.regex)
  service.GetInputs(req.body.regex, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.json({ status: 'ok', message: 'request succed', data: data });
  });
})

router.get('/:id', async (req, res) => {
  service.getPacienteHC(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else res.send(data);
  });
})
router.get('/one/:id', async (req, res) => {
  service.GetOneById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "algo salió mal al encontrar el id " + req.params.id
        });
      }
    } else res.send(data);
  });
})

router.post('/insert', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const values = {
    nro_hc: req.body.nro_hc,
    operacion: 'INSERT',
    paciente_id: req.body.paciente_id,
    municipio: req.body.municipio,
    establecimiento: req.body.establecimiento,
    red_salud: req.body.red_salud,
    tutor_id: req.body.tutor_id || null,
    antecedentes_familiares: req.body.antecedentes_familiares,
    anemia: req.body.anemia,
    asma: req.body.asma,
    cardiopatias: req.body.cardiopatias,
    diabetes_mel: req.body.diabetes_mel,
    enf_gastricas: req.body.enf_gastricas,
    epilepsia: req.body.epilepsia,
    hepatitis: req.body.hepatitis,
    hipertension: req.body.hipertension,
    tuberculosis: req.body.tuberculosis,
    vih: req.body.vih,
    otros_atecedentes_personales: req.body.otros_atecedentes_personales,
    alergias: req.body.alergias,
    alergia_descripcion: req.body.alergia_descripcion,
    embarazo: req.body.embarazo,
    semanas_embarazo: req.body.semanas_embarazo,
    hemorragia_extraccion: req.body.hemorragia_extraccion,
    situacion_hemorragia: req.body.situacion_hemorragia,
    atm: req.body.atm,
    ganglios: req.body.ganglios,
    respirador: req.body.respirador,
    otros_examenes_extraorales: req.body.otros_examenes_extraorales,
    labios: req.body.labios,
    lengua: req.body.lengua,
    paladar: req.body.paladar,
    piso_boca: req.body.piso_boca,
    mucosa: req.body.mucosa,
    encias: req.body.encias,
    protesis: req.body.protesis,
    fecha: req.body.fecha,
    habitos: req.body.habitos,
    otros_habitos: req.body.otros_habitos,
    cepillo: req.body.cepillo,
    sangrado_encias: req.body.sangrado_encias,
    hilo_dental: req.body.hilo_dental,
    enjuague_bucal: req.body.enjuague_bucal,
    frecuencia_cepillado: req.body.frecuencia_cepillado,
    higiene_bucal: req.body.higiene_bucal,
    observaciones: req.body.observaciones,
    interconsulta: req.body.interconsulta,
    id_usuario_reg: req.body.id_usuario_reg,
    fecha_reg: new Date()
  };

  service.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.json({ status: 'ok', message: 'request succed', data: data });
  });
});


router.post('/prueba', async (req, res) => {
  res.json({ status: 'ok', message: 'request succed' });
  console.log("ver esto", req.body);
});

router.put('/:id', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }
  const values = {
    nro_hc: req.body.nro_hc,
    operacion: 'UPDATE',
    paciente_id: req.body.paciente_id,
    municipio: req.body.municipio,
    establecimiento: req.body.establecimiento,
    red_salud: req.body.red_salud,
    tutor_id: req.body.tutor_id || null,
    antecedentes_familiares: req.body.antecedentes_familiares,
    anemia: req.body.anemia,
    asma: req.body.asma,
    cardiopatias: req.body.cardiopatias,
    diabetes_mel: req.body.diabetes_mel,
    enf_gastricas: req.body.enf_gastricas,
    epilepsia: req.body.epilepsia,
    hepatitis: req.body.hepatitis,
    hipertension: req.body.hipertension,
    tuberculosis: req.body.tuberculosis,
    vih: req.body.vih,
    otros_atecedentes_personales: req.body.otros_atecedentes_personales,
    alergias: req.body.alergias,
    alergia_descripcion: req.body.alergia_descripcion,
    embarazo: req.body.embarazo,
    semanas_embarazo: req.body.semanas_embarazo,
    hemorragia_extraccion: req.body.hemorragia_extraccion,
    situacion_hemorragia: req.body.situacion_hemorragia,
    atm: req.body.atm,
    ganglios: req.body.ganglios,
    respirador: req.body.respirador,
    otros_examenes_extraorales: req.body.otros_examenes_extraorales,
    labios: req.body.labios,
    lengua: req.body.lengua,
    paladar: req.body.paladar,
    piso_boca: req.body.piso_boca,
    mucosa: req.body.mucosa,
    encias: req.body.encias,
    protesis: req.body.protesis,
    fecha: req.body.fecha,
    habitos: req.body.habitos,
    otros_habitos: req.body.otros_habitos,
    cepillo: req.body.cepillo,
    sangrado_encias: req.body.sangrado_encias,
    hilo_dental: req.body.hilo_dental,
    enjuague_bucal: req.body.enjuague_bucal,
    frecuencia_cepillado: req.body.frecuencia_cepillado,
    higiene_bucal: req.body.higiene_bucal,
    observaciones: req.body.observaciones,
    interconsulta: req.body.interconsulta,
    fecha_hc: req.body.fecha_hc || Date.now(),
    id_usuario_mod: req.body.id_usuario_mod,
    fecha_mod: new Date()
  };

  service.updateById(req.params.id, values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });

})

router.patch('/update', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }
  const values = {
    nro_hc: req.body.nro_hc,
    operacion: 'UPDATE',
    paciente_id: req.body.paciente_id,
    municipio: req.body.municipio,
    establecimiento: req.body.establecimiento,
    red_salud: req.body.red_salud,
    tutor_id: req.body.tutor_id || null,
    antecedentes_familiares: req.body.antecedentes_familiares,
    anemia: req.body.anemia,
    asma: req.body.asma,
    cardiopatias: req.body.cardiopatias,
    diabetes_mel: req.body.diabetes_mel,
    enf_gastricas: req.body.enf_gastricas,
    epilepsia: req.body.epilepsia,
    hepatitis: req.body.hepatitis,
    hipertension: req.body.hipertension,
    tuberculosis: req.body.tuberculosis,
    vih: req.body.vih,
    otros_atecedentes_personales: req.body.otros_atecedentes_personales,
    alergias: req.body.alergias,
    alergia_descripcion: req.body.alergia_descripcion,
    embarazo: req.body.embarazo,
    semanas_embarazo: req.body.semanas_embarazo,
    hemorragia_extraccion: req.body.hemorragia_extraccion,
    situacion_hemorragia: req.body.situacion_hemorragia,
    atm: req.body.atm,
    ganglios: req.body.ganglios,
    respirador: req.body.respirador,
    otros_examenes_extraorales: req.body.otros_examenes_extraorales,
    labios: req.body.labios,
    lengua: req.body.lengua,
    paladar: req.body.paladar,
    piso_boca: req.body.piso_boca,
    mucosa: req.body.mucosa,
    encias: req.body.encias,
    protesis: req.body.protesis,
    fecha: req.body.fecha,
    habitos: req.body.habitos,
    otros_habitos: req.body.otros_habitos,
    cepillo: req.body.cepillo,
    sangrado_encias: req.body.sangrado_encias,
    hilo_dental: req.body.hilo_dental,
    enjuague_bucal: req.body.enjuague_bucal,
    frecuencia_cepillado: req.body.frecuencia_cepillado,
    higiene_bucal: req.body.higiene_bucal,
    observaciones: req.body.observaciones,
    interconsulta: req.body.interconsulta,
    fecha_hc: req.body.fecha_hc || Date.now()
  };

  service.updateById(req.body.nro_hc, values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.send(data);
  });

})

router.delete('/x/:id', async (req, res) => {
  service.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Algo salió mal al encontrar" + req.params.id
        });
      }
    } else res.send({ message: `Excelente` });
  });
})

router.delete('/:id', async (req, res) => {
  service.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Algo salió mal al encontrar" + req.params.id
        });
      }
    } else res.send({ status: 'ok', message: 'request succed', data: data });
  });
})


module.exports = router;
