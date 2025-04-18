const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const TratamientoPiezaServices = require('../services/tratamiento_pieza.service');

const router = express.Router();
const service = new TratamientoPiezaServices();

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

router.get('/:id', async (req, res) => {
  service.findById(req.params.id, (err, data) => {
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
router.post('/full', async (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const { prescription_id, patient_id, prescription_text, status, doctor_id, nro_hc, nombre_tratamiento, descripcion, pagado, fecha_fin } = req.body;

  const values = {
    prescription_id,  
    patient_id,
    prescription_text,
    status,
    doctor_id,
    nro_hc,
    nombre_tratamiento,
    descripcion,
    pagado,
    fecha_fin
  };

  try {

    const data = await service.createOrUpdatePrescription(values);

   
    res.json({
      status: 'ok',
      message: 'Request succeeded',
      data: data
    });
  } catch (err) {

    res.status(500).send({
      message: err.message || "Algo salió mal"
    });
  }
});
router.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const values = {
    p_id_tratamiento_pieza: 0,
    p_operacion: 'INSERT',
    p_pieza_id: req.body.pieza_id,
    p_tratamiento_id: req.body.tratamiento_id
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

router.patch('/:id', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No hay elementos"
    });
  }
  const values = {
    p_id_tratamiento_pieza: req.body.id_tratamiento_pieza,
    p_operacion: 'UPDATE',
    p_pieza_id: req.body.pieza_id,
    p_tratamiento_id: req.body.tratamiento_id
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
