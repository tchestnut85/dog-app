const userRoutes = require('./user-routes');
const sightingRoutes = require('./sighting-routes');
const router = require('express').Router();

router.use('/users', userRoutes);
router.use('/sightings', sightingRoutes);

module.exports = router;
