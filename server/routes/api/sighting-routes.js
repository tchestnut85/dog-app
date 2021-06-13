const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const {
  createSighting,
  getAllSightings,
  getOneSighting,
  updateSighting,
  deleteSighting
} = require('../../controllers/sighting-controller');

router
  .route('/')
  // GET all sightings
  .get(getAllSightings)
  .post(createSighting);

// GET one sighting
router
  .route('/:id')
  .get(getOneSighting)
  .put(updateSighting)
  .delete(authMiddleware, deleteSighting);

module.exports = router;
