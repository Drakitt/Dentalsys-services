const { response } = require('express');
const express = require('express');
const connection = require('./../database/database');
const PacienteServices = require('./../services/paciente.service');
const PersonaServices = require('./../services/persona.service');

const router = express.Router();
const service = new PacienteServices();
const serviceP = new PersonaServices();

router.get('/xxx', async (req, res) => {
  res.json({ text: 'paciente existe' });
})
router.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const idusuario = req.usuario.id;

  let values = {
    p_id_paciente: 0,
    p_operacion: 'INSERT',
    p_persona_id: req.body.persona_id,
    p_estado_civil: req.body.estado_civil,
    p_nacion_originaria: req.body.nacion_originaria,
    p_grado_educativo: req.body.grado_educativo,
    p_idioma: req.body.idioma,
    p_lugar_nacimiento: req.body.lugar_nacimiento,
    p_fecha_nacimiento: req.body.fecha_nacimiento,
    p_ocupacion: req.body.ocupacion,
    p_tutor_id: req.body.tutor_id,
    p_sexo: req.body.sexo,
    p_edad: req.body.edad,
    p_id_usuario_reg: idusuario,
    p_fecha_reg: new Date()
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
router.post('/nuevo', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const values = {
    p_operacion: 'INSERT',
    p_id_persona: 0,
    p_ci: req.body.ci,
    p_direccion: req.body.direccion,
    p_nombre: req.body.nombre,
    p_apellidos: req.body.apellidos,
    p_telefono: req.body.telefono,
    p_celular: req.body.celular,
    p_email: req.body.email
  };

  let valuesn = {
    p_id_paciente: 0,
    p_operacion: 'INSERT',
    p_persona_id: req.body.persona_id,
    p_estado_civil: req.body.estado_civil,
    p_nacion_originaria: req.body.nacion_originaria,
    p_grado_educativo: req.body.grado_educativo,
    p_idioma: req.body.idioma,
    p_lugar_nacimiento: req.body.lugar_nacimiento,
    p_fecha_nacimiento: req.body.fecha_nacimiento,
    p_ocupacion: req.body.ocupacion,
    p_tutor_id: req.body.tutor_id,
    p_sexo: req.body.sexo,
    p_edad: req.body.edad,
    p_id_usuario_reg: req.body.id_usuario_reg,
    p_fecha_reg: new Date()
  };
  // service.create(values, (err, data) => {
  //   if (err)
  //     res.status(500).send({
  //       message:
  //         err.message || "Algo salió mal"
  //     });
  //   else res.json({ status: 'ok', message: 'request succed', data: data });
  // });
  serviceP.create(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal"
      });
    else {
      valuesn.p_persona_id = data.id;
      service.create(valuesn, (erre, datae) => {
        valuesn.p_persona_id = data.id;
        if (erre)
          res.status(500).send({
            message:
              erre.message || "Algo salió mal"
          });
        else res.json({ status: 'ok', message: 'request succed', data: datae });
      });
      // res.json({ status: 'ok', message: 'request succed', data: data })
    };
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
  const idusuario = req.usuario.id;
  const values = {
    p_id_paciente: req.body.id_paciente,
    p_operacion: req.body.operacion,
    p_persona_id: req.body.persona_id,
    p_estado_civil: req.body.estado_civil,
    p_nacion_originaria: req.body.nacion_originaria,
    p_grado_educativo: req.body.grado_educativo,
    p_idioma: req.body.idioma,
    p_lugar_nacimiento: req.body.lugar_nacimiento,
    p_fecha_nacimiento: req.body.fecha_nacimiento,
    p_ocupacion: req.body.ocupacion,
    p_tutor_id: req.body.tutor_id,
    p_sexo: req.body.sexo,
    p_edad: req.body.edad,
    p_id_usuario_mod: idusuario,
    p_fecha_mod: new Date()
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

// router.get('/', async (req, res) => {
//   service.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Algo salió mal en el servidor."
//       });
//     else res.json(data);
//   });
// })
router.get('/', async (req, res, next) => {
  service.getAllLimit((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo salió mal en el servidor."
      });
    else {
      service.countAll((err, data2) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Algo salió mal en el servidor."
          });
        else {
          res.status(200).json({ data, data2, pagination: Math.ceil(300/20) });
        }
      });
    }
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


router.get('/ci/:id', async (req, res) => {
  service.findByCi(req.params.id, (err, data) => {
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

router.delete('/:id', async (req, res) => {
  const idusuario = req.usuario.id;
  service.remove(req.params.id, idusuario, new Date().toISOString(), (err, data) => {
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


module.exports = router;
