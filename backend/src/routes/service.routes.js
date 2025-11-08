const express = require('express');
const ServiceController = require('../controllers/service.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', ServiceController.getServices);
router.get('/:id', ServiceController.getService);

// Admin routes
router.post('/', authenticateAdmin, ServiceController.createService);
router.put('/:id', authenticateAdmin, ServiceController.updateService);
router.delete('/:id', authenticateAdmin, ServiceController.deleteService);

module.exports = router;