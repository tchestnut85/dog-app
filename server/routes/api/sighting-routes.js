const router = require('express').Router();

const {
  createSighting,
  getAllSightings,
  getOneSighting,
  updateSighting,
} = require('../../controllers/sighting-controller');

router
  .route('/')
  // GET all sightings
  .get(getAllSightings)
  .post(createSighting);

// GET one sighting
router.route('/:id').get(getOneSighting).put(updateSighting);

module.exports = router;
