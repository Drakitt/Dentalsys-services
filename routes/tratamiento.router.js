const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const TratamientoServices = require('../services/tratamiento.service');

const router = express.Router();
const service = new TratamientoServices();

router.get('/xxx', async (req, res) => {
  res.json({ text: 'the ad doesnt exist' });
})
router.get('/reporte-tratamiento', async (req, res) => {
  const { ci, startDate } = req.query;
/*
  if (!startDate) {
    return res.status(400).send('Debe proporcionar la fecha de inicio (startDate).');
  }*/

  try {
    const tratamientos = await service.getTrata(startDate, ci);
    res.json(tratamientos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});
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

router.get('/all/:id', async (req, res) => {
  service.GetOneByHcId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `no se encontró el id id ${req.params.id}.`
        });
      } else {
        res.status(204).send([]);
      }
    } else res.send(data);
  });
})

router.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const newCobro = req.body;
  service.create(newCobro, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else res.json({ status: 'ok', message: 'OK', data: data });
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

  const newCobro = req.body;
  service.updateById(req.params.id, newCobro, (err, data) => {
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
