const router = require('express').Router();

const {
  createSighting,
  getAllSightings,
  getOneSighting,
} = require('../../controllers/sighting-controller');

router
  .route('/')
  // GET all sightings
  .get(getAllSightings)
  .post(createSighting);

// GET one sighting
router.route('/:id').get(getOneSighting);

module.exports = router;
