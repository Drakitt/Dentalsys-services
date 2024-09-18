const { response } = require('express');
const express = require('express');
const connection = require('../database/database');
const CitasServices = require('../services/cita.service');
const { USER } = require('../keys2');

const router = express.Router();
const service = new CitasServices();

router.get('/xxx', async(req, res) => {
    res.json({ text: 'the ad doesnt exist' });
})
router.get('/reporte-citas', async(req, res) => {
    const { ci, startDate } = req.query;
    /*
      if (!startDate) {
        return res.status(400).send('Debe proporcionar la fecha de inicio (startDate).');
      }*/

    try {
        const citas = await service.getCitas(startDate, ci);
        res.json(citas);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la consulta');
    }
});


router.get('/', async(req, res) => {
    service.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salió mal en el servidor"
            });
        else res.json(data);
    });
})

router.get('/:id', async(req, res) => {
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

router.get('/one/:id', async(req, res) => {
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

router.put('/atendido/:id', async(req, res) => {
    service.updateState(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    error: true,
                    message: `No se encontró el id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    error: true,
                    message: "Algo salió mal al encontrar el id " + req.params.id
                });
            }
        } else {
            res.status(200).json({
                success: true,
                message: 'Estado cambiado correctamente'
            });
        }
    });
});


router.post('/', async(req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const idusuario = req.usuario.id;

    const values = {
        p_id_cita: 0,
        p_operacion: 'INSERT', // Establece la operación CREATE para insertar una nueva cita
        p_razon: req.body.razon,
        p_detalles: req.body.detalles,
        p_fecha: req.body.fecha, // Divide la fecha y la hora y toma la fecha
        p_hora: req.body.hora, // Divide la fecha y la hora y toma la hora
        p_paciente_id: req.body.paciente_id,
        p_dentista_id: req.body.dentista_id,
        p_id_usuario_reg: idusuario,
        p_fecha_reg: new Date()
    };

    service.create(values, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salió mal"
            });
        else res.json({ status: 'ok', message: 'request succed', data: data });
    });
});


router.post('/prueba', async(req, res) => {
    res.json({ status: 'ok', message: 'request succed' });
    console.log("ver esto", req.body);
});

router.patch('/:id', async(req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No hay elementos"
        });
    }
    const idusuario = req.usuario.id;
    const values = {
        p_id_cita: req.params.id,
        p_operacion: "UPDATE", // Establece la operación CREATE para insertar una nueva cita
        p_razon: req.body.razon,
        p_detalles: req.body.detalles,
        p_fecha: req.body.fecha, // Divide la fecha y la hora y toma la fecha
        p_hora: req.body.hora, // Divide la fecha y la hora y toma la hora
        p_paciente_id: req.body.paciente_id,
        p_dentista_id: req.body.dentista_id,
        p_id_usuario_mod: idusuario,
        p_fecha_mod: new Date()
    };

    service.updateById(req.params.id, values, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salió mal"
            });
        else res.send(data);
    });

})

router.post('/mes', async(req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No hay elementos"
        });
    }
    const values = {
        p_fecha: req.body.fecha,
    };
    service.GetByMonth(values, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "no se encontraron citas"
            });
        else res.send(data);
    });

})

router.post('/semana', async(req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No hay elementos"
        });
    }
    const values = {
        p_semana: req.body.semana,
        p_mes: req.body.mes,
        p_año: req.body.año
    };
    service.GetByWeek(values, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "no se encontraron citas"
            });
        else res.send(data);
    });

})

router.delete('/x/:id', async(req, res) => {
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

router.delete('/:id', async(req, res, ) => {
    console.log(req.usuario)
    return
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
        } else res.send({ status: 'ok', message: 'request succed', data: data });
    });
})


module.exports = router;