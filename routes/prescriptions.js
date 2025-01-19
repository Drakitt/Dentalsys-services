
const express = require('express');
const PrescriptionService = require('../services/prescriptionService'); // Importa la clase
const prescriptionService = new PrescriptionService(); // Instancia la clase

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getAllPrescriptions();
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const prescription = await prescriptionService.getPrescriptionById(req.params.id);
    if (!prescription) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { patient_id, prescription_text, doctor_id, status } = req.body;
    const newPrescription = await prescriptionService.createPrescription({
      patient_id,
      prescription_text,
      doctor_id,
      status,
    });
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const updatedPrescription = await prescriptionService.updatePrescription(req.params.id, updates);
    res.json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prescriptionService.deletePrescription(req.params.id);
    res.json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/pres/:id', async (req, res) => {
    try {
      const prescriptions = await prescriptionService.getAllPrescriptionsByPatient(req.params.id);
      res.json(prescriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
